import { CaretLeftFilled } from '@ant-design/icons'
import { ChatConversation } from '@prisma/client'
import { Button, Flex, Typography } from 'antd'
import React from 'react'
import { useUserContext } from '~/core/context'
import { useConversation } from '../../hooks/useConversation'
import { useMessages } from '../../hooks/useMessages'
import { ConversationAvatar } from '../ui/ConversationAvatar'
import { MessageInput } from '../ui/MessageInput'
import { MessageThread } from '../ui/MessageThread'

type Props = {
  conversation: ChatConversation
  onBack(): void
}

export const ConversationThread: React.FC<Props> = ({ onBack, ...props }) => {
  const { user: userCurrent } = useUserContext()

  const { users, conversation, participants, messages, isLoading } =
    useConversation(props)

  const { items, sendMessage } = useMessages({
    conversation,
    participants,
    messages,
  })

  const handleSend = async (content: string) => {
    sendMessage(content)
  }

  const names = users
    .filter(user => user.id !== userCurrent.id)
    .map(user => user.name)
    .join(', ')

  return (
    <>
      <Flex justify="left" gap={8}>
        <Button type="text" icon={<CaretLeftFilled />} onClick={onBack}>
          Back
        </Button>

        {users && (
          <Flex align="center" gap={8}>
            <ConversationAvatar users={users} sizePixel={30} />
            <Typography.Text strong>{names}</Typography.Text>
          </Flex>
        )}
      </Flex>

      <Flex vertical flex={1} style={{ overflowY: 'hidden' }}>
        <Flex flex={1} style={{ overflowY: 'auto' }}>
          <MessageThread users={users} messages={items} />
        </Flex>

        <MessageInput
          isDisabled={!conversation || isLoading}
          onSend={handleSend}
        />
      </Flex>
    </>
  )
}
