import { FireCrawlProvider } from './providers/firecrawl/firecrawl.provider'

class Service {
  private fireCrawl = new FireCrawlProvider()

  async scrapeUrl(url: string): Promise<string> {
    return this.fireCrawl.scrapeUrl(url)
  }

  async scrapeUrlToJson(url: string, jsonSchema: any) {
    return this.fireCrawl.scrapeUrlToJson(url, jsonSchema)
  }

  isActive(): boolean {
    return this.fireCrawl.isActive()
  }
}

export const CrawlService = new Service()
