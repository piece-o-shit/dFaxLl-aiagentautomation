import { LoadingOutlined } from '@ant-design/icons'
import { ChatMessage, ChatParticipant, User } from '@prisma/client'
import { Avatar, Flex, Typography } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { useUserContext } from '~/core/context'
import { Utility } from '~/core/helpers/utility'

type Props = {
  user: User
  participant: ChatParticipant
  message: ChatMessage
  isLoading?: boolean
  participantIdBefore?: string
  participantIdAfter?: string
}

export const MessageBubble: React.FC<Props> = ({
  message,
  participant,
  user,
  isLoading,
  participantIdBefore,
  participantIdAfter,
}) => {
  const { user: userCurrent } = useUserContext()

  const lines: string[] = message.content.trim().split('\n')

  const isFirstMessageFromParticipant = participantIdBefore !== participant.id
  const isLastMessageFromParticipant = participantIdAfter !== participant.id

  const isFromMe = user.id === userCurrent.id

  const values = isFromMe
    ? {
        justify: 'right',
        borderRadius: '12px 12px 12px 0px',
        color: 'white',
        background: '#3f3f3f',
      }
    : {
        justify: 'left',
        borderRadius: '12px 12px 0px 12px',
        color: 'black',
        background: '#F7F7F7',
      }

  const isName = isFirstMessageFromParticipant && !isFromMe
  const isAvatar = isLastMessageFromParticipant && !isFromMe

  const dateFormatted = dayjs(message.createdAt).format('DD MMM, YYYY HH:mm')

  return (
    <Flex justify={values.justify} className="w-full">
      <Flex style={{ maxWidth: '80%' }}>
        {isLoading && (
          <Flex align="end" className="pr-2">
            <LoadingOutlined />
          </Flex>
        )}

        <Flex align="end" style={{ width: '30px' }}>
          {isAvatar && (
            <Avatar size={24} src={user.pictureUrl}>
              {Utility.stringToInitials(user.name)}
            </Avatar>
          )}

          {!isAvatar && <span />}
        </Flex>

        <Flex vertical>
          {isName && (
            <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
              {user.name}
            </Typography.Text>
          )}

          <Flex
            className="p-2"
            style={{
              background: values.background,
              borderRadius: values.borderRadius,
              color: values.color,
            }}
            vertical
            title={dateFormatted}
          >
            {lines.map((line, index) => (
              <div key={index}>{Utility.isDefined(line) ? line : <br />}</div>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
