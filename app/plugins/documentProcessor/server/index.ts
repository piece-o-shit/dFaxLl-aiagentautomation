import { DocumentProcessorRouter } from './documentProcessor.router'
import { DocumentProcessorService } from './documentProcessor.service'

export namespace DocumentProcessorServer {
  export const service = DocumentProcessorService

  export const trpcRouter = DocumentProcessorRouter
}
