import { createTrpcContext } from './context'

class Service {
  /**
   * This function is called when a new user sign up, you can use it to send welcome email for example
   */
  async onRegistration(
    ctx: Awaited<ReturnType<typeof createTrpcContext>>,
    userId: string,
  ) {
    const user = await ctx.databaseUnprotected.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return
    }
  }
}

class Singleton {
  static service = new Service()
}

export const AuthenticationService = Singleton.service
