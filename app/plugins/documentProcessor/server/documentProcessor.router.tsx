import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { UploadService } from '~/plugins/upload/server/upload.service'
import { DocumentProcessorService } from './documentProcessor.service'
/**
 * @provider DocumentProcessorApi
 * @description A document processor API to parse document and generate pdfs from html
 * @function {({ url: string }) => Promise<{ content: string}>} parseDocument - Scrape the content of a Document (pdf, docx) and return the content
 * @function {({ html: string }) => Promise<{ url: string }>} htmlToPdf - Convert an HTML string to a PDF file and return the URL of the PDF file
 * @usage `const {mutateAsync: parseDocument} = Api.documentProcessor.parseDocument.useMutation();  const {content} = parseDocument({ url: url }) ; const { mutateAsync: generatePdf } = Api.documentProcessor.htmlToPdf.useMutation() const handleGeneratePdf = async () => { const { url } = await generatePdf({html: `<html><body>TEST!</body></html>`, }) } `
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */

export const DocumentProcessorRouter = Trpc.createRouter({
  parseDocument: Trpc.procedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { url } = input

      const content = await DocumentProcessorService.parseFile(url)

      return { content }
    }),
  htmlToPdf: Trpc.procedure
    .input(
      z.object({
        html: z.string(),
        fileName: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { html, fileName } = input

      const file = await DocumentProcessorService.htmlToPdf(html, fileName)

      const urls = await UploadService.uploadPublic(file)

      return urls?.[0]
    }),
})
