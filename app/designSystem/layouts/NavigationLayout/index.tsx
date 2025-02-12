import { Link, useLocation, useNavigate, useParams } from '@remix-run/react'
import { Flex } from 'antd'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useNavigate()
  const pathname = useLocation().pathname
  const params: Record<string, string> = useParams()

  const goTo = (url: string) => {
    router(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/agents',
      label: 'Agents',
      position: 'topbar',

      onClick: () => goTo('/agents'),
    },

    {
      key: '/workflows',
      label: 'Workflows',
      position: 'topbar',

      onClick: () => goTo('/workflows'),
    },

    {
      key: '/workflows/builder',
      label: 'Workflow Builder',
      position: 'topbar',

      onClick: () => goTo('/workflows/builder'),
    },

    {
      key: '/tools',
      label: 'Tools',
      position: 'topbar',

      onClick: () => goTo('/tools'),
    },

    {
      key: '/settings',
      label: 'Settings',
      position: 'topbar',

      onClick: () => goTo('/settings'),
    },

    {
      key: '/agents/ai-agent-builder',
      label: 'AI Agent Builder',
      position: 'topbar',

      onClick: () => goTo('/agents/ai-agent-builder'),
    },

    {
      key: '/documentation',
      label: 'Documentation',
      position: 'topbar',

      onClick: () => goTo('/documentation'),
    },

    {
      key: '/pricing',
      label: 'Pricing',

      position: 'topbar',

      onClick: () => goTo('/pricing'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
