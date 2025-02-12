# Toolbox

You can think of this plugin as your Swiss army knife. It includes a set of Typescript functions that are useful for any kind of application.

You can find functions with logic for manipulating dates, currencies, numbers, strings, objects, the file system etc.

# Integration Guide

The example below shows how you can use the `timeAgo` function of the `DateTool` to display dates in a relative format.

```typescript
import { DateTool } from '~/plugins/toolbox/common'

const date = new Date('2024-04-12')

const dateFormatted = DateTool.timeAgo(date)

// If today's date is 18th November, 2024 the value of dateFormatted will be: "7 months ago".
```

You can import and use the functions exported from each tool in a similar fashion.

# Good to know

- Tools exported from `'~/plugins/toolbox/client'` can only be used in client-side code (frontend).
- Tools exported from `'~/plugins/toolbox/server'` can only be used in server-side code (backend/api/server).
- Tools exported from `'~/plugins/toolbox/common'` can only be used in both client-side and server-side code.
