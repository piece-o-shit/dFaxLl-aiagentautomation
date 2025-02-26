import { ReadStream } from 'fs'
import { ZodType } from 'zod'
import { AiModel } from './providers/ai.provider'
import {
  OpenaiGenerateTextOptions,
  OpenaiProvider,
} from './providers/openai/openai.provider'

class Service {
  private openai = new OpenaiProvider()

  async generateText(options: OpenaiGenerateTextOptions): Promise<string> {
    return this.openai.generateText(options)
  }

  async generateJson<SchemaType extends ZodType>(
    instruction: string,
    content: string,
    schema: SchemaType,
    attachmentUrls?: string[],
  ) {
    return this.openai.generateJson<SchemaType>(
      instruction,
      content,
      schema,
      attachmentUrls,
    )
  }

  async generateImage(prompt: string): Promise<string> {
    return this.openai.generateImage(prompt)
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    return this.openai.fromAudioToText(readStream)
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    return this.openai.fromTextToAudio(text)
  }

  isActive(): boolean {
    return this.openai.isActive()
  }

  async getAvailableModels(): Promise<AiModel[]> {
    try {
      if (!this.openai.isActive()) {
        throw new Error('OpenAI provider is not active')
      }
      const models = await this.openai.getAvailableModels()
      if (!models || !Array.isArray(models)) {
        throw new Error('Invalid models response from provider')
      }
      return models
    } catch (error) {
      throw new Error(`Failed to fetch AI models: ${error.message}`)
    }
  }
}

export const AiService = new Service()
