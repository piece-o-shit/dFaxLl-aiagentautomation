import { ReadStream } from 'fs'
import OpenaiSDK from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { ParsedChatCompletion } from 'openai/resources/beta/chat/completions'
import { Stream } from 'openai/streaming.mjs'
import { z, ZodType } from 'zod'
import { AiModel } from '../ai.provider'
import { OpenaiModel } from './openai.type'
import { OpenaiUsage } from './openai.usage'

export type History = {
  role: 'user' | 'assistant'
  content: [{ type: 'text'; text: string }] | string
}

export type OpenaiGenerateTextOptions = {
  prompt: string
  attachmentUrls?: string[]
  history?: History[]
  context?: string
  model?: OpenaiModel
  onStream?: (text: string) => Promise<void>
}

type BuildMessageOptions = {
  content: string
  attachmentUrls?: string[]
  history?: History[]
  context?: string
}

export class OpenaiProvider {
  private static usage = new OpenaiUsage()

  private api: OpenaiSDK

  constructor() {
    this.initialize()
  }

  private initialize(): void {
    try {
      const apiKey = process.env.SERVER_OPENAI_API_KEY

      if (!apiKey) {
        console.log(`Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI`)
        return
      }

      this.api = new OpenaiSDK({ apiKey })

      console.log(`Openai is active`)
    } catch (error) {
      console.error(`Openai failed to start`)
    }
  }

  isActive(): boolean {
    if (this.api) {
      return true
    } else {
      return false
    }
  }

  async generateText(options: OpenaiGenerateTextOptions): Promise<string> {
    const {
      prompt,
      attachmentUrls,
      history,
      context,
      model = OpenaiModel.JSON,
      onStream,
    } = options
    const messageOptions = { content: prompt, attachmentUrls, history, context }
    const messages = this.buildMessages(messageOptions)
    const isStream = !!onStream

    const responseUnknown = await this.api.chat.completions.create({
      model,
      messages: messages,
      stream: isStream,
      stream_options: isStream ? { include_usage: true } : undefined,
    })

    let responseStream: Partial<OpenaiSDK.Chat.Completions.ChatCompletion>

    if (isStream) {
      responseStream = await this.streamResponse(
        responseStream as Stream<OpenaiSDK.Chat.Completions.ChatCompletionChunk>,
        onStream,
      )
    }

    const response: OpenaiSDK.Chat.Completions.ChatCompletion =
      (responseStream ??
        responseUnknown) as OpenaiSDK.Chat.Completions.ChatCompletion

    OpenaiProvider.usage.updateUsage({ response, model })

    OpenaiProvider.usage.print(model)

    const content = this.parseResponseContent(response)

    return content
  }

  private async streamResponse(
    stream: Stream<OpenaiSDK.Chat.Completions.ChatCompletionChunk>,
    onStream: (text: string) => Promise<void>,
  ): Promise<{ usage?: OpenaiSDK.Completions.CompletionUsage }> {
    let usage: OpenaiSDK.Completions.CompletionUsage = null

    for await (const chunk of stream) {
      try {
        const text = chunk.choices[0]?.delta?.content ?? ''

        if (chunk.usage) {
          usage = chunk.usage
        }

        onStream(text)
      } catch (error) {
        console.error(`Could not parse chunk`)
        console.error(error)
      }
    }

    return { usage }
  }

  async generateJson<
    SchemaType extends ZodType,
    JsonType = z.infer<SchemaType>,
  >(
    instruction: string,
    content: string,
    schema: SchemaType,
    attachmentUrls?: string[],
    history: History[] = [],
  ): Promise<JsonType> {
    const messages = this.buildMessages({ content, attachmentUrls, history })
    const model = OpenaiModel.JSON

    const response = await this.api.beta.chat.completions.parse({
      model,
      messages: [{ role: 'system', content: instruction }, ...messages],
      response_format: zodResponseFormat(schema, 'result'),
    })

    OpenaiProvider.usage.updateUsage({ response, model })

    OpenaiProvider.usage.print(model)

    const json = this.parseResponseJson<JsonType>(response)

    return json
  }

  async generateImage(prompt: string): Promise<string> {
    const model = OpenaiModel.IMAGE

    const response = await this.api.images.generate({
      model: OpenaiModel.IMAGE,
      prompt: prompt,
    })

    OpenaiProvider.usage.updateUsage({ response: response as any, model })

    OpenaiProvider.usage.print(model)

    const imageUrl = this.parseResponseImage(response)

    return imageUrl
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    const transcription = await this.api.audio.transcriptions.create({
      file: readStream,
      model: OpenaiModel.AUDIO_TO_TEXT,
    })

    return transcription.text
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    const mp3 = await this.api.audio.speech.create({
      model: OpenaiModel.TEXT_TO_AUDIO,
      voice: 'alloy',
      input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())

    return buffer
  }

  private buildMessages(options: BuildMessageOptions) {
    const { content, context, attachmentUrls = [], history = [] } = options

    const promptSystem = {
      role: 'system',
      content: `${context}`.trim(),
    }

    const historyMessages = history ?? []

    const mainMessage = {
      role: 'user',
      content: [
        { type: 'text', text: content },
        ...attachmentUrls.map(url => ({
          type: 'image_url',
          image_url: { url },
        })),
      ],
    }

    return [
      promptSystem,
      ...historyMessages,
      mainMessage,
    ] as OpenaiSDK.Chat.Completions.ChatCompletionMessageParam[]
  }

  private parseResponseContent(
    response: OpenaiSDK.Chat.Completions.ChatCompletion,
  ): string {
    return response.choices[0].message.content
  }

  private parseResponseImage(
    response: OpenaiSDK.Images.ImagesResponse,
  ): string {
    return response.data[0].url
  }

  private parseResponseJson<JsonType = unknown>(
    response: ParsedChatCompletion<JsonType>,
  ) {
    return response.choices[0].message.parsed
  }

  async getAvailableModels(): Promise<AiModel[]> {
    const models = await this.api.models.list()

    return models.data.map(model => ({
      id: model.id,
      name: model.id,
      description: null,
      maxTokens: null,
      inputPricePerToken: null,
      outputPricePerToken: null,
    }))
  }
}
