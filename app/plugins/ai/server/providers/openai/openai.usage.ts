import OpenaiSDK from 'openai'
import { DateTool } from '~/plugins/toolbox/common'
import { OpenaiModel } from './openai.type'

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

export class OpenaiUsage {
  // private logger = new Logger(this)

  private store: Partial<Record<OpenaiModel, Usage>> = {
    // [OpenaiObject.Model.O_1]: {
    //   input: {
    //     count: 0,
    //     price: 15 / 1000000,
    //     priceSum: 0,
    //   },
    //   output: {
    //     count: 0,
    //     price: 60 / 1000000,
    //     priceSum: 0,
    //   },
    //   count: 0,
    //   priceSum: 0,
    //   limit: 300000,
    //   limits: {
    //     minute: {
    //       price: {
    //         count: 0,
    //         limit: 5,
    //         dateUpdated: new Date(),
    //       },
    //     },
    //   },
    // },
    [OpenaiModel.DEFAULT]: {
      input: {
        count: 0,
        price: 3 / 1000000,
        priceSum: 0,
      },
      output: {
        count: 0,
        price: 12 / 1000000,
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
    [OpenaiModel.JSON]: {
      input: {
        count: 0,
        price: 5 / 1000000,
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
    // [OpenaiObject.Model.GPT_4_O_MINI]: {
    //   input: {
    //     count: 0,
    //     price: 0.15 / 1000000,
    //     priceSum: 0,
    //   },
    //   output: {
    //     count: 0,
    //     price: 0.6 / 1000000,
    //     priceSum: 0,
    //   },
    //   count: 0,
    //   priceSum: 0,
    //   limit: 300000,
    //   limits: {
    //     minute: {
    //       price: {
    //         count: 0,
    //         limit: 5,
    //         dateUpdated: new Date(),
    //       },
    //     },
    //   },
    // },
    // [OpenaiObject.Model.GPT_4]: {
    //   input: {
    //     count: 0,
    //     price: 10 / 1000000,
    //     priceSum: 0,
    //   },
    //   output: {
    //     count: 0,
    //     price: 30 / 1000000,
    //     priceSum: 0,
    //   },
    //   count: 0,
    //   priceSum: 0,
    //   limit: 300000,
    // },
    // [OpenaiObject.Model.GPT_3_5]: {
    //   input: {
    //     count: 0,
    //     price: 0.5 / 1000000,
    //     priceSum: 0,
    //   },
    //   output: {
    //     count: 0,
    //     price: 1.5 / 1000000,
    //     priceSum: 0,
    //   },
    //   count: 0,
    //   priceSum: 0,
    //   limit: 180000,
    // },
    [OpenaiModel.IMAGE]: {
      input: {
        count: 0,
        price: 0,
        priceSum: 0,
      },
      output: {
        count: 0,
        price: 0.04,
        priceSum: 0,
      },
      count: 0,
      priceSum: 0,
      limit: 1000,
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
    model: OpenaiModel
    response: OpenaiSDK.Chat.Completions.ChatCompletion
  }): void {
    const usage = options.response.usage

    if (!usage) {
      return
    }

    this.store[options.model].input.count += usage.prompt_tokens
    this.store[options.model].output.count += usage.completion_tokens
    this.store[options.model].count += usage.total_tokens

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
      this.store[options.model].input.price * usage.prompt_tokens +
      this.store[options.model].output.price * usage.completion_tokens

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
    model: OpenaiModel
    response: OpenaiSDK.Chat.Completions.ChatCompletion
  }): number {
    const usage = options.response.usage

    const priceInput =
      usage.prompt_tokens * this.store[options.model].input.price
    const priceOutput =
      usage.completion_tokens * this.store[options.model].output.price

    const cost = (priceInput + priceOutput).toFixed(2)

    return parseFloat(cost)
  }

  getUsageCostTotal(options: { model: OpenaiModel }): number {
    return this.store[options.model].priceSum
  }

  hasReachedMinutePriceLimit(options: { model: OpenaiModel }): boolean {
    return (
      this.store[options.model].limits.minute.price.count >=
      this.store[options.model].limits.minute.price.limit
    )
  }

  print(model: OpenaiModel): void {
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
