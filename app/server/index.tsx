import { createRouter } from '@/core/.marblism/zenstack/routers'
import { AuthenticationServer } from '@/core/authentication/server'
import { ConfigurationServer } from '@/core/configuration/server'
import { Trpc } from '@/core/trpc/base'
import { AiServer } from '@/plugins/ai/server'
import { EmailServer } from '@/plugins/email/server'
import { UploadServer } from '@/plugins/upload/server'

import { PaymentServer } from '~/plugins/payment/server'

import { CrawlServer } from '~/plugins/crawl/server'

import { DocumentProcessorServer } from '~/plugins/documentProcessor/server'

import { NangoRouter } from '~/plugins/nango/server/nango.router'

export const appRouter = Trpc.mergeRouters(
  createRouter(Trpc.createRouter, Trpc.procedurePublic),

  // the custom router, add your own routers here
  Trpc.createRouter({
    authentication: AuthenticationServer.trpcRouter,
    configuration: ConfigurationServer.trpcRouter,
    upload: UploadServer.trpcRouter,
    ai: AiServer.trpcRouter,
    email: EmailServer.trpcRouter,

    billing: PaymentServer.trpcRouter,

    crawl: CrawlServer.trpcRouter,

    documentProcessor: DocumentProcessorServer.trpcRouter,

    nango: NangoRouter,
  }),
)

export type AppRouter = typeof appRouter
