import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tag,
  TimePicker,
  Tooltip,
  Typography,
} from 'antd'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title, Text } = Typography

type ScheduleFormValues = {
  name: string
  enabled: boolean
  time: dayjs.Dayjs
  days: string[]
}

export default function WorkflowDetailsPage() {
  const { workflowId } = useParams()
  const navigate = useNavigate()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  // Fetch workflow details
  const { data: workflow, isLoading } = Api.workflow.findFirst.useQuery({
    where: { id: workflowId },
    include: { executions: true },
  })

  // Mutations
  const { mutateAsync: updateWorkflow } = Api.workflow.update.useMutation()

  type SettingsFormValues = {
    name: string
    description: string
    configuration?: Prisma.JsonValue
  }

  // Handle workflow settings update
  const handleSettingsUpdate = async (values: SettingsFormValues) => {
    try {
      const configuration = values.configuration as Prisma.JsonValue
      await updateWorkflow({
        where: { id: workflowId },
        data: {
          name: values.name,
          description: values.description,
          configuration,
        },
      })
      setIsSettingsModalOpen(false)
    } catch (error) {
      console.error('Error updating workflow:', error)
    }
  }

  // Handle schedule update
  const handleScheduleUpdate = async (values: ScheduleFormValues) => {
    try {
      const schedule: Prisma.JsonValue = {
        name: values.name,
        enabled: values.enabled,
        time: values.time?.format('HH:mm'),
        days: values.days,
      }
      await updateWorkflow({
        where: { id: workflowId },
        data: { schedule },
      })
      setIsScheduleModalOpen(false)
    } catch (error) {
      console.error('Error updating schedule:', error)
    }
  }

  const executionColumns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'SUCCESS'
              ? 'success'
              : status === 'FAILED'
              ? 'error'
              : 'processing'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Performance',
      dataIndex: 'result',
      key: 'performance',
      render: (result: any) => (
        <Tooltip
          title={`Memory: ${result?.memory || 'N/A'}, CPU: ${
            result?.cpu || 'N/A'
          }`}
        >
          <i className="las la-chart-line" />
        </Tooltip>
      ),
    },
  ]

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
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <i className="las la-project-diagram" /> {workflow?.name}
          </Title>
          <Text type="secondary">{workflow?.description}</Text>
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card
            title={
              <>
                <i className="las la-cog" /> Workflow Controls
              </>
            }
          >
            <Space>
              <Button
                type="primary"
                onClick={() => setIsSettingsModalOpen(true)}
              >
                <i className="las la-edit" /> Modify Settings
              </Button>
              <Button onClick={() => setIsScheduleModalOpen(true)}>
                <i className="las la-clock" /> Schedule Execution
              </Button>
            </Space>
          </Card>

          <Card
            title={
              <>
                <i className="las la-history" /> Execution History
              </>
            }
          >
            <Table
              dataSource={workflow?.executions}
              columns={executionColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Space>

        {/* Settings Modal */}
        <Modal
          title="Workflow Settings"
          open={isSettingsModalOpen}
          onCancel={() => setIsSettingsModalOpen(false)}
          footer={null}
        >
          <Form
            initialValues={workflow}
            onFinish={handleSettingsUpdate}
            layout="vertical"
          >
            <Form.Item name="name" label="Workflow Name">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Schedule Modal */}
        <Modal
          title="Schedule Workflow"
          open={isScheduleModalOpen}
          onCancel={() => setIsScheduleModalOpen(false)}
          footer={null}
        >
          <Form<ScheduleFormValues>
            initialValues={{
              name: workflow?.name || '',
              enabled: (workflow?.schedule as any)?.enabled || false,
              time: (workflow?.schedule as any)?.time
                ? dayjs((workflow.schedule as any).time, 'HH:mm')
                : null,
              days: (workflow?.schedule as any)?.days || [],
            }}
            onFinish={handleScheduleUpdate}
            layout="vertical"
          >
            <Form.Item
              name="enabled"
              valuePropName="checked"
              label="Enable Schedule"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="time" label="Execution Time">
              <TimePicker format="HH:mm" />
            </Form.Item>
            <Form.Item name="days" label="Days">
              <Select
                mode="multiple"
                options={[
                  { label: 'Monday', value: 'MON' },
                  { label: 'Tuesday', value: 'TUE' },
                  { label: 'Wednesday', value: 'WED' },
                  { label: 'Thursday', value: 'THU' },
                  { label: 'Friday', value: 'FRI' },
                  { label: 'Saturday', value: 'SAT' },
                  { label: 'Sunday', value: 'SUN' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Schedule
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
