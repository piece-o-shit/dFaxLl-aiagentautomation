import { Anthropic } from '@anthropic-ai/sdk'
import axios from 'axios'
import { ReadStream } from 'fs'
import { ZodType } from 'zod'
import { AiProvider } from '../provider'
import { AnthropicObject } from './anthropic.object'

type HistoryItem = {
  role: 'user' | 'assistant'
  content: string | { type: 'string'; text: string }[]
}

type GenerateTextOptions = {
  prompt: string
  attachmentUrls?: string[]
  history?: HistoryItem[]
  context?: string
  onStream?: (text: string) => Promise<void>
}

type BuildMessageOptions = {
  content: string
  attachmentUrls?: string[]
  history?: HistoryItem[]
  context?: string
}

export class AnthropicProvider implements AiProvider {
  private anthropic: Anthropic

  constructor() {
    this.initialise()
  }

  private initialise(): void {
    try {
      const apiKey = process.env.SERVER_ANTHROPIC_API_KEY

      if (!apiKey) {
        console.log(
          `Set SERVER_ANTHROPIC_API_KEY in your .env to activate Anthropic`,
        )
        return
      }

      this.anthropic = new Anthropic({ apiKey: apiKey })
      console.log('Anthropic is active')
    } catch (error) {
      console.error('Anthropic failed to start')
    }
  }

  isActive(): boolean {
    if (this.anthropic) {
      return true
    } else {
      return false
    }
  }

  async generateText(options: GenerateTextOptions): Promise<string> {
    const { prompt, attachmentUrls, history, context, onStream } = options

    const messages = await this.buildMessages({
      content: prompt,
      attachmentUrls,
      history,
      context,
    })

    const system = this.buildSystem(options.context)

    const isStreaming = !!onStream

    if (!isStreaming) {
      const response = await this.anthropic.messages.create({
        messages,
        model: AnthropicObject.Model.SONNET_3_5,
        temperature: AnthropicObject.Temperature.DETERMINISTIC,
        max_tokens: AnthropicObject.MaxTokens[AnthropicObject.Model.SONNET_3_5],
        system: system,
        stream: isStreaming,
      })

      return this.parseResponse(response)
    }

    const stream = this.anthropic.messages.stream({
      messages,
      model: AnthropicObject.Model.SONNET_3_5,
      temperature: AnthropicObject.Temperature.DETERMINISTIC,
      max_tokens: AnthropicObject.MaxTokens[AnthropicObject.Model.SONNET_3_5],
      system: system,
      stream: isStreaming,
    })
    // .on('contentBlock', content => console.log('contentBlock', content))
    // .on('message', message => console.log('message', message))

    await this.streamResponse(stream, onStream)

    const message = await stream.finalMessage()

    return this.parseResponse(message)
  }

  private async streamResponse(
    stream: ReturnType<typeof this.anthropic.messages.stream>,
    onStream: (text: string) => Promise<void>,
  ): Promise<void> {
    for await (const chunk of stream) {
      try {
        const canStream =
          chunk.type === 'content_block_delta' ||
          chunk.type === 'content_block_start'

        if (canStream) {
          const text = chunk?.['delta']?.['text'] as string
          await onStream(text)
        }
      } catch (error) {
        console.error(`Could not parse chunk`)
        console.error(error)
      }
    }
  }

  generateJson<SchemaType>(
    instruction: string,
    content: string,
    schema: ZodType,
    attachmentUrls?: string[],
  ): Promise<any> {
    throw new Error('Method not implemented for this provider.')
  }
  fromAudioToText(readStream: ReadStream): Promise<string> {
    throw new Error('Method not implemented for this provider.')
  }
  fromTextToAudio(text: string): Promise<Buffer> {
    throw new Error('Method not implemented for this provider.')
  }
  generateImage(prompt: string): Promise<string> {
    throw new Error('Method not implemented for this provider.')
  }

  /* --------------------------------- PRIVATE -------------------------------- */

  private async buildMessages(
    options: BuildMessageOptions,
  ): Promise<AnthropicObject.Message[]> {
    const messages = []

    if (options.history) {
      // const historyMessages = options.history?.map((message, index) => ({
      //   role: index % 2 === 0 ? 'user' : 'assistant',
      //   content: [{ type: 'text', text: message }],
      // }))

      messages.push(...options.history)
    }

    const messageMain = {
      role: 'user',
      content: await this.buildContent(options.content, options.attachmentUrls),
    }

    messages.push(messageMain)

    return messages
  }

  private async buildContent(
    content: string,
    attachmentUrls = [],
  ): Promise<AnthropicObject.MessageContent> {
    const contentMessage: AnthropicObject.MessageContent = [
      { type: 'text', text: content },
    ]

    for (const url of attachmentUrls) {
      const { base64, mimetype } = await this.download(url)
      contentMessage.push({
        type: 'image',
        source: { data: base64, media_type: mimetype, type: 'base64' },
      })
    }

    return contentMessage
  }

  private async download(url: string): Promise<{
    base64: string
    mimetype: AnthropicObject.MediaType
  }> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      })

      const base64 = Buffer.from(response.data, 'binary').toString('base64')
      const mimetype = response.headers['content-type']

      return { base64, mimetype }
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`)
    }
  }

  private buildSystem(personality?: string): any {
    if (personality) {
      return [
        {
          type: 'text',
          text: personality,
        },
      ]
    } else {
      return []
    }
  }

  private parseResponse(response: any): string {
    const message = response.content?.[0]?.text

    return message
  }
}
