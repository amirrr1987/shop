import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateTag, Tag, UpdateTag } from '@/models/tag.model'
import { useTagService } from '@/services/tag.service'

export const useTagStore = defineStore('tag', () => {
  const tagService = useTagService()
  const tags = ref<Tag[]>([])
  const loading = ref(false)

  const getTags = async () => {
    loading.value = true
    try {
      const response = await tagService.getTags()
      tags.value = Array.isArray(response) ? response : []
    } finally {
      loading.value = false
    }
  }

  const createTag = async (tag: CreateTag) => {
    await tagService.createTag(tag)
    await getTags()
  }

  const updateTag = async (tag: UpdateTag) => {
    await tagService.updateTag(tag)
    await getTags()
  }

  const deleteTag = async (tagId: Tag['id']) => {
    await tagService.deleteTag(tagId)
    await getTags()
  }

  return { tags, loading, getTags, createTag, updateTag, deleteTag }
})

