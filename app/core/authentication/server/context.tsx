import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { enhance } from '@zenstackhq/runtime'
import jwt from 'jsonwebtoken'
import { Database } from '../../database'
import { Cookies } from './cookies'

import { Socket } from 'socket.io'

const getSession = async (options: { accessToken: string }) => {
  let user: { id: string; email: string; name?: string }

  try {
    const token = options.accessToken

    if (!token) {
      throw new Error()
    }

    const { userId } = jwt.verify(
      token,
      process.env.SERVER_AUTHENTICATION_SECRET,
    ) as {
      userId: string
    }

    user = await Database.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        globalRole: true,
      },
    })

    return { user }
  } catch (error) {
    return {}
  }
}

const getPrisma = (session: Awaited<ReturnType<typeof getSession>>) => {
  const databaseProtected = enhance(Database, { user: session.user })

  return {
    database: databaseProtected,
    databaseUnprotected: Database,
    prisma: databaseProtected,
    masterPrisma: Database,
  }
}

export const createTrpcContext = async (
  options: FetchCreateContextFnOptions,
) => {
  const accessToken = Cookies.get(options.req, 'MARBLISM_ACCESS_TOKEN')

  const session = await getSession({ accessToken })

  const prisma = getPrisma(session)

  return {
    session,
    request: options.req,
    responseHeaders: options.resHeaders,
    ...prisma,
  }
}

export const createHttpContext = async (options: { request: Request }) => {
  const accessToken = Cookies.get(options.request, 'MARBLISM_ACCESS_TOKEN')

  const session = await getSession({ accessToken })

  const prisma = getPrisma(session)

  return {
    session,
    ...prisma,
  }
}

export const createSocketContext = async (socket: Socket) => {
  const accessToken = Cookies.getFromSocket(socket, 'MARBLISM_ACCESS_TOKEN')

  const session = await getSession({ accessToken })

  const prisma = getPrisma(session)

  return {
    session,
    ...prisma,
  }
}
