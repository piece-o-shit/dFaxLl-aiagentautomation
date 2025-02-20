import { OpenaiProvider } from './providers/openai/openai.provider'
import { GeminiProvider } from './providers/gemini/gemini.provider'

export class AiServiceFactory {
  static create(provider: 'openai' | 'gemini' | 'anthropic') {
    switch (provider) {
      case 'openai':
        return new OpenaiProvider()
      case 'gemini':
        return new GeminiProvider()
      default:
        throw new Error(`Provider ${provider} not implemented`)
    }
  }
}
