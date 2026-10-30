import { spawn } from "child_process";
import fs from "fs";

async function main() {
  const chrome = spawn(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ["--headless", "--remote-debugging-port=9222", "--disable-gpu", "about:blank"],
    { stdio: "ignore" }
  );

  await new Promise((r) => setTimeout(r, 1500));

  try {
    const listRes = await fetch("http://localhost:9222/json");
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

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
    await new Promise((r) => setTimeout(r, 2000));

    await send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Smoothly scroll down to challenge to trigger intersection observer
    await send("Runtime.evaluate", {
      expression: `(async () => {
        const el = document.getElementById('challenge');
        const top = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: top - 50, behavior: 'instant' });
      })()`,
    });
    await new Promise((r) => setTimeout(r, 1200));
    const challengeSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/challenge-updated.png", Buffer.from(challengeSnap.data, "base64"));
    console.log("Captured challenge-updated.png");

    // Scroll to proof (case study & video)
    await send("Runtime.evaluate", {
      expression: `document.getElementById('proof').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await new Promise((r) => setTimeout(r, 800));
    const proofSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/proof-case-study.png", Buffer.from(proofSnap.data, "base64"));
    console.log("Captured proof-case-study.png");

    // Scroll down to the video showcase part of proof
    await send("Runtime.evaluate", {
      expression: `window.scrollBy({ top: 600, behavior: 'instant' });`,
    });
    await new Promise((r) => setTimeout(r, 800));
    const videoSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/proof-video-showcase.png", Buffer.from(videoSnap.data, "base64"));
    console.log("Captured proof-video-showcase.png");

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
