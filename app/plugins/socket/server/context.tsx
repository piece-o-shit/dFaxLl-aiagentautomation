import { Socket } from 'socket.io'
import { AuthenticationServer } from '../../../core/authentication/server'

export const createContext = async (socket: Socket) => {
  const context = await AuthenticationServer.createSocketContext(socket)

  if (!context.session?.user) {
    console.log(`User must be authenticated`)
    socket.disconnect()
    return
  }

  return context
}

export const createContextPublic = async (socket: Socket) => {
  const context = await AuthenticationServer.createSocketContext(socket)

  return context
}
