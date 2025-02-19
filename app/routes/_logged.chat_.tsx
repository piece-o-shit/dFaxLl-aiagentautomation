import { PageLayout } from '@/designSystem'
import { ChatClient } from '~/plugins/chat/client'

export default function ChatPage() {
  return (
    <PageLayout>
      <ChatClient.Conversation />
    </PageLayout>
  )
}
