import { useNavigate } from '@remix-run/react'
import { Flex, Typography } from 'antd'
import React, { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({
  height = 50,
  isLabel = false,
  style,
  ...props
}) => {
  const router = useNavigate()

  const goTo = (url: string) => {
    router(url)
  }

  return (
    <Flex align="center" gap={10} onClick={() => goTo('/home')}>
      <img
        {...props}
        alt="Logo"
        height={height}
        onError={event => {
          const target = event.target as HTMLImageElement
          target.onerror = null
          target.src = 'https://imgur.com/a/d6UwPfs'
        }}
      />
      {isLabel && (
        <Typography.Title level={4} style={{ margin: '0px' }}>
          AI Agent Automation
        </Typography.Title>
      )}
    </Flex>
  )
}
