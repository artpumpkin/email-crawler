const EmailCrawler = require("./email-crawler");
const fs = require("fs");

(async () => {
  const emailCrawler = new EmailCrawler({
    keywords: ["avito", "jumia"],
    urlsPerKeyword: 6,
    maxDepth: 1,
    urlsPerDepth: 4
  });

  const results = await emailCrawler.crawl();
  console.log(results);
})();
