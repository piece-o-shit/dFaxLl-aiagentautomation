import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { AiProviderConfiguration } from '@/plugins/ai/server/providers/ai.provider'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography

export default function SettingsPage() {
  const { user } = useUserContext()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Fetch user settings
  const { data: settings, refetch: refetchSettings } =
    Api.setting.findMany.useQuery({
      where: { userId: user?.id },
    })

  // Fetch user tools (API keys)
  const { data: tools, refetch: refetchTools } = Api.tool.findMany.useQuery({
    where: { userId: user?.id },
  })

  // Mutations
  const { mutateAsync: updateSetting } = Api.setting.update.useMutation()
  const { mutateAsync: createSetting } = Api.setting.create.useMutation()
  const { mutateAsync: updateTool } = Api.tool.update.useMutation()
  const { mutateAsync: createTool } = Api.tool.create.useMutation()

  const handleSaveSettings = async (values: any) => {
    try {
      setLoading(true)

      // Handle notification preferences
      const notificationSettings = {
        emailNotifications: values.emailNotifications,
        pushNotifications: values.pushNotifications,
        notificationPriority: values.notificationPriority,
      }

      // Handle agent defaults
      const agentSettings = {
        defaultLanguage: values.defaultLanguage,
        defaultModel: values.defaultModel,
      }

      // Save settings
      for (const [key, value] of Object.entries({
        ...notificationSettings,
        ...agentSettings,
      })) {
        const existingSetting = settings?.find(s => s.name === key)

        if (existingSetting) {
          await updateSetting({
            where: { id: existingSetting.id },
            data: { value: String(value) },
          })
        } else {
          await createSetting({
            data: {
              name: key,
              value: String(value),
              userId: user?.id,
              category: key.includes('notification')
                ? 'notifications'
                : 'agent',
            },
          })
        }
      }

      // Handle API keys and provider
      if (values.openaiKey) {
        const existingOpenAI = tools?.find(t => t.type === 'openai')
        if (existingOpenAI) {
          await updateTool({
            where: { id: existingOpenAI.id },
            data: { apiKey: values.openaiKey },
          })
        } else {
          await createTool({
            data: {
              name: 'OpenAI',
              type: 'openai',
              apiKey: values.openaiKey,
              userId: user?.id,
            },
          })
        }
      }

      // Save AI provider preference
      const existingProvider = tools?.find(t => t.type === 'aiProvider')
      if (existingProvider) {
        await updateTool({
          where: { id: existingProvider.id },
          data: { configuration: { provider: values.aiProvider } },
        })
      } else {
        await createTool({
          data: {
            name: 'AI Provider',
            type: 'aiProvider',
            configuration: { provider: values.aiProvider },
            userId: user?.id,
          },
        })
      }

      await Promise.all([refetchSettings(), refetchTools()])
      message.success('Settings saved successfully')
    } catch (error) {
      message.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  // Initialize form with existing settings
  const initialValues = {
    emailNotifications:
      settings?.find(s => s.name === 'emailNotifications')?.value === 'true',
    pushNotifications:
      settings?.find(s => s.name === 'pushNotifications')?.value === 'true',
    notificationPriority:
      settings?.find(s => s.name === 'notificationPriority')?.value || 'medium',
    defaultLanguage:
      settings?.find(s => s.name === 'defaultLanguage')?.value || 'en',
    defaultModel:
      settings?.find(s => s.name === 'defaultModel')?.value || 'gpt-3.5-turbo',
    openaiKey: tools?.find(t => t.type === 'openai')?.apiKey || '',
    aiProvider:
      (tools?.find(t => t.type === 'aiProvider')?.configuration as unknown as AiProviderConfiguration)?.provider ||
      'openai',
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-cog" style={{ marginRight: 8 }}></i>
          Settings
        </Title>
        <Text type="secondary">
          Manage your account preferences, API keys, and notification settings
        </Text>

        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSaveSettings}
          style={{ marginTop: 24 }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <>
                    <i className="las la-bell"></i> Notification Preferences
                  </>
                }
              >
                <Form.Item name="emailNotifications" valuePropName="checked">
                  <Switch
                    checkedChildren="Email notifications enabled"
                    unCheckedChildren="Email notifications disabled"
                  />
                </Form.Item>

                <Form.Item name="pushNotifications" valuePropName="checked">
                  <Switch
                    checkedChildren="Push notifications enabled"
                    unCheckedChildren="Push notifications disabled"
                  />
                </Form.Item>

                <Form.Item
                  name="notificationPriority"
                  label="Notification Priority"
                >
                  <Select>
                    <Select.Option value="low">Low</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="high">High</Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={
                  <>
                    <i className="las la-key"></i> API Keys
                  </>
                }
              >
                <Form.Item
                  name="openaiKey"
                  label="OpenAI API Key"
                  extra="Your API key will be encrypted before storage"
                >
                  <Input.Password placeholder="sk-..." />
                </Form.Item>

                <Form.Item name="aiProvider" label="AI Provider">
                  <Select defaultValue="openai">
                    <Select.Option value="openai">OpenAI</Select.Option>
                    <Select.Option value="gemini">Gemini</Select.Option>
                    <Select.Option value="anthropic">Anthropic</Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            <Col xs={24} lg={24}>
              <Card
                title={
                  <>
                    <i className="las la-robot"></i> Agent Defaults
                  </>
                }
              >
                <Row gutter={24}>
                  <Col xs={24} lg={12}>
                    <Form.Item name="defaultLanguage" label="Default Language">
                      <Select>
                        <Select.Option value="en">English</Select.Option>
                        <Select.Option value="es">Spanish</Select.Option>
                        <Select.Option value="fr">French</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item name="defaultModel" label="Default AI Model">
                      <Select>
                        <Select.Option value="gpt-3.5-turbo">
                          GPT-3.5 Turbo
                        </Select.Option>
                        <Select.Option value="gpt-4">GPT-4</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<i className="las la-save"></i>}
            >
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
