import {
  GenerateContentResult,
  GoogleGenerativeAI,
  ResponseSchema,
} from '@google/generative-ai'

import { ReadStream } from 'fs'
import { toGeminiSchema } from 'gemini-zod'
import { z, ZodType } from 'zod'
import { AiProvider } from '../provider'

export type GeminiGenerateTextOptions = {
  prompt: string
  system?: { instruction: string }
  history?: string[]
  context?: string
}

enum GeminiModel {
  GEMINI_1_5_FLASH = 'gemini-1.5-flash',
  GEMINI_1_5_PRO = 'gemini-1.5-pro',
}

export enum Temperature {
  CREATIVE = 1,
  DETERMINISTIC = 0.3,
  COLD = 0.1,
}

type BuildMessageOptions = {
  content: string
  history?: string[]
  context?: string
}

export class GeminiProvider implements AiProvider {
  private generativeAI: GoogleGenerativeAI

  constructor() {
    this.initialize()
  }

  fromTextToAudio(text: string): Promise<Buffer> {
    throw new Error('Method not implemented for this provider.')
  }
  generateImage(prompt: string): Promise<string> {
    throw new Error('Method not implemented for this provider.')
  }

  private initialize(): void {
    try {
      const apiKey = process.env.SERVER_GEMINI_API_KEY

      if (!apiKey) {
        console.log(`Set SERVER_GEMINI_API_KEY in your .env to activate Gemini`)
        return
      }

      this.generativeAI = new GoogleGenerativeAI(apiKey)

      console.log(`Gemini is active`)
    } catch (error) {
      console.error(`Gemini failed to start`, error)
    }
  }

  isActive(): boolean {
    return !!this.generativeAI
  }

  async generateText(options: GeminiGenerateTextOptions): Promise<string> {
    if (!this.isActive()) {
      return
    }

    const model = this.generativeAI.getGenerativeModel({
      model: GeminiModel.GEMINI_1_5_FLASH,
    })

    const { prompt, history, context, system } = options
    const messageOptions = { content: prompt, history, context }
    const messages = this.buildMessages(messageOptions)

    const response = await model.generateContent({
      contents: messages,
      generationConfig: {
        temperature: Temperature.DETERMINISTIC,
      },
    })

    return this.parseResponse(response)
  }

  async generateJson<
    SchemaType extends ZodType,
    JsonType = z.infer<SchemaType>,
  >(
    instruction: string,
    content: string,
    schema: SchemaType,
  ): Promise<JsonType> {
    const geminiSchema: ResponseSchema = toGeminiSchema(schema)

    const model = this.generativeAI.getGenerativeModel({
      model: GeminiModel.GEMINI_1_5_FLASH,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: geminiSchema,
      },
    })

    const response = await model.generateContent(content)

    return this.parseResponseJson<JsonType>(response)
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    if (!this.isActive()) {
      return
    }

    const model = this.generativeAI.getGenerativeModel({
      model: GeminiModel.GEMINI_1_5_FLASH,
    })

    const base64BufferString = await this.readStreamToBase64(readStream)

    const response = await model.generateContent([
      {
        inlineData: {
          mimeType: 'audio/mp3',
          data: base64BufferString,
        },
      },
      { text: 'Provide a transcription of the audio.' },
    ])

    return this.parseResponse(response)
  }

  /* --------------------------------- PRIVATE -------------------------------- */

  private buildMessages(options: BuildMessageOptions) {
    const { content, context, history = [] } = options

    const systemMessage = {
      role: 'assistant',
      parts: [{ text: context?.trim() || '' }],
    }

    const historyMessages = history.map((message, index) => ({
      role: index % 2 === 0 ? 'user' : 'assistant',
      parts: [{ text: message }],
    }))

    const mainMessage = {
      role: 'user',
      parts: [{ text: content }],
    }

    const filterEmptyText = (message: { parts: { text: string }[] }) =>
      message.parts.some(part => part.text !== '')

    return [systemMessage, ...historyMessages, mainMessage].filter(
      filterEmptyText,
    )
  }

  private parseResponse(response: GenerateContentResult) {
    const text = response.response.text()

    return text
  }

  private parseResponseJson<JsonType = unknown>(response: any): JsonType {
    const text = response.response.text()

    if (!text) {
      return
    }

    return JSON.parse(text)
  }

  private async readStreamToBase64(readStream: ReadStream): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []

      readStream.on('data', chunk => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      })

      readStream.on('end', () => {
        const buffer = Buffer.concat(chunks)
        resolve(buffer.toString('base64'))
      })

      readStream.on('error', err => {
        reject(err)
      })
    })
  }
}
