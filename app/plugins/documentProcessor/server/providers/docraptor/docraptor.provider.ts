import axios from 'axios'
import { UploadFileType } from '~/plugins/upload/server/upload.type'
export class DocRaptorProvider {
  private apiKey: string

  constructor() {
    this.initialize()
  }

  private initialize(): void {
    try {
      const apiKey = process.env.SERVER_DOCRAPTOR_API_KEY

      if (!apiKey) {
        console.log(
          `Set SERVER_DOCRAPTOR_API_KEY in your .env to activate the html to pdf feature`,
        )
        return
      }

      this.apiKey = apiKey

      console.log(`Doc Raptor is active`)
    } catch (error) {
      console.error(`Doc Raptor failed to start`)
    }
  }

  isActive(): boolean {
    if (this.apiKey) {
      return true
    } else {
      return false
    }
  }

  async htmlToPdf(html: string, fileName?: string): Promise<UploadFileType> {
    const config = {
      user_credentials: this.apiKey,

      doc: {
        test: process.env.NODE_ENV != 'production', // test documents are free but watermarked
        document_type: 'pdf',
        document_content: html,
      },
    }

    const response = await axios.post(
      'https://api.docraptor.com/docs',
      config,
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const buffer = Buffer.from(response.data)

    const fileToUpload: UploadFileType = {
      name: fileName ? fileName : this.generateRandomString() + '.pdf',
      buffer: buffer,
      mimetype: 'application/pdf',
    }

    return fileToUpload
  }

  private generateRandomString(): string {
    const random = (Math.random() + 1).toString(36).substring(7)

    return new Date().getTime() + '-' + random
  }
}
