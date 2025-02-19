import { ChatMessage, ChatParticipant, User } from '@prisma/client'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useUserContext } from '~/core/context'
import { Utility } from '~/core/helpers/utility'
import { Api } from '~/core/trpc'

export const useLogic = () => {
  const { user } = useUserContext()
  const [isSetup, setSetup] = useState(false)
  /* ---------------------------------- QUERY --------------------------------- */

  const {
    data: conversations,
    isLoading,
    isFetched,
  } = Api.chatConversation.findMany.useQuery(
    {
      where: {
        participants: {
          some: { userId: user?.id },
        },
      },
      include: {
        participants: {
          include: { user: true },
        },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    },
    { initialData: [] },
  )

  /* --------------------------------- METHODS -------------------------------- */

  const getMessage = (message?: ChatMessage): ChatMessage => {
    const messageDefault = {
      id: Utility.getUUID(),
      participantId: 'none',
      content: 'Start conversation',
      createdAt: new Date(),
      updatedAt: new Date(),
      conversationId: Utility.getUUID(),
    }

    return message ?? messageDefault
  }

  const getMyParticipant = (participants: ChatParticipant[]) => {
    return participants.find(participant => participant.userId === user.id)
  }

  const getOtherUsers = (
    participants: (ChatParticipant & { user: User })[],
  ) => {
    const users = participants
      .map(participant => participant.user)
      .filter(item => item.id !== user.id)

    if (users.length === 0) {
      return [
        {
          name: 'Unknown',
          email: 'unknown@unknown.com',
        } as User,
      ]
    }

    return users
  }

  const getMessageDate = (message: ChatMessage) => {
    const date = dayjs(message?.createdAt).format('DD MMM, YYYY')
    const hour = dayjs(message?.createdAt).format('HH:mm')
    return `${date} at ${hour}`
  }

  const isMessageRead = (
    message: ChatMessage,
    participantCurrent: ChatParticipant,
  ) => {
    const hasNoParticipant = message.participantId === 'none'
    const isFromMe = message.participantId === participantCurrent?.id
    const isRead = participantCurrent?.lastReadMessageId === message.id

    return hasNoParticipant || isRead || isFromMe
  }

  const items = useMemo(() => {
    return conversations
      .map(conversation => {
        const message = getMessage(conversation.messages[0])

        const participantCurrent = getMyParticipant(conversation.participants)

        const users = getOtherUsers(conversation.participants)

        const userTo = users[0]

        const date = getMessageDate(message)

        const isRead = isMessageRead(message, participantCurrent)

        return {
          id: conversation.id,
          message,
          users,
          userTo,
          date,
          isRead,
          conversation,
        }
      })
      .sort(
        (a, b) =>
          new Date(b.message.createdAt).getTime() -
          new Date(a.message.createdAt).getTime(),
      )
  }, [conversations])

  useEffect(() => {
    if (items && isFetched && !isSetup) {
      setSetup(true)
    }
  }, [items, isFetched])

  return {
    items,
    isLoading: isLoading || !isSetup,
  }
}
