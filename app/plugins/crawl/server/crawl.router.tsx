import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { CrawlService } from './crawl.service'
/**
 * @provider CrawlApi
 * @description An Scraping and Crawling library to fetch and scrape URLs
 * @function {({ url: string }) => Promise<{ content: string}>} scrapeUrl - Scrape the content of a URL and return the content
 * @function {({ url: string, jsonSchema: any }) => Promise<any>} scrapeUrlToJson - Scrape the content of a URL and return the content as JSON
 * @usage `const scrapeUrl = Api.crawl.scrapeUrl.useMutation(); scrapeUrl.mutateAsync({ url: 'https://google.com' }).then(response => response.content);`
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */
const check = () => {
  if (!CrawlService.isActive()) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'Set SERVER_FIRECRAWL_API_KEY in your .env to activate FireCrawl',
    })
  }
}

export const CrawlRouter = Trpc.createRouter({
  scrapeUrl: Trpc.procedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      check()

      const { url } = input

      const content = await CrawlService.scrapeUrl(url)

      return { content }
    }),
  scrapeUrlToJson: Trpc.procedure
    .input(
      z.object({
        url: z.string(),
        jsonSchema: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      check()

      const { url, jsonSchema } = input

      const json = (await CrawlService.scrapeUrlToJson(url, jsonSchema)) as any

      return json
    }),
})
