import FirecrawlApp from '@mendable/firecrawl-js'

export class FireCrawlProvider {
  private api: FirecrawlApp
  private apiKey: string

  constructor() {
    this.initialize()
  }

  private initialize(): void {
    try {
      const apiKey = process.env.SERVER_FIRECRAWL_API_KEY

      this.apiKey = apiKey

      if (!apiKey) {
        console.log(
          `Set SERVER_FIRECRAWL_API_KEY in your .env to activate the scraping and crawling functionalities`,
        )
        return
      }

      this.api = new FirecrawlApp({ apiKey })

      console.log(`Firecrawl is active`)
    } catch (error) {
      console.error(`FireCrawl failed to start`)
    }
  }

  isActive(): boolean {
    if (this.api) {
      return true
    } else {
      return false
    }
  }

  async scrapeUrl(url: string): Promise<string> {
    const scrapeResponse = await this.api.scrapeUrl(url, {
      formats: ['markdown'],
    })

    if (!scrapeResponse.success) {
      throw new Error(`Failed to scrape: ${scrapeResponse.error}`)
    }

    return scrapeResponse.markdown ?? ''
  }

  async scrapeUrlToJson(url: string, jsonSchema: any): Promise<any> {
    const body = {
      url,
      formats: ['extract'],
      extract: {
        schema: jsonSchema,
      },
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    try {
      const scrapeResponse = await fetch(
        'https://api.firecrawl.dev/v1/scrape',
        options,
      )

      const scrapeResponseJson = await scrapeResponse.json()

      return scrapeResponseJson?.['data']?.['extract']
    } catch (error) {
      throw new Error(`Failed to scrape: ${error}`)
    }
  }
}
