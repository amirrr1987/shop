import type { CreateSlider, Slider, UpdateSlider } from '@/models/slider.model'
import { useSliderService } from '@/services/slider.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSliderStore = defineStore('slider', () => {
  const sliderService = useSliderService()
  const sliders = ref<Slider[]>([])
  const loading = ref(false)

  const getSliders = async () => {
    loading.value = true
    try {
      const response = await sliderService.getSliders()
      sliders.value = Array.isArray(response) ? response : []
    } finally {
      loading.value = false
    }
  }

  const createSlider = async (slider: CreateSlider) => {
    await sliderService.createSlider(slider)
    await getSliders()
  }

  const updateSlider = async (slider: UpdateSlider) => {
    await sliderService.updateSlider(slider)
    await getSliders()
  }

  const deleteSlider = async (id: string) => {
    await sliderService.deleteSlider(id)
    await getSliders()
  }

  return { sliders, loading, getSliders, createSlider, updateSlider, deleteSlider }
})
