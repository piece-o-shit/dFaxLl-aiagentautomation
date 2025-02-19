import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Button, Card, Typography, message } from 'antd'
import { useState } from 'react'

export default function CrawlTestPage() {
  const [urlResult, setUrlResult] = useState('')
  const [jsonResult, setJsonResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync: scrapeUrl } = Api.crawl.scrapeUrl.useMutation()
  const { mutateAsync: scrapeUrlToJson } =
    Api.crawl.scrapeUrlToJson.useMutation()

  const handleTestUrlScraping = async () => {
    try {
      setIsLoading(true)
      const { content } = await scrapeUrl({
        url: 'https://google.fr',
      })
      setUrlResult(content)
    } catch (error: any) {
      message.error(error?.message || 'Failed to scrape URL')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestJsonScraping = async () => {
    try {
      setIsLoading(true)
      const jsonSchema = {
        type: 'object',
        properties: {
          company_mission: { type: 'string' },
          supports_sso: { type: 'boolean' },
          is_open_source: { type: 'boolean' },
          is_in_yc: { type: 'boolean' },
        },
        required: [
          'company_mission',
          'supports_sso',
          'is_open_source',
          'is_in_yc',
        ],
      }

      const result = await scrapeUrlToJson({
        url: 'https://google.fr',
        jsonSchema,
      })
      setJsonResult(result)
    } catch (error: any) {
      message.error(error?.message || 'Failed to scrape URL to JSON')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <Typography.Title level={2}>Crawl Test Page</Typography.Title>

        <div style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            onClick={handleTestUrlScraping}
            loading={isLoading}
            style={{ marginRight: 16 }}
          >
            Test URL Scraping
          </Button>

          <Button
            type="primary"
            onClick={handleTestJsonScraping}
            loading={isLoading}
          >
            Test JSON Scraping
          </Button>
        </div>

        {urlResult && (
          <Card title="URL Scraping Result" style={{ marginBottom: 24 }}>
            <pre>{urlResult}</pre>
          </Card>
        )}

        {jsonResult && (
          <Card title="JSON Scraping Result">
            <pre>{JSON.stringify(jsonResult, null, 2)}</pre>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
