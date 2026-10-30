import { spawn } from "child_process";
import fs from "fs";

async function testForm() {
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
      expression: 'document.getElementById("enquire").scrollIntoView({ behavior: "instant" })',
    });
    await new Promise((r) => setTimeout(r, 400));

    // Fill out form properly triggering React's value setters
    await send("Runtime.evaluate", {
      expression: `
        function triggerInput(el, val) {
          const prototype = Object.getPrototypeOf(el);
          const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
          descriptor.set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }

        function triggerSelect(el, val) {
          const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
          descriptor.set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }

        triggerInput(document.querySelector('#name'), 'Samuel Mensah');
        triggerInput(document.querySelector('#school'), 'Ridgefield Preparatory School, Accra');
        triggerInput(document.querySelector('#email'), 'bursar@ridgefield.edu.gh');
        triggerInput(document.querySelector('#phone'), '0596391615');
        
        const needEl = document.querySelector('#need');
        triggerSelect(needEl, needEl.options[1].value);

        triggerInput(document.querySelector('#message'), '2,500 exercise books and 800 notebooks for Term 2.');

        setTimeout(() => {
          document.querySelector('#enquire button[type="submit"]').click();
        }, 150);
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));

    const successSnap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("public/screenshots/form-success-state.png", Buffer.from(successSnap.data, "base64"));
    console.log("Saved form-success-state.png");

    ws.close();
  } finally {
    chrome.kill();
  }
}

testForm().catch(console.error);
