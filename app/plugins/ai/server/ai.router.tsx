import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { AiServiceFactory } from './ai.service.factory'
/**
 * @provider AiApi
 * @description An AI library to query OpenAI by default and Gemini as an alternative
 * @function {({ prompt: string, provider?: 'openai' | 'gemini' | 'anthropic' }) => Promise<{ answer: string}>} generateText - Send the prompt to OpenAI and get back its answer
 * @function {({ prompt: string, provider?: 'openai' | 'gemini' | 'anthropic' }) => Promise<{ url: string }>} generateImage - Send the prompt to OpenAI to generate an Image and get back the URL of the image in the answer
 * @function {({ url: string, provider?: 'openai' | 'gemini' | 'anthropic' }) => Promise<{ translation: string }>} audioToText - Send the readStream of an audio file to OpenAI to transcribe it into text and get back the text in the answer
 * @function {({ text: string, provider?: 'openai' | 'gemini' | 'anthropic' } => Promise<{ url: string }>} textToAudio - Send the text to OpenAI to convert it into an mp3 file and get back the url of the audio file
 * @usage `const generateText = Api.ai.generateText.useMutation(); generateText.mutateAsync({ prompt: 'How are you?' }).then(response => response.answer);`
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */

export const AiRouter = Trpc.createRouter({
  generateText: Trpc.procedure
    .input(
      z.object({
        prompt: z.string(),
        provider: z.enum(['openai', 'gemini', 'anthropic']).default('openai'),
      }),
    )
    .mutation(async ({ input }) => {
      const { prompt, provider } = input
      const aiService = AiServiceFactory.create(provider)
      const answer = await aiService.generateText({
        prompt,
      })
      return { answer }
    }),
  // generateText: Trpc.procedure
  //   .input(
  //     z.object({
  //       prompt: z.string(),
  //       attachmentUrls: z.array(z.string()).optional(),
  //       provider: z.enum(['openai', 'gemini', 'anthropic']).default('openai'),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const { prompt, attachmentUrls, provider } = input
  //     const aiService = AiServiceFactory.create(provider)
  //     const answer = await aiService.generateText({
  //       prompt,
  //       attachmentUrls,
  //     })
  //     return { answer }
  //   }),
  // /**
  //  * ? The schema in this function is an example. You should update it to your use-case.
  //  * ? If you need multiple schemas, you can create one dedicated function for each.
  //  */
  // generateJson: Trpc.procedure
  //   .input(
  //     z.object({
  //       instruction: z.string(),
  //       content: z.string(),
  //       attachmentUrls: z.array(z.string()).optional(),
  //       provider: z.enum(['openai', 'gemini', 'anthropic']).default('openai'),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const schema = z.object({
  //       results: z.array(
  //         z.object({
  //           description: z.string(),
  //         }),
  //       ),
  //     })
  //     const aiService = AiServiceFactory.create(input.provider)
  //     const json = await aiService.generateJson(
  //       input.instruction,
  //       input.content,
  //       schema,
  //       input.attachmentUrls,
  //     )
  //     return json
  //   }),
  // generateImage: Trpc.procedure
  //   .input(
  //     z.object({
  //       prompt: z.string(),
  //       provider: z.enum(['openai', 'gemini', 'anthropic']).default('openai'),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const aiService = AiServiceFactory.create(input.provider)
  //     const url = await aiService.generateImage(input.prompt)
  //     return { url }
  //   }),
  // audioToText: Trpc.procedure
  //   .input(
  //     z.object({
  //       url: z.string(),
  //       provider: z.enum(['openai', 'gemini', 'anthropic']).default('openai'),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const aiService = AiServiceFactory.create(input.provider)
  //     const arrayBuffer = await axios
  //       .get<ArrayBuffer>(input.url, { responseType: 'arraybuffer' })
  //       .then(response => response.data)
  //     const readstream = await FileHelper.createReadStreamFromArrayBuffer(
  //       arrayBuffer,
  //       'audio.wav',
  //     )
  //     const translation = await aiService.fromAudioToText(readstream)
  //     return { translation }
  //   }),
  // textToAudio: Trpc.procedure
  //   .input(
  //     z.object({
  //       text: z.string(),
  //       provider: z.enum(['openai', 'gemini', 'anthropic']).default('openai'),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const aiService = AiServiceFactory.create(input.provider)
  //     const buffer = await aiService.fromTextToAudio(input.text)
  //     const now = DateHelper.getNow()
  //     const name = `${now.getTime()}__text-to-audio.mp3`
  //     const file: UploadServer.FileType = {
  //       name,
  //       mimetype: 'audio/mp3',
  //       buffer,
  //     }
  //     const urls = await UploadServer.service.uploadPublic(file)
  //     const url = urls[0].url
  //     return { url }
  //   }),
})
