import { ChatConversation } from '@prisma/client'
import { Api } from '~/core/trpc'

type Props = {
  conversation: ChatConversation
}

export const useConversation = ({ conversation }: Props) => {
  const { data, isLoading } = Api.chatConversation.findFirst.useQuery({
    where: {
      id: conversation.id,
    },
    include: {
      participants: { include: { user: true } },
      messages: { orderBy: { createdAt: 'asc' } },
    },
  })

  const participants = data?.participants ?? []
  const users = participants.map(participant => participant.user)

  return {
    isLoading,
    conversation: data,
    participants,
    messages: data?.messages ?? [],
    users,
  }
}
