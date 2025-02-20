import { ReadStream } from 'fs'
import { ZodType } from 'zod'

export interface AiProviderConfiguration {
  provider: string
}

export interface AiModel {
  id: string
  name: string
  description?: string
  maxTokens: number
  inputPricePerToken?: number
  outputPricePerToken?: number
}

export interface AiProvider {
  generateText(options: any): Promise<string>
  generateJson<SchemaType>(
    instruction: string,
    content: string,
    schema: ZodType,
    attachmentUrls?: string[],
  ): Promise<any>
  fromAudioToText(readStream: ReadStream): Promise<string>
  fromTextToAudio(text: string): Promise<Buffer>
  generateImage(prompt: string): Promise<string>
  isActive(): boolean
  getAvailableModels(): Promise<AiModel[]>
}
