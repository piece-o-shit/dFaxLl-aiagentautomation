# Socket Plugin

The Socket plugin integrates with Socket.io to provide real-time communication functionalities

## Client

### Provider

Wrap your application inside the `SocketClient.Provider` to allow your components to use the useSocket hook:

```tsx
<SocketClient.Provider>{children}</SocketClient.Provider>
```

### Listen for messages

Use the `SocketClient.useEvent` hook in the frontend to receive and/or emit events:

```tsx
const { emit } = SocketClient.useEvent('your-event-key', payload => {
  // Handle your received message here
})

emit({ payload: { hello: 'world' }, userIds: ['user-id-of-someone'] }) //userIds optional
```

## Server

Start the socket server at the root of your server:

```tsx
SocketServer.start(httpServer)
```
