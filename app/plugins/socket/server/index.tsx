import { User } from '@prisma/client'
import { createServer } from 'http'
import { SocketBase } from '../base'
import { createContext } from './context'

const startServer = (
  httpServer: ReturnType<typeof createServer> | undefined,
) => {
  if (SocketBase.service.io) {
    return
  }

  const io = SocketBase.service.start(httpServer)

  io.on('connection', async socket => {
    const context = await createContext(socket)

    const userId = context.session?.user?.id

    if (!userId) {
      return
    }

    SocketBase.service.registerUser(userId, socket)

    console.log(`User "${userId}" is now connected with socket "${socket.id}"`)

    socket.on('automatic', async data => {
      try {
        const { key, payload, userIds = [] } = data

        let users: User[] = []

        if (userIds.length > 0) {
          users = await context.database.user.findMany({
            where: { id: { in: userIds } },
          })
        } else {
          users = await context.database.user.findMany({})
        }

        const userIdsFiltered = users.map(user => user.id)

        const { count } = SocketBase.service.emit(key, payload, userIdsFiltered)

        console.log(
          `"${key}" event emitted from "${userId}" on ${count} sockets`,
        )
      } catch (error) {
        // ignore
      }
    })

    socket.on('disconnect', () => {
      try {
        SocketBase.service.disconnectUser(userId, socket)

        console.log(`User "${userId}" disconnected with socket "${socket.id}"`)
      } catch (error) {
        console.error(`Could not disconnect user: ${error.message}`)
      }
    })
  })
}

export namespace SocketServer {
  export const start = startServer
}
