import { Typography, Card, Row, Col } from 'antd'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentationPage() {
  const { data: docs } = Api.documentation.findMany.useQuery({
    where: {
      category: 'agent-workflow',
    },
  })

  const sections = [
    {
      title: 'Building an Agent',
      icon: 'las la-robot',
      description:
        'Learn how to create and configure agents for your automation needs.',
      content: docs?.find(d => d.section === 'build-agent')?.content,
    },
    {
      title: 'Running an Agent',
      icon: 'las la-play-circle',
      description:
        'Understand how to execute and monitor your agents effectively.',
      content: docs?.find(d => d.section === 'run-agent')?.content,
    },
    {
      title: 'Agent Orchestration',
      icon: 'las la-project-diagram',
      description:
        'Master the art of coordinating multiple agents for complex tasks.',
      content: docs?.find(d => d.section === 'agent-orchestration')?.content,
    },
    {
      title: 'Building Workflows',
      icon: 'las la-sitemap',
      description:
        'Create powerful workflows to automate your business processes.',
      content: docs?.find(d => d.section === 'build-workflow')?.content,
    },
    {
      title: 'Scheduling Workflows',
      icon: 'las la-clock',
      description:
        'Learn how to schedule and manage automated workflow executions.',
      content: docs?.find(d => d.section === 'schedule-workflow')?.content,
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1}>
            <i className="las la-book" style={{ marginRight: 8 }}></i>
            Documentation
          </Title>
          <Paragraph>
            Learn how to build and manage agents, workflows, and orchestrations
            in our platform.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {sections.map((section, index) => (
            <Col xs={24} sm={24} md={12} lg={8} key={index}>
              <Card
                hoverable
                style={{ height: '100%' }}
                title={
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <i className={section.icon} style={{ fontSize: 24 }}></i>
                    <Text strong>{section.title}</Text>
                  </div>
                }
              >
                <Paragraph>{section.description}</Paragraph>
                <Paragraph>
                  {section.content || 'Loading documentation content...'}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
