# Cron Plugin

The Cron plugin allows you to schedule tasks inside your application.
This plugin is a simple wrapper around the NodeCron package ([see documentation](https://www.npmjs.com/package/node-cron))

### Schedule A Job

Call the `registerJob` method to schedule a job:

```tsx
CronServer.service.registerJob('* * * * *', async () => {
  console.log('Hello world from cron job every minute')
})
```
