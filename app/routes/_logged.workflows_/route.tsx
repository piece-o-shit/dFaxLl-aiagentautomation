import {
  Typography,
  Table,
  Button,
  Card,
  Space,
  Modal,
  Form,
  Input,
  TimePicker,
  Select,
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

export default function WorkflowsPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)
  const [form] = Form.useForm()

  // Fetch workflows
  const { data: workflows, refetch } = Api.workflow.findMany.useQuery({
    where: { userId: user?.id },
    include: { executions: true },
  })

  // Mutations
  const { mutateAsync: createWorkflow } = Api.workflow.create.useMutation()
  const { mutateAsync: updateWorkflow } = Api.workflow.update.useMutation()
  const { mutateAsync: deleteWorkflow } = Api.workflow.delete.useMutation()

  const handleDuplicate = async (workflow: any) => {
    const { id, createdAt, updatedAt, ...workflowData } = workflow
    await createWorkflow({
      data: {
        ...workflowData,
        name: `${workflowData.name} (Copy)`,
        userId: user?.id,
      },
    })
    refetch()
  }

  const handleSchedule = async (values: any) => {
    if (!selectedWorkflow) return

    const schedule = {
      enabled: true,
      time: values.time.format('HH:mm'),
      days: values.days,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }

    await updateWorkflow({
      where: { id: selectedWorkflow.id },
      data: { schedule },
    })

    setScheduleModalVisible(false)
    refetch()
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a onClick={() => navigate(`/workflows/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text type={status === 'ACTIVE' ? 'success' : 'secondary'}>
          {status}
        </Text>
      ),
    },
    {
      title: 'Schedule',
      key: 'schedule',
      render: (record: any) => (
        <Space>
          {record.schedule?.enabled ? (
            <Text>
              {record.schedule.time} ({record.schedule.days.join(', ')})
            </Text>
          ) : (
            <Text type="secondary">Not scheduled</Text>
          )}
          <Button
            type="link"
            onClick={() => {
              setSelectedWorkflow(record)
              setScheduleModalVisible(true)
            }}
          >
            <i className="las la-clock"></i>
          </Button>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button type="text" onClick={() => handleDuplicate(record)}>
            <i className="las la-copy"></i>
          </Button>
          <Button
            type="text"
            onClick={() => navigate(`/workflows/${record.id}`)}
          >
            <i className="las la-edit"></i>
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={2}>Workflows</Title>
            <Text>Manage and automate your business processes</Text>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/workflows/builder')}
          >
            <i className="las la-plus"></i> Create Workflow
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={workflows}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title="Schedule Workflow"
          open={scheduleModalVisible}
          onCancel={() => setScheduleModalVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} onFinish={handleSchedule} layout="vertical">
            <Form.Item name="time" label="Time" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" />
            </Form.Item>
            <Form.Item name="days" label="Days" rules={[{ required: true }]}>
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
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
