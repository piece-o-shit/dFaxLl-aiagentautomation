import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Button, Card, Col, Row, Space, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

const serializeWorkflowConfig = (
  nodes: Node[],
  edges: Edge[],
): Record<string, any[]> => {
  const serializedNodes = nodes.map(node => {
    const position = {
      x: Number(node.position.x),
      y: Number(node.position.y),
    }

    const data = Object.entries(node.data || {}).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        if (key === 'label') {
          acc[key] = node.data.label?.props?.title || ''
        } else if (key === 'description') {
          acc[key] = node.data.label?.props?.children?.props?.children || ''
        } else {
          acc[key] = value
        }
      }
      return acc
    }, {} as Record<string, any>)

    return {
      id: node.id,
      type: node.type || 'default',
      position,
      data,
    }
  })

  const serializedEdges = edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }))

  return {
    nodes: serializedNodes,
    edges: serializedEdges,
  }
}
const { Title, Text } = Typography

export default function WorkflowBuilderPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  // States
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [workflowName, setWorkflowName] = useState('')

  // Fetch available agents
  const { data: agents } = Api.agent.findMany.useQuery({
    where: { userId: user?.id },
  })

  // Create workflow mutation
  const { mutateAsync: createWorkflow } = Api.workflow.create.useMutation()

  // Initialize nodes with available agents
  useEffect(() => {
    if (agents) {
      const agentNodes = agents.map((agent, index) => ({
        id: agent.id,
        type: 'default',
        data: {
          label: (
            <Card size="small" title={agent.name}>
              <Text>{agent.description}</Text>
            </Card>
          ),
        },
        position: { x: 250, y: index * 150 },
      }))
      setNodes(agentNodes)
    }
  }, [agents])

  // Handle connections between nodes
  const onConnect = (params: Connection) => {
    setEdges(eds => addEdge(params, eds))
  }

  // Save workflow
  const handleSave = async () => {
    try {
      const serializedConfig = serializeWorkflowConfig(nodes, edges)
      const workflow = await createWorkflow({
        data: {
          name: workflowName || 'New Workflow',
          userId: user?.id,
          status: 'DRAFT',
          configuration: serializedConfig,
        },
      })

      message.success('Workflow saved successfully!')
      navigate('/workflows')
    } catch (error) {
      message.error('Failed to save workflow')
    }
  }

  // Test workflow
  const handleTest = async () => {
    if (edges.length === 0) {
      message.warning('Please connect some agents first')
      return
    }
    message.info('Testing workflow...')
    // Add test logic here
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>
              <i className="las la-project-diagram" /> Workflow Builder
            </Title>
            <Text type="secondary">
              Design your automation workflow by connecting agents and tools
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<i className="las la-play" />} onClick={handleTest}>
                Test Workflow
              </Button>
              <Button
                type="primary"
                icon={<i className="las la-save" />}
                onClick={handleSave}
              >
                Save Workflow
              </Button>
            </Space>
          </Col>
        </Row>

        <Card style={{ height: '70vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </Card>
      </Space>
    </PageLayout>
  )
}
