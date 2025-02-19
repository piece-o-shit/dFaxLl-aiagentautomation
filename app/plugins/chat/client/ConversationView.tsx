import { ChatConversation } from '@prisma/client'
import { Flex } from 'antd'
import React, { useState } from 'react'
import { ConversationCreateModal } from './components/ConversationCreateModal'
import { ConversationList } from './components/ConversationList'
import { ConversationThread } from './components/ConversationThread'

type Props = {
  maxHeight?: string
}

export const ConversationView: React.FC<Props> = ({ maxHeight = '85vh' }) => {
  const [conversation, setConversation] = useState<ChatConversation>()

  if (conversation) {
    return (
      <Flex
        className="scrollbar--minimalist"
        justify="center"
        style={{ height: maxHeight }}
      >
        <Flex vertical style={{ maxWidth: '800px', width: '100%' }}>
          <ConversationThread
            onBack={() => setConversation(null)}
            conversation={conversation}
          />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex
      className="scrollbar--minimalist"
      justify="center"
      style={{ height: maxHeight }}
    >
      <Flex vertical style={{ maxWidth: '800px', width: '100%' }}>
        <Flex justify="right" className="pb-2">
          <ConversationCreateModal onSelect={item => setConversation(item)} />
        </Flex>

        <ConversationList onSelect={item => setConversation(item)} />
      </Flex>
    </Flex>
  )
}
