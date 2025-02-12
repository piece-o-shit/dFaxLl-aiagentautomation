import axios from 'axios'
import * as cheerio from 'cheerio'
import mammoth from 'mammoth'
import Papaparse from 'papaparse'
import pdf from 'pdf-parse/lib/pdf-parse'

import { FileHelper } from '~/core/helpers/file'
import { Utility } from '~/core/helpers/utility'
import { UploadFileType } from '~/plugins/upload/server/upload.type'
import { DocRaptorProvider } from './providers/docraptor/docraptor.provider'

class Service {
  private docRaptor = new DocRaptorProvider()

  async htmlToPdf(html: string, fileName: string): Promise<UploadFileType> {
    const file = await this.docRaptor.htmlToPdf(html, fileName)

    return file
  }

  async parseFile(url: string): Promise<string> {
    const type = FileHelper.getFileType(url)

    let lines: string[]

    if (type === 'unknown') {
      lines = await this.downloadWebPage(url)
    } else {
      const buffer = await this.downloadFile(url)

      switch (type) {
        case 'pdf':
          lines = await this.parsePDF(buffer)
          break
        case 'csv':
          lines = await this.parseCSV(buffer)
          break
        case 'docx':
          lines = await this.parseDOCX(buffer)
          break
        default:
          throw new Error(
            `File type is not supported. Supported types are PDF, DOCX, CSV and web pages`,
          )
      }
    }

    return lines.join('\n')
  }

  private async downloadFile(url: string): Promise<Buffer> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' })
      return Buffer.from(response.data, 'binary')
    } catch (error) {
      throw new Error(`Could not download file at "${url}": ${error.message}`)
    }
  }

  private async downloadWebPage(url: string): Promise<string[]> {
    try {
      const response = await axios.get(url)
      const $ = cheerio.load(response.data)
      const textContent = $('body').text()
      return textContent
        .split('\n')
        .filter(line => Utility.isDefined(line.trim()))
    } catch (error) {
      throw new Error(`Could not fetch web page: ${error.message}`)
    }
  }

  private async parsePDF(buffer: Buffer): Promise<string[]> {
    try {
      const data = await pdf(buffer)
      return data.text
        .split('\n')
        .filter(line => Utility.isDefined(line.trim()))
    } catch (error) {
      throw new Error(`Could not parse PDF: ${error.message}`)
    }
  }

  private async parseCSV(buffer: Buffer): Promise<string[]> {
    return new Promise((resolve, reject) => {
      Papaparse.parse(buffer.toString(), {
        complete: results => {
          const content = JSON.stringify(results.data)
          const lines = content
            .split('\n')
            .filter(line => Utility.isDefined(line.trim()))
          resolve(lines)
        },
        error: error => {
          reject(new Error(`Could not parse CSV: ${error.message}`))
        },
      })
    })
  }

  private async parseDOCX(buffer: Buffer): Promise<string[]> {
    try {
      const result = await mammoth.extractRawText({ buffer: buffer })
      return result.value
        .split('\n')
        .filter(line => Utility.isDefined(line.trim()))
    } catch (error) {
      throw new Error(`Could not parse DOCX: ${error.message}`)
    }
  }
}

export const DocumentProcessorService = new Service()
