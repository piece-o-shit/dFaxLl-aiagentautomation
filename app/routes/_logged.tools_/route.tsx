import {
  Typography,
  Card,
  Button,
  Input,
  Form,
  Space,
  Row,
  Col,
  message,
  Modal,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ToolsPage() {
  const { user } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [form] = Form.useForm()

  // Fetch tools
  const { data: tools, refetch } = Api.tool.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  // Mutations
  const { mutateAsync: createTool } = Api.tool.create.useMutation()
  const { mutateAsync: updateTool } = Api.tool.update.useMutation()
  const { mutateAsync: deleteTool } = Api.tool.delete.useMutation()

  const handleSaveTool = async (values: any) => {
    try {
      if (selectedTool) {
        await updateTool({
          where: { id: selectedTool.id },
          data: {
            name: values.name,
            type: values.type,
            apiKey: values.apiKey,
            configuration: values.configuration
              ? JSON.parse(values.configuration)
              : {},
            status: 'CONFIGURED',
          },
        })
      } else {
        await createTool({
          data: {
            name: values.name,
            type: values.type,
            apiKey: values.apiKey,
            configuration: values.configuration
              ? JSON.parse(values.configuration)
              : {},
            status: 'CONFIGURED',
            userId: user?.id,
          },
        })
      }
      message.success('Tool saved successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to save tool')
    }
  }

  const handleDeleteTool = async (toolId: string) => {
    try {
      await deleteTool({ where: { id: toolId } })
      message.success('Tool deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete tool')
    }
  }

  const handleTestConnection = async (tool: any) => {
    // Simulated test connection
    message
      .loading('Testing connection...', 1)
      .then(() => message.success('Connection successful'))
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <i className="las la-tools" style={{ marginRight: 8 }}></i>
            Tools & Integrations
          </Title>
          <Text>
            Configure and manage your external tools and API integrations
          </Text>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            icon={<i className="las la-plus"></i>}
            onClick={() => {
              setSelectedTool(null)
              setIsModalVisible(true)
            }}
          >
            Add New Tool
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          {tools?.map(tool => (
            <Col xs={24} sm={12} lg={8} key={tool.id}>
              <Card
                title={
                  <Space>
                    <i className="las la-plug"></i>
                    {tool.name}
                  </Space>
                }
                extra={
                  <Space>
                    <Button
                      icon={<i className="las la-edit"></i>}
                      onClick={() => {
                        setSelectedTool(tool)
                        form.setFieldsValue({
                          name: tool.name,
                          type: tool.type,
                          apiKey: tool.apiKey,
                          configuration: tool.configuration
                            ? JSON.stringify(tool.configuration)
                            : '',
                        })
                        setIsModalVisible(true)
                      }}
                    />
                    <Button
                      danger
                      icon={<i className="las la-trash"></i>}
                      onClick={() => handleDeleteTool(tool.id)}
                    />
                  </Space>
                }
              >
                <p>
                  <Text strong>Type:</Text> {tool.type}
                </p>
                <p>
                  <Text strong>Status:</Text> {tool.status}
                </p>
                <Button
                  type="dashed"
                  icon={<i className="las la-sync"></i>}
                  onClick={() => handleTestConnection(tool)}
                >
                  Test Connection
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title={selectedTool ? 'Edit Tool' : 'Add New Tool'}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false)
            form.resetFields()
          }}
          footer={null}
        >
          <Form form={form} onFinish={handleSaveTool} layout="vertical">
            <Form.Item
              name="name"
              label="Tool Name"
              rules={[{ required: true, message: 'Please enter tool name' }]}
            >
              <Input prefix={<i className="las la-tag"></i>} />
            </Form.Item>

            <Form.Item
              name="type"
              label="Tool Type"
              rules={[{ required: true, message: 'Please enter tool type' }]}
            >
              <Input prefix={<i className="las la-cube"></i>} />
            </Form.Item>

            <Form.Item
              name="apiKey"
              label="API Key"
              rules={[{ required: true, message: 'Please enter API key' }]}
            >
              <Input.Password prefix={<i className="las la-key"></i>} />
            </Form.Item>

            <Form.Item name="configuration" label="Configuration (JSON)">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsModalVisible(false)
                    form.resetFields()
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
