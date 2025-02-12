import Anthropic from '@anthropic-ai/sdk'

export namespace AnthropicObject {
  export enum Model {
    SONNET_3_5 = 'claude-3-5-sonnet-20241022',
  }

  export const MaxTokens = {
    [Model.SONNET_3_5]: 8192,
  }

  export enum Temperature {
    CREATIVE = 1,
    DETERMINISTIC = 0.3,
    COLD = 0.1,
  }

  export type Message = Anthropic.MessageParam
  export type MessageContent =
    | string
    | Array<
        | Anthropic.TextBlockParam
        | Anthropic.ImageBlockParam
        | Anthropic.ToolUseBlockParam
        | Anthropic.ToolResultBlockParam
      >

  export type MediaType =
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/webp'
}
