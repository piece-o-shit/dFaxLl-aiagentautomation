import { ReactNode } from 'react'

export type NavigationItem = {
  key: string
  label: ReactNode
  position: 'topbar' | 'leftbar' | 'leftbar-bottom'
  isVisible?: boolean
  onClick: () => void
  icon?: ReactNode
}
