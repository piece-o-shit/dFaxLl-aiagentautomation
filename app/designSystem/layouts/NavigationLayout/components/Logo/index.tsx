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
        src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/dFaxLl-aiagentautomation-NMrK"
        {...props}
        alt="Logo"
        height={height}
        style={{
          borderRadius: '5px',
          cursor: 'pointer',
          objectFit: 'contain',
          height: `${height}px`,
          ...style,
        }}
        onError={event => {
          const target = event.target as HTMLImageElement
          target.onerror = null
          target.src = 'https://i.imgur.com/2dcDGIE.png'
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
