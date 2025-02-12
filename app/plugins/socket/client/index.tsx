import { SocketProvider, useSocket, useSocketEvent } from './useSocket'

/**
 * @provider SocketClient
 * @description Socket hooks using socket.io in the background to interact with the socket server.
 * @function {({options: {payload: any, userIds?: string[]}) => void} emit - Emit a payload on the hook's key to one or more users. If userIds is empty, all users are notified.
 * @usage `const { emit } = SocketClient.useEvent('your-event-key', (payload) => console.log(payload)); emit({ payload: { hello: 'world' }, userIds: ['user-id-of-someone'] });`
 * @import import { SocketClient } from '@/plugins/socket/client'
 */
export namespace SocketClient {
  export const Provider = SocketProvider
  export const use = useSocket
  export const useEvent = useSocketEvent
}
