import { AiRouter } from './ai.router'
import { AiService } from './ai.service'
import { AiServiceFactory } from './ai.service.factory'
import { AnthropicProvider } from './providers/anthropic/anthopic.provider'
import { OpenaiProvider } from './providers/openai/openai.provider'

export namespace AiServer {
  export const service = AiService
  export const serviceFactory = AiServiceFactory
  export const anthropicProvider = AnthropicProvider
  export const openaiProvider = OpenaiProvider
  export const trpcRouter = AiRouter
}
