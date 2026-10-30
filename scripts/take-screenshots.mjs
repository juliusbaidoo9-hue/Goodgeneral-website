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

    // Desktop
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await new Promise((r) => setTimeout(r, 1000));

    // Hero screenshot
    const heroSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/desktop-hero-view.png", Buffer.from(heroSnap.data, "base64"));
    console.log("Saved desktop-hero-view.png");

    // Full page screenshot
    const layout = await send("Page.getLayoutMetrics");
    const height = Math.ceil(layout.contentSize.height);

    await send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: height,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await new Promise((r) => setTimeout(r, 1000));

    const fullSnap = await send("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: 1280, height: height, scale: 1 },
    });
    fs.writeFileSync("public/screenshots/desktop-full-scroll.png", Buffer.from(fullSnap.data, "base64"));
    console.log("Saved desktop-full-scroll.png (height: " + height + ")");

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
