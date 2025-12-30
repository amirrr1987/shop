<template>
  <Card title="اسلایدرها">
    <template #extra>
      <Button type="primary" @click="openCreate" :icon="h(PlusOutlined)">افزودن اسلایدر</Button>
    </template>

    <SliderForm
      v-model:open="open"
      v-model:selected-slider="selectedSlider"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <Table
      :columns="columns"
      :dataSource="sliderStore.sliders"
      :loading="sliderStore.loading"
      :row-key="(record) => record.id"
    />
  </Card>
</template>

<script setup lang="ts">
import { useSliderStore } from '@/stores/slider.store'
import {
  Card,
  Table,
  Button,
  type TableColumnType,
  Popconfirm,
  Tag as AntTag,
  message,
  Image,
} from 'ant-design-vue'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons-vue'
import { h, onMounted, ref } from 'vue'
import SliderForm from './components/SliderForm.vue'
import type { CreateSlider, Slider, UpdateSlider } from '@/models/slider.model'
import dayjs from 'dayjs'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'

const sliderStore = useSliderStore()
const open = ref(false)

const emptySlider = (): CreateSlider | UpdateSlider =>
  ({
    title: '',
    position: 'home',
    image: '',
    imageMobile: null,
    link: null,
    subtitle: null,
    description: null,
    buttonText: null,
    buttonColor: null,
    textColor: null,
    textAlign: 'center',
    sortOrder: 0,
    isActive: true,
    startDate: null,
    endDate: null,
  }) as CreateSlider | UpdateSlider

const selectedSlider = ref<CreateSlider | UpdateSlider>(emptySlider())

const openCreate = () => {
  selectedSlider.value = emptySlider()
  open.value = true
}

const handleCancel = () => {
  open.value = false
  selectedSlider.value = emptySlider()
}

const handleSubmit = async () => {
  const payload = selectedSlider.value

  if ('id' in payload && payload.id) {
    await sliderStore.updateSlider(payload as UpdateSlider)
    message.success('اسلایدر با موفقیت ویرایش شد')
  } else {
    await sliderStore.createSlider(payload as CreateSlider)
    message.success('اسلایدر با موفقیت ایجاد شد')
  }

  open.value = false
  selectedSlider.value = emptySlider()
}

const columns: TableColumnType<Slider>[] = [
  {
    title: 'تصویر',
    dataIndex: 'image',
    width: 100,
    customRender: ({ text }) =>
      text
        ? h(Image, {
            src: `${API_BASE}/${text}`,
            width: 80,
            height: 45,
            style: { objectFit: 'cover', borderRadius: '4px' },
          })
        : h('span', { class: 'text-gray-400' }, '-'),
  },
  {
    title: 'عنوان',
    dataIndex: 'title',
  },
  {
    title: 'موقعیت',
    dataIndex: 'position',
    customRender: ({ text }) => h(AntTag, { color: 'blue' }, () => text),
  },
  {
    title: 'ترتیب',
    dataIndex: 'sortOrder',
    width: 80,
  },
  {
    title: 'وضعیت',
    dataIndex: 'isActive',
    width: 100,
    customRender: ({ text }) =>
      text
        ? h(AntTag, { color: 'success', icon: h(CheckCircleOutlined) }, () => 'فعال')
        : h(AntTag, { color: 'error', icon: h(CloseCircleOutlined) }, () => 'غیرفعال'),
  },
  {
    title: 'تاریخ شروع',
    dataIndex: 'startDate',
    customRender: ({ text }) => (text ? dayjs(text).format('YYYY/MM/DD') : '-'),
  },
  {
    title: 'تاریخ پایان',
    dataIndex: 'endDate',
    customRender: ({ text }) => (text ? dayjs(text).format('YYYY/MM/DD') : '-'),
  },
  {
    title: 'عملیات',
    key: 'actions',
    width: 120,
    customRender: ({ record }) =>
      h('div', { class: 'flex gap-2' }, [
        h(Button, {
          type: 'primary',
          class: 'flex! items-center justify-center',
          icon: h(EditOutlined),
          onClick: () => {
            selectedSlider.value = { ...record }
            open.value = true
          },
        }),
        h(
          Popconfirm,
          {
            title: 'حذف کردن اسلایدر',
            description: `این عمل نمی تواند برگشت داده شود.`,
            okText: 'بله',
            cancelText: 'خیر',
            onConfirm: async () => {
              await sliderStore.deleteSlider(record.id)
              message.success('اسلایدر با موفقیت حذف شد')
            },
          },
          {
            default: () =>
              h(Button, {
                danger: true,
                class: 'flex! items-center justify-center',
                icon: h(DeleteOutlined),
              }),
          },
        ),
      ]),
  },
]

onMounted(() => {
  sliderStore.getSliders()
})
</script>
