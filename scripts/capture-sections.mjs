import { spawn } from "child_process";
import fs from "fs";

async function main() {
  const profileDir = `/tmp/chrome-snap-${Date.now()}`;
  const chrome = spawn(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    [
      "--headless=new",
      "--remote-debugging-port=9222",
      `--user-data-dir=${profileDir}`,
      "--disable-gpu",
      "about:blank"
    ],
    { stdio: "ignore" }
  );

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const listRes = await fetch("http://127.0.0.1:9222/json");
    const tabs = await listRes.json();
    const wsUrl = tabs.find(t => t.type === "page")?.webSocketDebuggerUrl || tabs[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
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
    await new Promise((r) => setTimeout(r, 2500));

    await send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Capture sections one by one
    // 1. Offer section
    await send("Runtime.evaluate", {
      expression: `document.getElementById('offer').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await new Promise((r) => setTimeout(r, 800));
    const offerSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/view-offer.png", Buffer.from(offerSnap.data, "base64"));

    // 2. Process section
    await send("Runtime.evaluate", {
      expression: `document.getElementById('process').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await new Promise((r) => setTimeout(r, 800));
    const processSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/view-process.png", Buffer.from(processSnap.data, "base64"));

    // 3. About & Enquire
    await send("Runtime.evaluate", {
      expression: `document.getElementById('about').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await new Promise((r) => setTimeout(r, 800));
    const aboutSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/view-about.png", Buffer.from(aboutSnap.data, "base64"));

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
