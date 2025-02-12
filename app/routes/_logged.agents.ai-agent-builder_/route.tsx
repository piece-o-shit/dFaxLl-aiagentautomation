import { Typography, Input, Button, Card, message, Space } from 'antd'
import { useState } from 'react'
const { Title, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AIAgentBuilderPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()

  const [description, setDescription] = useState('')
  const [generatedAgent, setGeneratedAgent] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editInstruction, setEditInstruction] = useState('')

  const generateAgent = Api.ai.generateText.useMutation()
  const createAgent = Api.agent.create.useMutation()

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)
      const prompt = `Create an AI agent based on this description: ${description}. 
        Return a JSON object with these properties: 
        {
          "name": "agent name",
          "description": "detailed description",
          "type": "agent type",
          "configuration": {},
          "template": {}
        }`

      const response = await generateAgent.mutateAsync({
        prompt,
        provider: 'openai',
      })

      const parsedAgent = JSON.parse(response.answer)
      setGeneratedAgent(parsedAgent)
    } catch (error) {
      message.error('Failed to generate agent. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEdit = async () => {
    try {
      setIsEditing(true)
      const prompt = `Edit this agent based on these instructions: ${editInstruction}
        Current agent: ${JSON.stringify(generatedAgent)}
        Return the modified JSON object with the same structure`

      const response = await generateAgent.mutateAsync({
        prompt,
        provider: 'openai',
      })

      const parsedAgent = JSON.parse(response.answer)
      setGeneratedAgent(parsedAgent)
      setEditInstruction('')
    } catch (error) {
      message.error('Failed to edit agent. Please try again.')
    } finally {
      setIsEditing(false)
    }
  }

  const handleSave = async () => {
    try {
      if (!generatedAgent) return

      const savedAgent = await createAgent.mutateAsync({
        data: {
          ...generatedAgent,
          userId: user?.id,
          status: 'ACTIVE',
        },
      })

      message.success('Agent saved successfully!')
      navigate('/agents')
    } catch (error) {
      message.error('Failed to save agent. Please try again.')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-robot" style={{ marginRight: 8 }} />
          AI Agent Builder
        </Title>
        <Paragraph>
          Describe the agent you want to create, and our AI will help you build
          it.
        </Paragraph>

        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>Describe Your Agent</Title>
              <TextArea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the agent you want to create..."
              />
              <Button
                type="primary"
                onClick={handleGenerate}
                loading={isGenerating}
                style={{ marginTop: 16 }}
              >
                <i className="las la-magic" style={{ marginRight: 8 }} />
                Generate Agent
              </Button>
            </div>

            {generatedAgent && (
              <>
                <div>
                  <Title level={4}>Generated Agent</Title>
                  <Card>
                    <p>
                      <strong>Name:</strong> {generatedAgent.name}
                    </p>
                    <p>
                      <strong>Description:</strong> {generatedAgent.description}
                    </p>
                    <p>
                      <strong>Type:</strong> {generatedAgent.type}
                    </p>
                  </Card>
                </div>

                <div>
                  <Title level={4}>Edit Agent</Title>
                  <TextArea
                    rows={3}
                    value={editInstruction}
                    onChange={e => setEditInstruction(e.target.value)}
                    placeholder="Describe what changes you want to make..."
                  />
                  <Button
                    onClick={handleEdit}
                    loading={isEditing}
                    style={{ marginTop: 16, marginRight: 8 }}
                  >
                    <i className="las la-edit" style={{ marginRight: 8 }} />
                    Edit Agent
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleSave}
                    style={{ marginTop: 16 }}
                  >
                    <i className="las la-save" style={{ marginRight: 8 }} />
                    Save Agent
                  </Button>
                </div>
              </>
            )}
          </Space>
        </Card>
      </div>
    </PageLayout>
  )
}
