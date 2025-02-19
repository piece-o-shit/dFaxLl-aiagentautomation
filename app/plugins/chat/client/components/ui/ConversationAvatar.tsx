import { User } from '@prisma/client'
import { Avatar, Flex, Typography } from 'antd'
import React from 'react'
import { useUserContext } from '~/core/context'
import { Utility } from '~/core/helpers/utility'

type Props = {
  sizePixel?: number
  users: User[]
  isNames?: boolean
}

export const ConversationAvatar: React.FC<Props> = ({
  sizePixel,
  isNames = false,
  users = [],
}) => {
  const { user: userCurrent } = useUserContext()

  const SIZE_PX = sizePixel ?? 64

  const usersFiltered = users
    .filter(user => user.id !== userCurrent.id)
    .slice(0, 2)

  const userOneName = usersFiltered[0]?.name
  const userOnePictureUrl = usersFiltered[0]?.pictureUrl

  const userTwoName = usersFiltered[1]?.name
  const userTwoPictureUrl = usersFiltered[1]?.pictureUrl

  const names = usersFiltered.map(user => user.name).join(', ')

  if (userTwoName) {
    return (
      <Flex vertical align="center" justify="center">
        <div
          style={{
            position: 'relative',
            height: `${SIZE_PX}px`,
            width: `${SIZE_PX}px`,
          }}
        >
          <Avatar
            src={userOnePictureUrl}
            size={(SIZE_PX * 2) / 3}
            style={{
              position: 'absolute',
              zIndex: 2,
              bottom: 0,
              left: 0,
              border: '3px solid white',
            }}
          >
            {Utility.stringToInitials(userOneName)}
          </Avatar>

          <Avatar
            src={userTwoName}
            size={(SIZE_PX * 2) / 3}
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              right: 0,
              border: '3px solid white',
            }}
          >
            {Utility.stringToInitials(userTwoPictureUrl)}
          </Avatar>
        </div>

        {isNames && <Typography.Title level={4}>{names}</Typography.Title>}
      </Flex>
    )
  }

  return (
    <Flex vertical align="center" justify="center">
      <Avatar
        src={userOnePictureUrl}
        size={SIZE_PX}
        style={{ border: '3px solid white' }}
      >
        {Utility.stringToInitials(userOneName)}
      </Avatar>

      {isNames && <Typography.Title level={4}>{names}</Typography.Title>}
    </Flex>
  )
}
