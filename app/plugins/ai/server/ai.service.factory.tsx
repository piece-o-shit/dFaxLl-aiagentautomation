import { TRPCError } from '@trpc/server'
import { AnthropicProvider } from './providers/anthropic/anthopic.provider'
import { GeminiProvider } from './providers/gemini/gemini.provider'
import { OpenaiProvider } from './providers/openai/openai.provider'
import { AiProvider } from './providers/provider'

export class AiServiceFactory {
  static create(providerType: 'openai' | 'gemini' | 'anthropic'): AiProvider {
    let provider: AiProvider

    switch (providerType) {
      case 'openai':
        provider = new OpenaiProvider()
        break
      case 'gemini':
        provider = new GeminiProvider()
        break
      case 'anthropic':
        provider = new AnthropicProvider()
        break
      default:
        throw new Error('Unsupported AI provider')
    }

    if (!provider.isActive()) {
      let message = ''
      switch (providerType) {
        case 'openai':
          message = 'Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI'
          break
        case 'gemini':
          message = 'Set SERVER_GEMINI_API_KEY in your .env to activate Gemini'
          break
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message,
      })
    }

    return provider
  }
}
