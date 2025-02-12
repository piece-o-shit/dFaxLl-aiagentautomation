import {
  Typography,
  Card,
  Button,
  Form,
  Input,
  Select,
  Space,
  Spin,
  message,
} from 'antd'
import { useState } from 'react'
import type { Agent } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AgentDetailsPage() {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)

  // Fetch agent details
  const {
    data: agent,
    isLoading,
    refetch,
  } = Api.agent.findFirst.useQuery({
    where: { id: agentId },
    include: { user: true },
  })

  // Mutations
  const updateAgent = Api.agent.update.useMutation()

  // Handle agent status changes
  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateAgent.mutateAsync({
        where: { id: agentId },
        data: { status: newStatus },
      })
      message.success(`Agent ${newStatus.toLowerCase()} successfully`)
      refetch()
    } catch (error) {
      message.error('Failed to update agent status')
    }
  }

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      await updateAgent.mutateAsync({
        where: { id: agentId },
        data: {
          name: values.name,
          description: values.description,
          configuration: values.configuration
            ? JSON.parse(values.configuration)
            : agent?.configuration,
          type: values.type,
        },
      })
      message.success('Agent updated successfully')
      setIsEditing(false)
      refetch()
    } catch (error) {
      message.error('Failed to update agent')
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={2}>
              <i className="las la-robot" style={{ marginRight: '8px' }}></i>
              Agent Details
            </Title>
            <Text type="secondary">
              View and manage agent configuration and status
            </Text>
          </div>
          <Space>
            <Button
              onClick={() => navigate('/agents')}
              icon={<i className="las la-arrow-left"></i>}
            >
              Back to Agents
            </Button>
          </Space>
        </div>

        <Card>
          {!isEditing ? (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <Title level={4}>{agent?.name}</Title>
                <Text>{agent?.description}</Text>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <Text strong>Status: </Text>
                <Text>{agent?.status}</Text>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <Text strong>Type: </Text>
                <Text>{agent?.type}</Text>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <Text strong>Configuration: </Text>
                <pre>{JSON.stringify(agent?.configuration, null, 2)}</pre>
              </div>

              <Space>
                <Button
                  type="primary"
                  onClick={() => setIsEditing(true)}
                  icon={<i className="las la-edit"></i>}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleStatusChange('RUNNING')}
                  icon={<i className="las la-play"></i>}
                  disabled={agent?.status === 'RUNNING'}
                >
                  Start
                </Button>
                <Button
                  onClick={() => handleStatusChange('PAUSED')}
                  icon={<i className="las la-pause"></i>}
                  disabled={agent?.status === 'PAUSED'}
                >
                  Pause
                </Button>
                <Button
                  danger
                  onClick={() => handleStatusChange('STOPPED')}
                  icon={<i className="las la-stop"></i>}
                  disabled={agent?.status === 'STOPPED'}
                >
                  Stop
                </Button>
              </Space>
            </div>
          ) : (
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: agent?.name,
                description: agent?.description,
                type: agent?.type,
                configuration: JSON.stringify(agent?.configuration, null, 2),
              }}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="AI">AI</Select.Option>
                  <Select.Option value="RULE_BASED">Rule Based</Select.Option>
                  <Select.Option value="HYBRID">Hybrid</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="configuration" label="Configuration">
                <Input.TextArea rows={10} />
              </Form.Item>

              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </Space>
            </Form>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}
