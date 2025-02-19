import { User } from '@prisma/client'
import { Flex } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { MessageItem } from '../../hooks/useMessages'
import { ConversationAvatar } from './ConversationAvatar'
import { MessageBubble } from './MessageBubble'

type Props = {
  users: User[]
  messages: MessageItem[]
}

export const MessageThread: React.FC<Props> = ({ users, messages }) => {
  const [isSetup, setSetup] = useState(false)
  const refEndOfFeed = useRef(null)

  useEffect(() => {
    if (isSetup) {
      refEndOfFeed.current?.scrollIntoView({ behavior: 'smooth' })
    }

    if (refEndOfFeed) {
      refEndOfFeed.current?.scrollIntoView({})
      setSetup(true)
    }
  }, [refEndOfFeed, messages])

  return (
    <>
      <Flex
        vertical
        flex={1}
        className="w-full p-10"
        gap={10}
        style={{ opacity: isSetup ? 1 : 0 }}
      >
        <Flex align="center" justify="center" vertical className="mb-10">
          <ConversationAvatar sizePixel={100} users={users} isNames />
        </Flex>

        {messages.map((message, index) => (
          <Flex key={message.id} className="w-full">
            <MessageBubble
              message={message}
              participant={message.participant}
              user={message.participant.user}
              isLoading={message.isLoading}
              participantIdBefore={messages[index - 1]?.participantId}
              participantIdAfter={messages[index + 1]?.participantId}
            />
          </Flex>
        ))}

        <span ref={refEndOfFeed} />
      </Flex>
    </>
  )
}
