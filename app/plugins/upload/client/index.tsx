import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Options = { file: File }

export const useUploadPrivate = () =>
  useMutation({
    mutationFn: async ({ file }: Options): Promise<{ url: string }> => {
      const formData = new FormData()
      formData.append('file', file, file.name)

      const response = await axios.post<{ url: string }>(
        '/api/upload/private',
        formData,
      )

      return response.data
    },
  })

export const useUploadPublic = () =>
  useMutation({
    mutationFn: async ({ file }: Options): Promise<{ url: string }> => {
      const formData = new FormData()
      formData.append('file', file, file.name)

      const response = await axios.post<{ url: string }>(
        '/api/upload/public',
        formData,
      )

      return response.data
    },
  })
