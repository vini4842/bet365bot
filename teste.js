const puppeteer = require("puppeteer-extra");
const path = require("path");

const StealthPlugin = require("puppeteer-extra-plugin-stealth")();
StealthPlugin.enabledEvasions.delete("chrome.runtime");
StealthPlugin.enabledEvasions.delete("iframe.contentWindow");
puppeteer.use(StealthPlugin);

(async () => {

const puppeteerBrowser = await puppeteer.launch({
  headless: false,
  userDataDir: path.resolve(__dirname, "./perfil"),
  args: [
    "--disable-infobars",
    "--no-sandbox",
    "--disable-blink-features=AutomationControlled",
  ],
  ignoreDefaultArgs: ["--enable-automation"],
});

// this.pupeteerBrowser = await puppeteer.connect({browserURL: 'http://localhost:9992'})

/**@type  import('puppeteer').Page **/
const puppeteerPage = await puppeteerBrowser.newPage();

await puppeteerPage.evaluateOnNewDocument(() => {
  window.qs = document.querySelector;
  window.qsAll = document.querySelectorAll;
  
  let n = 1;

  Object.defineProperty(navigator, "maxTouchPoints", {
    get() {
      setTimeout(() => (n = 0), 0);
      return n;
    },
  });

  navigator.permissions.query = i => ({then: f => f({state: "prompt", onchange: null})});
});

await puppeteerPage.goto("https://www.bet365.com/#/IP/B1", { waitUntil: "networkidle0" });
//await this.pupeteerPage.setViewport({ width: 1200, height: 720 });
await page.screenshot({path: 'exemplo.png'})

})();