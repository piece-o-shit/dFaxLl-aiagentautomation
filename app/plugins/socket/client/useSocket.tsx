import { App } from 'antd'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'
import { useUserContext } from '~/core/context'

type SocketContextType = {
  isLive: boolean
  socket?: Socket
}

const SocketContext = createContext<SocketContextType>(undefined)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket>()
  const { user } = useUserContext()

  const [isLive, setLive] = useState(false)

  useEffect(() => {
    if (!user) {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }

      return
    }

    socketRef.current = io({
      reconnectionDelayMax: 10000,
    })

    socketRef.current.on('connect', () => {
      setLive(true)
    })

    socketRef.current.on('error', error => {
      console.log(`Could not connect to server: ${error.message}`)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [user?.id])

  return (
    <SocketContext.Provider
      value={{
        isLive,
        socket: socketRef.current,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketEvent<DataType = unknown>(
  key: string,
  callback: (data: DataType) => void,
) {
  const { isLive, socket } = useSocket()

  const { message } = App.useApp()

  useEffect(() => {
    if (isLive && key) {
      socket.on(key, data => {
        callback(data.payload)
      })
    }
  }, [isLive, key])

  const emit = (options: { payload: DataType; userIds?: string[] }) => {
    if (!isLive) {
      message.error(`Socket is not active`)
    }

    socket.emit('automatic', { key, ...options })
  }

  return {
    emit,
  }
}

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext)

  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context
}
