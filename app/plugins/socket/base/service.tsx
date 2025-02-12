import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const singleton = globalThis as unknown as {
  httpServer: ReturnType<typeof createServer> | undefined
  io: Server | undefined
  usersConnected: Record<string, { socketIds: Record<string, boolean> }>
}

const start = (httpServer: ReturnType<typeof createServer> | undefined) => {
  if (singleton.io) {
    return singleton.io
  }

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  })

  singleton.httpServer = httpServer
  singleton.io = io
  singleton.usersConnected = {}

  console.log(`Socket server created`)

  return io
}

const registerUser = (userId: string, socket: Socket) => {
  if (!singleton.usersConnected[userId]) {
    singleton.usersConnected[userId] = { socketIds: {} }
  }

  singleton.usersConnected[userId].socketIds[socket.id] = true
}

const getUserSockets = (userId: string) => {
  const userConnected = singleton.usersConnected[userId]

  if (!userConnected) {
    return []
  }

  const socketIds = Object.keys(userConnected.socketIds)

  return socketIds
}

const disconnectUser = (userId: string, socket: Socket) => {
  if (!singleton.usersConnected[userId]) {
    return
  }

  delete singleton.usersConnected[userId].socketIds[socket.id]

  if (Object.keys(singleton.usersConnected[userId].socketIds).length === 0) {
    delete singleton.usersConnected[userId]
  }
}

const emit = (key: string, payload: any, userIds: string[]) => {
  let count: number = 0

  for (const userId of userIds) {
    const socketIds = getUserSockets(userId)

    socketIds.forEach(socketId => {
      singleton.io.to(socketId).emit(key, { payload })

      count++
    })
  }

  return { count }
}

const emitToAll = (key: string, payload: any) => {
  const userIds = Object.keys(singleton.usersConnected)

  return emit(key, payload, userIds)
}

export const SocketService = {
  io: singleton.io,
  start,
  registerUser,
  getUserSockets,
  disconnectUser,
  emit,
  emitToAll,
}
