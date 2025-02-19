import { ChatConversation, User } from '@prisma/client'
import { Flex, message } from 'antd'
import React from 'react'
import { useUserContext } from '~/core/context'
import { Api } from '~/core/trpc'
import { MessageInput } from '../ui/MessageInput'
import { MessageThread } from '../ui/MessageThread'

type Props = {
  users: User[]
  onCreated(conversation: ChatConversation): void
}

export const ConversationCreate: React.FC<Props> = ({
  users = [],
  onCreated,
}) => {
  const { user } = useUserContext()

  const api = Api.useUtils()

  const { mutateAsync: createConversation } =
    Api.chatConversation.create.useMutation()

  const { mutateAsync: createMessage } = Api.chatMessage.create.useMutation()

  const handleSend = async (content: string) => {
    try {
      const conversation = await createConversation({
        data: {
          participants: {
            createMany: {
              data: users.map(user => ({
                userId: user.id,
              })),
            },
          },
        },
      })

      if (!conversation) {
        throw new Error(`Could not create conversation`)
      }

      const participant = await api.chatParticipant.findFirst.fetch({
        where: { conversationId: conversation.id, userId: user.id },
      })

      if (!participant) {
        throw new Error(`Could not create participant`)
      }

      const messageCreated = await createMessage({
        data: {
          content,
          participantId: participant.id,
          conversationId: conversation.id,
        },
      })

      if (!messageCreated) {
        throw new Error(`Could not create message`)
      }

      onCreated(conversation)
    } catch (error) {
      message.error(`Could not start conversation: ${error.message}`)
    }
  }

  const EmptySpace = () => (
    <Flex style={{ height: '20vh' }}>
      <span />
    </Flex>
  )

  return (
    <>
      <MessageThread users={users} messages={[]} />

      <EmptySpace />

      <MessageInput onSend={handleSend} />
    </>
  )
}
