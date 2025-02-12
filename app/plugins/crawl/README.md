# Scrape and Crawl Plugin

The Scrape and Crawl plugin integrates with FireCrawl to make it easy to scrape an URL and return its content.

This plugin exposes a set of tRPC routes that allow you to interact with these functionalities from the frontend.

## Environment variables

```.env
SERVER_FIRECRAWL_API_KEY=
```

## Client

Use the `Api` object for frontend functionalities.

### Scrape an URL

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: scrapeUrl } = Api.crawl.scrapeUrl.useMutation()

const handleScrapeUrl = async () => {
  const { content } = await scrapeUrl({
    url: `https://google.fr`,
  })

  console.log(content)
}
```

### Scrape an URL to JSON

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: scrapeUrlToJson } = Api.crawl.scrapeUrlToJson.useMutation()

const handleScrapeUrl = async () => {
  const jsonSchema = {
    type: 'object',
    properties: {
      company_mission: { type: 'string' },
      supports_sso: { type: 'boolean' },
      is_open_source: { type: 'boolean' },
      is_in_yc: { type: 'boolean' },
    },
    required: ['company_mission', 'supports_sso', 'is_open_source', 'is_in_yc'],
  }

  const json = await scrapeUrlToJson({
    url: `https://google.fr`,
    jsonSchema: jsonSchema,
  })

  console.log(json)
}
```
