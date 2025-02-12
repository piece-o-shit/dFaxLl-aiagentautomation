import { User } from '@prisma/client'
import { ActionFunction, json } from '@remix-run/node'
import { AuthenticationServer } from '~/core/authentication/server'
import { Utility } from '~/core/helpers/utility'
import { PaymentService } from './payment.service'

export const webhookStripeAction: ActionFunction = async ({ request }) => {
  const ctx = await AuthenticationServer.getHttpContextPublic({ request })

  try {
    console.log('Stripe webhook received')

    if (!PaymentService.isActive()) {
      return json(`Stripe not activated`, {
        status: 400,
      })
    }

    const sig = request.headers.get('Stripe-Signature') as string

    const text = await request.text()

    const buffer = Buffer.from(text)

    const data = await PaymentService.onPayment(buffer, sig)

    if (Utility.isNull(data)) {
      return json(`Could not parse request body`, {
        status: 400,
      })
    }

    const { userId, stripeCustomerId } = data

    let user: User

    if (userId && stripeCustomerId) {
      user = await ctx.databaseUnprotected.user.findFirstOrThrow({
        where: { id: userId, stripeCustomerId },
      })
    } else if (userId) {
      user = await ctx.databaseUnprotected.user.findFirstOrThrow({
        where: { id: userId },
      })
    } else if (stripeCustomerId) {
      user = await ctx.databaseUnprotected.user.findFirstOrThrow({
        where: { stripeCustomerId },
      })
    }

    if (!user) {
      return json(
        `Could find any user with userId (${userId}) and customerId (${stripeCustomerId})`,
        {
          status: 404,
        },
      )
    }

    if (!user.stripeCustomerId) {
      user = await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomerId },
      })

      console.log(
        `Stripe customer id "${stripeCustomerId}" saved on user "${user.id}"`,
      )
    }

    // Add your custom logic here

    return json(`Webhook successful`)
  } catch (error) {
    console.log(error)
    return json(`Could not handle stripe webhook`, { status: 500 })
  }
}
