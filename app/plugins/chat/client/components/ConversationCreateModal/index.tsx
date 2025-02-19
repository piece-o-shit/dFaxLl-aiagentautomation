import { MessageOutlined } from '@ant-design/icons'
import { ChatConversation, User } from '@prisma/client'
import { Button, Flex, Modal, Typography } from 'antd'
import React, { useState } from 'react'
import { useUserContext } from '~/core/context'
import { Api } from '~/core/trpc'
import { ChatContactList } from '../ContactList'
import { ConversationCreate } from '../ConversationCreate'

const Header: React.FC<{ onCancel(): void }> = ({ onCancel }) => {
  return (
    <Flex align="center" className="mb-4">
      <Flex flex={1}>
        <Button type="text" onClick={onCancel}>
          Cancel
        </Button>
      </Flex>

      <Flex>
        <Typography.Text strong>New Message</Typography.Text>
      </Flex>

      <Flex flex={1}>
        <span />
      </Flex>
    </Flex>
  )
}

type Props = {
  onSelect(converation: ChatConversation): void
}

export const ConversationCreateModal: React.FC<Props> = ({ onSelect }) => {
  const { user: userCurrent } = useUserContext()

  const api = Api.useUtils()

  const [isOpen, setOpen] = useState(false)
  const [user, setUser] = useState<User>()

  const handleClickCreate = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    setUser(null)
    setOpen(false)
  }

  const handleClickUser = async (userTo: User) => {
    const conversation = await api.chatConversation.findFirst.fetch({
      where: {
        participants: {
          every: { userId: { in: [userTo.id, userCurrent.id] } },
        },
      },
    })

    if (conversation) {
      onSelect(conversation)
      setOpen(false)
    } else {
      setUser(userTo)
    }
  }

  return (
    <>
      <Button
        icon={<MessageOutlined />}
        type="primary"
        onClick={handleClickCreate}
      >
        New
      </Button>

      {isOpen && (
        <Modal
          open={isOpen}
          footer={false}
          closeIcon={false}
          onCancel={handleClickClose}
        >
          <Header onCancel={handleClickClose} />

          {!user && (
            <Flex vertical style={{ maxHeight: '60vh' }}>
              <Flex vertical flex={1} style={{ overflowY: 'auto' }}>
                <ChatContactList onClickUser={handleClickUser} />
              </Flex>
            </Flex>
          )}

          {user && (
            <ConversationCreate
              users={[userCurrent, user]}
              onCreated={onSelect}
            />
          )}
        </Modal>
      )}
    </>
  )
}
