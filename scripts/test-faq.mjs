import { spawn } from "child_process";
import fs from "fs";

async function testFaq() {
  const chrome = spawn(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ["--headless", "--remote-debugging-port=9222", "--disable-gpu", "about:blank"],
    { stdio: "ignore" }
  );

  await new Promise((r) => setTimeout(r, 1500));

  try {
    const listRes = await fetch("http://localhost:9222/json");
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise((resolve) => ws.onopen = resolve);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === curId) {
            ws.removeEventListener("message", handler);
            resolve(data.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send("Page.enable");
    await send("Page.navigate", { url: "http://localhost:3000" });
    await new Promise((r) => setTimeout(r, 1500));

    await send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send("Runtime.evaluate", {
      expression: 'document.getElementById("faq").scrollIntoView({ behavior: "instant" })',
    });
    await new Promise((r) => setTimeout(r, 400));

    // Toggle 2nd question ("Can a school ask about stationery supply?")
    await send("Runtime.evaluate", {
      expression: 'document.querySelectorAll("#faq button")[1].click()',
    });
    await new Promise((r) => setTimeout(r, 400));

    const faqSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/faq-interactive.png", Buffer.from(faqSnap.data, "base64"));
    console.log("Saved faq-interactive.png");

    ws.close();
  } finally {
    chrome.kill();
  }
}

testFaq().catch(console.error);
