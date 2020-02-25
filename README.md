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

  const json = await emailCrawler.crawl();
  console.log(json);
})();

```

## Results

```json
[
  {
    keyword: 'avito',
    urls: [
      'https://play.google.com/store/apps/details?id=se.scmv.morocco
      'https://www.rekrute.com/avito.ma-emploi-recrutement-121101.ht
      'https://www.dreamjob.ma/emploi/avito-ma-recrute/',
      'https://www.challenge.ma/tag/avito/',
      'https://www.facebook.com/Avito.ma/',
      'https://play.google.com/store/apps/details?id=se.scmv.morocco
    ],
    emails: [
      'robert@broofa.com',
      'support@avito.ma',
      'jobs@dreamjob.ma',
      'contact@newpublicity.ma'
    ],
    timeTaken: '53.97s'
  },
  {
    keyword: 'jumia',
    urls: [
      'https://www.facebook.com/Jumia.ma/',
      'https://www.facebook.com/JumiaFoodMA/',
      'https://fr.wikipedia.org/wiki/Jumia_Maroc',
      'https://lu.linkedin.com/company/jumia-maroc',
    ],
    emails: [
      'abonnement@leconomiste.com',
      'mareaction@leconomiste.com',
      'redaction@leconomiste.com',
      'publicite@leconomiste.com',
      'communication@leconomiste.com',
      'contact@newpublicity.ma'
    ],
    timeTaken: '78.47s'
  }
]
```

## Licence

MIT