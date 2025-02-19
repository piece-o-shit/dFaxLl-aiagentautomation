# Support

A chat interface similar to messenger for your users with real-time interactions using WebSockets.

## Installation

1. Add `ChatParticipant`, `ChatConversation` and `ChatMessage` model to your schema:

   ```zmodel
   ...
    model ChatParticipant {
        id                String           @id @default(uuid())
        lastReadMessageId String?
        userId            String
        user              User             @relation(fields: [userId], references: [id])
        conversationId    String
        conversation      ChatConversation @relation(fields: [conversationId], references: [id])
        messages          ChatMessage[]

        createdAt         DateTime         @default(now())
        updatedAt         DateTime         @updatedAt @default(now())
        @@allow('all', auth().id == userId)
        @@allow('all', auth().globalRole == 'ADMIN')
        @@allow('read', conversation.participants?[userId == auth().id])
        @@allow('create', true)
    }

    model ChatConversation {
        id           String            @id @default(uuid())

        participants ChatParticipant[]
        messages     ChatMessage[]

        createdAt    DateTime          @default(now())
        updatedAt    DateTime          @updatedAt @default(now())
        @@allow("all", auth().id == this.id)
        @@allow('all', auth().globalRole == 'ADMIN')
        @@allow('create', true)
        @@allow('read', participants?[userId == auth().id])
    }


    model ChatMessage {
        id             String           @id @default(uuid())
        content        String?

        conversationId String
        conversation   ChatConversation @relation(fields: [conversationId], references: [id])

        participantId  String
        participant    ChatParticipant  @relation(fields: [participantId], references: [id])

        createdAt      DateTime         @default(now())
        updatedAt      DateTime         @updatedAt @default(now())
        @@allow("all", auth().id == this.id)
        @@allow('all', auth().globalRole == 'ADMIN')
        @@allow('all', participant.userId == auth().id)
        @@allow('create', true)
        @@allow('read', conversation.participants?[userId == auth().id])
    }
   ```

1. Add the `chatParticipants` property to your `User` model:

   ```zmodel
   model User {
       ...
       chatParticipants  ChatParticipant[]
       ...
   }
   ```

## Usage

1. Import the `ChatClient.Conversation` into a route for example `/app/routes/_logged.chat_.tsx`.

```tsx
import { ChatClient } from '~/plugins/chat/client'

export default function ChatPage() {
  return (
    <PageLayout>
      <ChatClient.Conversation />
    </PageLayout>
  )
}
```

## ChatClient.Conversation Props

| prop        | type     | default | description                                |
| ----------- | -------- | ------- | ------------------------------------------ |
| `maxHeight` | `string` | `75vh`  | The max height of the conversation window. |

## Future Developments

1. Adding socket for live chat.
1. Adding methods to override the UI.
1. Adding methods to override the business logic.
