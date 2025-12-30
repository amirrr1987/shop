import type { CreateSlider, Slider, UpdateSlider } from '@/models/slider.model'
import { axiosInstance } from './useAxios'

export const useSliderService = () => {
  const getSliders = async (): Promise<Slider[]> => {
    const response = await axiosInstance.get('/sliders')
    return response.data
  }

  const getSlidersByPosition = async (position: string): Promise<Slider[]> => {
    const response = await axiosInstance.get(`/sliders/position/${position}`)
    return response.data
  }

  const getSlider = async (id: string): Promise<Slider> => {
    const response = await axiosInstance.get(`/sliders/${id}`)
    return response.data
  }

  const createSlider = async (slider: CreateSlider): Promise<Slider> => {
    const response = await axiosInstance.post('/sliders', slider)
    return response.data
  }

  const updateSlider = async (slider: UpdateSlider): Promise<Slider> => {
    const response = await axiosInstance.patch('/sliders', slider)
    return response.data
  }

  const deleteSlider = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/sliders/${id}`)
  }

  return { getSliders, getSlidersByPosition, getSlider, createSlider, updateSlider, deleteSlider }
}
