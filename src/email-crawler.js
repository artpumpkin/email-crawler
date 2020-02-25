const { Builder, By, Capabilities } = require("selenium-webdriver");
require("chromedriver");
const { performance } = require("perf_hooks");
const chalk = require("chalk");

class EmailCrawler {
  static PATTERN = /\b[a-z0-9_.+-]+?@[a-z-]+?\.[a-z-.]+?\b/gi;

  constructor({
    keywords = [],
    urlsPerKeyword = 10,
    maxDepth = 2,
    urlsPerDepth = 10
  } = {}) {
    this.keywords = keywords;
    this.urlsPerKeyword = urlsPerKeyword;
    this.maxDepth = maxDepth;
    this.urlsPerDepth = urlsPerDepth;
  }

  async initDriver() {
    this.driver = await new Builder()
      .usingServer("http://localhost:4444/wd/hub")
      .forBrowser("chrome")
      .withCapabilities(Capabilities.chrome().set("chromeOptions",
        {
          args: ["--lang=en-US", "window-size=1920,1080", "--headless"]
        }))
      .build();
  }

  async getUrls(keyword) {
    const urls = [];
    outside:
    while (true) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${urls.length}`;
      await this.driver.get(url);
      const anchors = await this.driver.findElements(By.css(".srg .r > a"));
      for await (const anchor of anchors) {
        const href = await anchor.getAttribute("href");
        urls.push(href);
        if (urls.length === this.urlsPerKeyword) break outside;
      }
    }
    return urls;
  }

  async extractEmails(keyword, url, emails, depth = 0) {
    console.log(chalk`{green.inverse  ${this.index} }{inverse  url${this.index++ === 1 ? "" : "s"} scanned for }{red.inverse  ${keyword} }\r`);
    await this.driver.get(url);
    const html = await this.driver.getPageSource();
    emails.push(...(html.match(EmailCrawler.PATTERN) || []).map(match => match.toLowerCase()));
    if (depth === this.maxDepth) return;
    const anchors = await this.driver.findElements(By.css("a[href]"));
    try {
      for await (const anchor of anchors.slice(0, this.urlsPerDepth)) {
        const href = await anchor.getAttribute("href");
        await this.extractEmails(keyword, href, emails, depth + 1);
      }
    } catch { }
  }

  async crawl() {
    try {
      await this.initDriver();

      const results = [];
      for (const keyword of this.keywords) {
        const t0 = performance.now();
        const urls = await this.getUrls(keyword);
        const emails = [];
        this.index = 0;
        for (const url of urls) {
          await this.extractEmails(keyword, url, emails);
        }
        const t1 = performance.now();

        results.push({
          keyword,
          urls,
          emails: [...new Set(emails)],
          timeTaken: Math.round((t1 - t0) / 10) / 100 + "s"
        });
      }
      return results;
    } finally {
      await this.driver.quit();
    }
  }
}

module.exports = EmailCrawler;
