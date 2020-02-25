## email-crawler
An email crawler written in NodeJS for a challenge using *selenium*.

## Challenge

> For a given **keyword** get the first **n-th** urls from a certain search engine *(Google, Bing, DuckDuckGo...)*, for each url get all other nested urls to a **given depth**, for each new url scrap all **emails**, then save them in a *json* format.

## Setup

1. Clone the repo

   ```shell
   git clone https://github.com/imsalahdev/email-crawler
   cd email-crawler
   ```

2. Install the dependencies

   ```shell
   npm install
   ```

3. Launch the webdriver manager in a new terminal

   ```shell
   npm run webdriver-manager
   ```

4. Execute main.js

   ```shell
   npm run start
   ```

## Signature

```typescript
const EmailCrawler: new ({ keywords, urlsPerKeyword, maxDepth, urlsPerDepth }?: {
    keywords?: any[];
    urlsPerKeyword?: number;
    maxDepth?: number;
    urlsPerDepth?: number;
}) => EmailCrawler
```

---

## Code Simple

```javascript
const EmailCrawler = require("./email-crawler");

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

```

## Results

```javascript
[
  {
    keyword: "avito",
    urls: [
      "https://play.google.com/store/apps/details?id=se.scmv.morocco&hl=fr",
      "https://www.rekrute.com/avito.ma-emploi-recrutement-121101.html",
      "https://www.dreamjob.ma/emploi/avito-ma-recrute/",
      "https://www.challenge.ma/tag/avito/",
      "https://www.facebook.com/Avito.ma/",
      "https://play.google.com/store/apps/details?id=se.scmv.morocco&hl=fr"
    ],
    emails: [
      "robert@broofa.com",
      "support@avito.ma",
      "jobs@dreamjob.ma",
      "contact@newpublicity.ma"
    ],
    timeTaken: "61.17s"
  },
  {
    keyword: "jumia",
    urls: [
      "https://www.facebook.com/Jumia.ma/",
      "https://www.facebook.com/JumiaFoodMA/",
      "https://fr.wikipedia.org/wiki/Jumia_Maroc",
      "https://lu.linkedin.com/company/jumia-maroc",
      "https://leconomiste.com/flash-infos/jumia-lance-jumia-mall",
      "https://www.challenge.ma/jumia-maroc-sallie-aux-grandes-marques-117376/"
    ],
    emails: [
      "abonnement@leconomiste.com",
      "mareaction@leconomiste.com",
      "redaction@leconomiste.com",
      "publicite@leconomiste.com",
      "communication@leconomiste.com",
      "contact@newpublicity.ma"
    ],
    timeTaken: "51.03s"
  }
]
```

## Licence

MIT
