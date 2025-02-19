import { LoadingOutlined } from '@ant-design/icons'
import { User } from '@prisma/client'
import { Avatar, Card, Flex, Input, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { useUserContext } from '~/core/context'
import { Utility } from '~/core/helpers/utility'
import { Api } from '~/core/trpc'

type Props = {
  onClickUser(user: User): void
}

export const ChatContactList: React.FC<Props> = ({ onClickUser }) => {
  const { user } = useUserContext()

  const [search, setSearch] = useState('')

  const {
    data: users,
    isLoading,
    isRefetching,
  } = Api.user.findMany.useQuery(
    {
      where: user ? { id: { not: user.id } } : undefined,
      orderBy: { name: 'asc' },
    },
    { initialData: [] },
  )

  const sanitizeText = (value = '') => {
    return value.replace(/[^a-zA-z0-9]/, '').toLowerCase()
  }

  const usersFiltered = useMemo(() => {
    if (Utility.isNull(search?.trim())) {
      return users
    }

    const searchPattern = sanitizeText(search?.trim())

    return users.filter(
      user =>
        sanitizeText(user.name).includes(searchPattern) ||
        sanitizeText(user.email).includes(searchPattern),
    )
  }, [users, search])

  const handleClickUser = (user: User) => {
    onClickUser(user)
  }

  const handleClickEnter = () => {
    const userFirst = usersFiltered[0]

    if (userFirst) {
      onClickUser(userFirst)
    }
  }

  return (
    <>
      <Flex gap={8}>
        <Input
          value={search}
          prefix={<Typography.Text type="secondary">To</Typography.Text>}
          suffix={
            <span>{(isLoading || isRefetching) && <LoadingOutlined />}</span>
          }
          onChange={event => setSearch(event.target.value)}
          onPressEnter={handleClickEnter}
        />
      </Flex>

      <Flex vertical flex={1} style={{ overflowY: 'auto' }}>
        {usersFiltered.map(user => (
          <Card
            key={user.id}
            bordered={false}
            size="small"
            style={{ boxShadow: 'none', cursor: 'pointer' }}
            onClick={() => handleClickUser(user)}
          >
            <Flex gap={16} align="center">
              <Avatar src={user.pictureUrl}>
                {Utility.stringToInitials(user.name)}
              </Avatar>

              <Typography.Text ellipsis strong>
                {user.name}
              </Typography.Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  )
}
