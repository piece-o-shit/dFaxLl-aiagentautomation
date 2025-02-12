import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography

export default function AgentsPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Fetch agents with relations
  const { data: agents, isLoading } = Api.agent.findMany.useQuery({
    where: {
      userId: user?.id,
      AND: [
        searchTerm
          ? {
              OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
              ],
            }
          : {},
        typeFilter ? { type: typeFilter } : {},
        statusFilter ? { status: statusFilter } : {},
      ],
    },
  })

  const handleCreateAgent = () => {
    navigate('/agents/ai-agent-builder')
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'default'
      case 'error':
        return 'error'
      default:
        return 'processing'
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <i className="las la-robot" style={{ marginRight: 8 }}></i>
            My Agents
          </Title>
          <Text type="secondary">
            Manage and monitor your AI agents. Create new agents from templates
            to automate specific tasks.
          </Text>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Input
                prefix={<i className="las la-search"></i>}
                placeholder="Search agents..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by type"
                allowClear
                onChange={setTypeFilter}
              >
                <Select.Option value="chat">Chat Agent</Select.Option>
                <Select.Option value="task">Task Agent</Select.Option>
                <Select.Option value="assistant">Assistant</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by status"
                allowClear
                onChange={setStatusFilter}
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
                <Select.Option value="error">Error</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Button type="primary" onClick={handleCreateAgent} block>
                <i className="las la-plus" style={{ marginRight: 8 }}></i>
                New Agent
              </Button>
            </Col>
          </Row>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <i className="las la-spinner la-spin" style={{ fontSize: 24 }}></i>
          </div>
        ) : agents && agents.length > 0 ? (
          <Row gutter={[16, 16]}>
            {agents.map(agent => (
              <Col xs={24} sm={12} lg={8} key={agent.id}>
                <Card
                  hoverable
                  onClick={() => navigate(`/agents/${agent.id}`)}
                  actions={[
                    <Button type="link" key="view">
                      <i className="las la-eye"></i> View Details
                    </Button>,
                  ]}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <i className="las la-robot" style={{ fontSize: 24 }}></i>
                      <div>
                        <Text strong>{agent.name}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {agent.type}
                        </Text>
                      </div>
                    </Space>
                    <Text type="secondary" ellipsis>
                      {agent.description}
                    </Text>
                    <Tag color={getStatusColor(agent.status || '')}>
                      {agent.status}
                    </Tag>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="No agents found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </PageLayout>
  )
}
