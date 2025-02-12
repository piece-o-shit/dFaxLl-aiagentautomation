import { CrawlRouter } from './crawl.router'
import { CrawlService } from './crawl.service'

export namespace CrawlServer {
  export const service = CrawlService

  export const trpcRouter = CrawlRouter
}
