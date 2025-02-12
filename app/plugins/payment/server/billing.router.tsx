import { Configuration } from '@/core/configuration'
import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { PaymentService } from './payment.service'

/**
 * @provider BillingApi
 * @description A api to query the billing API
 * @function {() => Promise<BillingProduct[]>} findManyProducts - Find many products
 * @function {() => Promise<BillingSubscription[]>} findManySubscriptions - Find many subscriptions
 * @function {() => Promise<BillingPayment[]>} findManyPayments - Find many payments
 * @function {(options: {productId: string}) => Promise<string>} createPaymentLink - Create a payment link for a product
 * @usage `const {data: products, isLoading} = api.billing.findManyProducts.useQuery({}); `
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */

export const BillingRouter = Trpc.createRouter({
  findManyProducts: Trpc.procedurePublic.input(z.object({})).query(async () => {
    checkStripeNotActive()

    return PaymentService.findManyProducts()
  }),

  findManyPayments: Trpc.procedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      checkStripeNotActive()

      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      checkCustomerId(user)

      return PaymentService.findManyPayments(user)
    }),

  findManySubscriptions: Trpc.procedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      checkStripeNotActive()

      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      checkCustomerId(user)

      return PaymentService.findManySubscriptions(user)
    }),

  createPaymentLink: Trpc.procedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      checkStripeNotActive()
      const userId = ctx.session?.user?.id

      let user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      let stripeCustomerId = PaymentService.getCustomerId(user)

      if (!stripeCustomerId) {
        stripeCustomerId = await PaymentService.createCustomer(user)

        user = await ctx.database.user.update({
          where: { id: user.id },
          data: { stripeCustomerId },
        })
      }

      const urlRedirection = Configuration.getBaseUrl()

      const url = await PaymentService.createPaymentLink({
        user,

        productId: input.productId,
        metadata: {
          userId: user.id,
        },
        urlRedirection,
      })

      return { url }
    }),
})

const checkStripeNotActive = () => {
  if (!PaymentService.isActive()) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Stripe is not active',
    })
  }
}

const checkCustomerId = (customer: User) => {
  if (!PaymentService.getCustomerId(customer)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'No customer id',
    })
  }
}
