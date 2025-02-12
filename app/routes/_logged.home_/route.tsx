import { Typography, Card, Row, Col, Statistic, List, Tag, Space } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { user } = useUserContext()

  // Fetch active agents
  const { data: agents } = Api.agent.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { updatedAt: 'desc' },
  })

  // Fetch recent workflow executions
  const { data: executions } = Api.execution.findMany.useQuery({
    where: { workflow: { userId: user?.id } },
    include: { workflow: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Fetch notifications
  const { data: notifications } = Api.notification.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-home" style={{ marginRight: 8 }}></i>
          Dashboard
        </Title>
        <Text type="secondary">
          Monitor your automation system's performance and activity
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {/* Key Metrics */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-robot"></i> Active Agents
                  </>
                }
                value={agents?.length || 0}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-cog"></i> Recent Executions
                  </>
                }
                value={executions?.length || 0}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-bell"></i> New Notifications
                  </>
                }
                value={notifications?.length || 0}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-comments"></i> Active Chats
                  </>
                }
                value={0}
              />
            </Card>
          </Col>

          {/* Active Agents */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-robot"></i> Active Agents
                </>
              }
            >
              <List
                dataSource={agents}
                renderItem={agent => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<i className="las la-microchip"></i>}
                      title={agent.name}
                      description={agent.description}
                    />
                    <Tag color={agent.status === 'ACTIVE' ? 'green' : 'red'}>
                      {agent.status}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Recent Executions */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-history"></i> Recent Executions
                </>
              }
            >
              <List
                dataSource={executions}
                renderItem={execution => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<i className="las la-cog"></i>}
                      title={execution.workflow?.name}
                      description={dayjs(execution.createdAt).format(
                        'YYYY-MM-DD HH:mm',
                      )}
                    />
                    <Tag
                      color={execution.status === 'SUCCESS' ? 'green' : 'red'}
                    >
                      {execution.status}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Notifications */}
          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-bell"></i> Recent Notifications
                </>
              }
            >
              <List
                dataSource={notifications}
                renderItem={notification => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<i className="las la-info-circle"></i>}
                      title={notification.type}
                      description={notification.message}
                    />
                    <Space>
                      <Text type="secondary">
                        {dayjs(notification.createdAt).format(
                          'YYYY-MM-DD HH:mm',
                        )}
                      </Text>
                      <Tag color={notification.priority === 1 ? 'red' : 'blue'}>
                        Priority: {notification.priority?.toString()}
                      </Tag>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
