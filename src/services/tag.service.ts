import type { CreateTag, Tag, UpdateTag } from '@/models/tag.model'
import { axiosInstance } from './useAxios'

export const useTagService = () => {
  const getTags = async () => {
    const response = await axiosInstance.get('/tags')
    return response.data
  }
  const createTag = async (tag: CreateTag) => {
    const response = await axiosInstance.post('/tags', tag)
    return response.data
  }
  const updateTag = async (tag: UpdateTag) => {
    const response = await axiosInstance.patch(`/tags`, tag)
    return response.data
  }
  const deleteTag = async (tagId: Tag['id']) => {
    const response = await axiosInstance.delete(`/tags/${tagId}`)
    return response.data
  }
  return { getTags, createTag, updateTag, deleteTag }
}

