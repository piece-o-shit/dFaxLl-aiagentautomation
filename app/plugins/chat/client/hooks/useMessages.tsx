import {
  ChatConversation,
  ChatMessage,
  ChatParticipant,
  Prisma,
  User,
} from '@prisma/client'
import { message as messageAntd } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useUserContext } from '~/core/context'
import { Utility } from '~/core/helpers/utility'
import { Api } from '~/core/trpc'
import { SocketClient } from '~/plugins/socket/client'

export type MessageItem = Prisma.ChatMessageGetPayload<{
  include: { participant: { include: { user: true } } }
}> & { isLoading?: boolean }

type Props = {
  conversation: ChatConversation
  participants: (ChatParticipant & { user: User })[]
  messages: ChatMessage[]
}

export const useMessages = ({
  conversation,
  participants = [],
  messages: messagesInitial = [],
}: Props) => {
  /* -------------------------------- VARIABLES ------------------------------- */
  const { user } = useUserContext()

  const [messages, setMessages] = useState<
    (ChatMessage & { isLoading?: boolean })[]
  >([])

  const [messagesLoading, setMessagesLoading] = useState(
    new Map<string, boolean>(),
  )

  const { mutateAsync: createMessage } = Api.chatMessage.create.useMutation()
  const { mutateAsync: updateParticipant } =
    Api.chatParticipant.update.useMutation()

  const { emit } = SocketClient.useEvent<ChatMessage>(
    conversation?.id,
    payload => {
      setMessages(messagesBefore => [...messagesBefore, payload])
    },
  )

  /* -------------------------------- COMPUTED -------------------------------- */
  useEffect(() => {
    if (conversation) {
      setMessages(messagesInitial ?? [])
    }
  }, [messagesInitial])

  const items: MessageItem[] = useMemo(() => {
    return messages
      .map(message => {
        const participant = participants?.find(
          candidate => candidate.id === message.participantId,
        )

        return {
          ...message,
          participant,
        }
      })
      .filter(message => !!message.participant)
  }, [messages, participants])

  const participantCurrent = useMemo(() => {
    return participants?.find(participant => participant.userId === user.id)
  }, [participants])

  const participantsOther = useMemo(() => {
    return (
      participants?.filter(participant => participant.userId !== user.id) ?? []
    )
  }, [participants])

  useEffect(() => {
    const lastMessage = messages.slice(-1)[0]

    const canMark =
      lastMessage &&
      participantCurrent &&
      participantCurrent.lastReadMessageId !== lastMessage.id

    if (canMark) {
      markAsRead(participantCurrent, lastMessage)
    }
  }, [messages, participantCurrent])

  /* --------------------------------- METHODS -------------------------------- */

  const sendMessage = async (content: string) => {
    try {
      const idCreated = Utility.getUUID()

      const messageLocal: ChatMessage & { isLoading: boolean } = {
        id: idCreated,
        content,
        conversationId: conversation.id,
        participantId: participantCurrent.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isLoading: true,
      }

      setMessages([...messages, messageLocal])

      const messageCreated = await createMessage({
        data: {
          id: idCreated,
          participantId: participantCurrent.id,
          content,
          conversationId: conversation.id,
        },
      })

      emit({
        payload: messageCreated,
        userIds: participantsOther.map(participant => participant.userId),
      })

      setMessages([...messages, messageCreated])

      setMessagesLoading(_ => {
        messagesLoading.delete(idCreated)

        return messagesLoading
      })
    } catch (error) {
      messageAntd.error(`Could not send message: ${error.message}`)
    }
  }

  const markAsRead = async (
    participant: ChatParticipant,
    message: ChatMessage,
  ) => {
    try {
      await updateParticipant({
        where: { id: participant.id },
        data: {
          lastReadMessageId: message.id,
        },
      })
    } catch (error) {
      messageAntd.error(`Something went wrong: ${error.message}`)
    }
  }

  return {
    items,
    sendMessage,
  }
}
