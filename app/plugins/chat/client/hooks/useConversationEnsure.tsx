import { ChatConversation, Prisma, User } from '@prisma/client'
import { useUserContext } from '~/core/context'
import { Utility } from '~/core/helpers/utility'
import { Api } from '~/core/trpc'

export type ChatConversationFull = Prisma.ChatConversationGetPayload<{
  include: {
    participants: { include: { user: true } }
    messages: { orderBy: { createdAt: 'asc' } }
  }
}> & { isLocal?: boolean }

export const useConversationEnsure = () => {
  const { user } = useUserContext()

  const api = Api.useUtils()

  const { mutateAsync: createConversation } =
    Api.chatConversation.create.useMutation()

  const findOneById = async (id: string) => {
    const conversation = await api.chatConversation.findFirst.fetch({
      where: {
        id,
      },
      include: {
        participants: { include: { user: true } },
        messages: { orderBy: { createdAt: 'asc' } },
      },
    })

    return conversation as ChatConversationFull
  }

  /**
   * Find the conversation with a user OR create a local one.
   *
   * Note: local conversation is stored in database only if a message is sent.
   */
  const findOneByUser = async (userTo: User): Promise<ChatConversationFull> => {
    const conversationExisting = await api.chatConversation.findFirst.fetch({
      where: {
        participants: {
          every: { userId: { in: [userTo.id, user.id] } },
        },
      },
      include: {
        participants: { include: { user: true } },
        messages: { orderBy: { createdAt: 'asc' } },
      },
    })

    if (conversationExisting) {
      return conversationExisting as ChatConversationFull
    } else {
      const conversationId = Utility.getUUID()

      return {
        isLocal: true,
        id: conversationId,
        createdAt: new Date(),
        updatedAt: new Date(),
        participants: [
          {
            id: Utility.getUUID(),
            userId: user.id,
            user: user,
            lastReadMessageId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationId,
          },
          {
            id: Utility.getUUID(),
            userId: userTo.id,
            user: userTo,
            lastReadMessageId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationId,
          },
        ],
        messages: [],
      }
    }
  }

  const ensureOne = async (
    conversation: ChatConversationFull,
    participants: { userId: string }[],
  ): Promise<ChatConversation> => {
    if (!conversation.isLocal) {
      return conversation
    }

    const conversationExisting = await api.chatConversation.findFirst.fetch({
      where: {
        id: conversation.id,
      },
    })

    if (conversationExisting) {
      return conversationExisting
    } else {
      const conversationCreated = await createConversation({
        data: {
          id: conversation.id,
          participants: {
            createMany: {
              data: participants.map(participant => ({
                userId: participant.userId,
              })),
            },
          },
        },
      })

      return findOneById(conversationCreated.id)
    }
  }

  return {
    findOneById,
    findOneByUser,
    ensureOne,
  }
}
