# Document Processor Plugin

The Document Processor plugin makes it easy to parse PDFs, DOCx, Excel or CSV file and generate PDF from HTML.

This plugin exposes a set of tRPC routes that allow you to interact with these functionalities from the frontend.

## Environment variables

To enable generation of PDF from HTML, enable:

```.env
SERVER_DOCRAPTOR_API_KEY=
```

## Client

Use the `Api` object for frontend functionalities.

### Parse a PDF, Docx or Excel/CSV document

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: parsePdf } =
  Api.documentProcessor.parseDocument.useMutation()

const handleParsePdf = async () => {
  const { content } = await parsePdf({
    url: `https://example.com/example.pdf`,
  })

  console.log(content)
}
```

### Generate a PDF from HTML

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: generatePdf } =
  Api.documentProcessor.htmlToPdf.useMutation()

const handleGeneratePdf = async () => {
  const { url } = await generatePdf({
    html: `<html><body>TEST!</body></html>`,
  })

  console.log(url)
}
```
