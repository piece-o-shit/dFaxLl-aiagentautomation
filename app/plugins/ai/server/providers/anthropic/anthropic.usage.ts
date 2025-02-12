import Anthropic from '@anthropic-ai/sdk'
import { DateTool } from '~/plugins/toolbox/common'
import { AnthropicObject } from './anthropic.object'

type Token = {
  count: number
  price: number
  priceSum: number
}

type Limit = {
  price: {
    count: number
    limit: number
    dateUpdated: Date
  }
}

type Usage = {
  input: Token
  output: Token
  count: number
  priceSum: number
  /**
   * @deprecated Not used anywhere. Looks like limits is the right field
   */
  limit: number
  limits?: Record<string, Limit>
}

export class ClaudeUsage {
  // private logger = new Logger(this)

  private store: Record<AnthropicObject.Model, Usage> = {
    [AnthropicObject.Model.SONNET_3_5]: {
      input: {
        count: 0,
        price: 3 / 1000000,
        priceSum: 0,
      },
      output: {
        count: 0,
        price: 15 / 1000000,
        priceSum: 0,
      },
      count: 0,
      priceSum: 0,
      limit: 300000,
      limits: {
        minute: {
          price: {
            count: 0,
            limit: 5,
            dateUpdated: new Date(),
          },
        },
      },
    },
  }

  constructor() {}

  // count(messages: AIMessage[]) {
  //   const MAGIC_VALUE = 3.5

  //   const tokens = Math.floor(
  //     messages.map(item => item.content).join('').length / MAGIC_VALUE,
  //   )

  //   return tokens
  // }

  updateUsage(options: {
    model: AnthropicObject.Model
    response: Anthropic.Message
  }): void {
    const usage = options.response.usage

    const tokensTotal = usage.input_tokens + usage.output_tokens

    this.store[options.model].input.count += usage.input_tokens
    this.store[options.model].output.count += usage.output_tokens
    this.store[options.model].count += tokensTotal

    this.store[options.model].input.priceSum =
      this.store[options.model].input.count *
      this.store[options.model].input.price

    this.store[options.model].output.priceSum =
      this.store[options.model].output.count *
      this.store[options.model].output.price

    this.store[options.model].priceSum =
      this.store[options.model].input.priceSum +
      this.store[options.model].output.priceSum

    const priceSumOfThisUsage =
      this.store[options.model].input.price * usage.input_tokens +
      this.store[options.model].output.price * usage.output_tokens

    this.checkAndUpdateLimits(
      this.store[options.model].limits,
      priceSumOfThisUsage,
    )
  }

  checkAndUpdateLimits(limits: Record<string, Limit>, priceUsage: number) {
    const dateUpdated = limits.minute.price.dateUpdated

    const dateNow = new Date()

    const canReset = DateTool.getDifferenceInMinutes(dateUpdated, dateNow) >= 1

    if (canReset) {
      limits.minute.price = {
        ...limits.minute.price,
        count: 0,
        dateUpdated: dateNow,
      }
    }

    limits.minute.price = {
      ...limits.minute.price,
      count: (limits.minute.price.count += priceUsage),
    }
  }

  getSingleUsageCost(options: {
    model: AnthropicObject.Model
    response: Anthropic.Message
  }): number {
    const usage = options.response.usage

    const priceInput =
      usage.input_tokens * this.store[options.model].input.price
    const priceOutput =
      usage.output_tokens * this.store[options.model].output.price

    const cost = (priceInput + priceOutput).toFixed(2)

    return parseFloat(cost)
  }

  getUsageCostTotal(options: { model: AnthropicObject.Model }): number {
    return this.store[options.model].priceSum
  }

  hasReachedMinutePriceLimit(options: {
    model: AnthropicObject.Model
  }): boolean {
    return (
      this.store[options.model].limits.minute.price.count >=
      this.store[options.model].limits.minute.price.limit
    )
  }

  print(model: AnthropicObject.Model): void {
    const usage = this.store[model]

    console.log(`>> Usage for model "${model}"`)
    console.log(
      `>> Input : ${usage.input.count} (${usage.input.priceSum.toFixed(4)})`,
    )
    console.log(
      `>> Output: ${usage.output.count} (${usage.output.priceSum.toFixed(4)})`,
    )
    console.log(
      `>> Total : ${usage.count}/${usage.limit} (${usage.priceSum.toFixed(4)})`,
    )
    console.log(
      `>> Last Minute: ${usage.limits.minute.price.count}/${usage.limits.minute.price.limit}`,
    )
  }
}
