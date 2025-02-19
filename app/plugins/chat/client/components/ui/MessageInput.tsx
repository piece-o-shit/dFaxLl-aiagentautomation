import { ArrowUpOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message } from 'antd'
import React, { useState } from 'react'
import { Utility } from '~/core/helpers/utility'

type Props = { isDisabled?: boolean; onSend(message: string): Promise<void> }

export const MessageInput: React.FC<Props> = ({
  isDisabled = false,
  onSend,
}) => {
  const [content, setContent] = useState('')

  const handleSend = async () => {
    try {
      await onSend(content)

      setContent('')
    } catch (error) {
      message.error(`Could not send message: ${error.message}`)
    }
  }

  const handleEnter: React.KeyboardEventHandler<
    HTMLTextAreaElement
  > = event => {
    if (event.nativeEvent?.shiftKey !== true) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <Flex align="end" justify="center" className="p-4 px-10 w-full" gap={10}>
      <Input.TextArea
        className="scrollbar--hidden px-5"
        size="large"
        style={{ borderRadius: '24px' }}
        placeholder="Type a message"
        value={content}
        autoSize={{ minRows: 1, maxRows: 6 }}
        onChange={event => setContent(event.target.value)}
        onPressEnter={handleEnter}
        disabled={isDisabled}
      />
      <Button
        shape="circle"
        size="large"
        icon={<ArrowUpOutlined />}
        onClick={handleSend}
        type="primary"
        disabled={isDisabled || Utility.isNull(content)}
      ></Button>
    </Flex>
  )
}
