import { ChatConversation } from '@prisma/client'
import { Badge, Card, Flex, Typography } from 'antd'
import React from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { ConversationAvatar } from '../ui/ConversationAvatar'
import { useLogic } from './useLogic'

type Props = { onSelect(conversation: ChatConversation): void }

export const ConversationList: React.FC<Props> = ({ onSelect }) => {
  const { items, isLoading } = useLogic()

  const handleClickConversation = async (conversation: ChatConversation) => {
    onSelect(conversation)
  }

  const isEmpty = items.length === 0

  const EmptyState = () => {
    return (
      <Flex flex={1} align="center" justify="center" vertical gap={16}>
        <Typography.Title type="secondary">
          <i className="las la-frog"></i>
        </Typography.Title>

        <Typography.Text type="secondary">
          You have no conversations
        </Typography.Text>
      </Flex>
    )
  }

  const LoadingState = () => {
    return (
      <Flex flex={1} align="center" justify="center" vertical>
        <Typography.Title level={3}>
          <LoadingOutlined />
        </Typography.Title>
      </Flex>
    )
  }

  return (
    <>
      <Flex
        vertical
        flex={1}
        className="w-full"
        gap={10}
        style={{ overflowY: 'auto' }}
      >
        {isLoading ? (
          <LoadingState />
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <>
            {items.map(item => {
              return (
                <Card
                  key={item.id}
                  className="w-full"
                  size="small"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClickConversation(item.conversation)}
                >
                  <Flex gap={16} align="center">
                    <ConversationAvatar users={item.users} />

                    <Flex vertical flex={1}>
                      <Typography.Text strong>
                        {item.userTo.name}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {item.message.content}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {item.date}
                      </Typography.Text>
                    </Flex>

                    {!item.isRead && (
                      <Badge count={' '} size="small" color="blue" />
                    )}
                  </Flex>
                </Card>
              )
            })}
          </>
        )}
      </Flex>
    </>
  )
}
