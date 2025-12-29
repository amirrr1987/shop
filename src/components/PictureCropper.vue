<template>
  <div class="overflow-scroll">
    <div>
      <div
        v-if="!croppedImage"
        class="relative w-max h-max rounded overflow-hidden border-2 border-dashed border-primary"
      >
        <label
          for="amir-uploader"
          class="text-primary w-30 h-30 flex justify-center items-center cursor-pointer"
        >
          {{ 'انتخاب تصویر' }}
        </label>
        <input
          type="file"
          id="amir-uploader"
          @change="selectedImageHandler"
          accept="image/*"
          :hidden="true"
        />
      </div>
      <div v-if="croppedImage" class="relative z-10 rounded overflow-hidden shadow">
        <Image :src="croppedImage" class="w-full h-full object-cover" />
        <Button
          @click="remove"
          type="primary"
          danger
          shape="circle"
          size="small"
          class="absolute! top-2 end-2 z-20"
          :icon="h(DeleteOutlined)"
        />
      </div>
    </div>

    <Modal
      v-model:open="cropperModal.isOpen.value"
      ok-text="برش"
      :ok-button-props="{
        onClick: cropImage,
        title: 'برش',
      }"
      :mask-closable="false"
      :closable="false"
      width="40rem"
    >
      <div class="flex flex-col items-center justify-center gap-4">
        <Cropper
          ref="cropperRef"
          :src="selectedImage"
          :stencil-props="stencilProps"
          :stencil-size="stencilSize"
          :default-size="defaultSize"
          :min-width="cropMode === 'minMax' ? minWidth : undefined"
          :min-height="cropMode === 'minMax' ? minHeight : undefined"
          :max-width="cropMode === 'minMax' ? maxWidth : undefined"
          :max-height="cropMode === 'minMax' ? maxHeight : undefined"
          :rounded="50"
        />

        <Form layout="vertical">
          <FormItem>
            <RadioGroup v-model:value="cropMode" button-style="solid">
              <RadioButton value="free">رایگان</RadioButton>
              <RadioButton value="aspect">نسبت ارتفاع</RadioButton>
              <RadioButton value="size">عرض / ارتفاع</RadioButton>
              <RadioButton value="minMax">حداقل / حداکثر عرض / ارتفاع</RadioButton>
            </RadioGroup>
          </FormItem>

          <div v-if="cropMode === 'aspect'" class="flex gap-x-4">
            <FormItem label="نسبت عرض">
              <InputNumber v-model:value="aspectX" placeholder="X" :min="1" />
            </FormItem>
            <FormItem label="نسبت ارتفاع">
              <InputNumber v-model:value="aspectY" placeholder="Y" :min="1" />
            </FormItem>
          </div>

          <div v-if="cropMode === 'size'" class="flex gap-x-4">
            <FormItem label="عرض">
              <InputNumber v-model:value="cropWidth" placeholder="Width" :min="50" />
            </FormItem>
            <FormItem label="ارتفاع">
              <InputNumber v-model:value="cropHeight" placeholder="Height" :min="50" />
            </FormItem>
          </div>

          <div v-if="cropMode === 'minMax'" class="flex gap-x-4 items-center">
            <FormItem label="حداقل عرض">
              <InputNumber v-model:value="minWidth" placeholder="Min Width" :min="50" />
            </FormItem>

            <FormItem label="حداکثر عرض">
              <InputNumber v-model:value="maxWidth" placeholder="Max Width" :min="50" />
            </FormItem>
            <Divider type="vertical" />
            <FormItem label="حداقل ارتفاع">
              <InputNumber v-model:value="minHeight" placeholder="Min Height" :min="50" />
            </FormItem>
            <FormItem label="حداکثر ارتفاع">
              <InputNumber v-model:value="maxHeight" placeholder="Max Height" :min="50" />
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { DeleteOutlined } from '@ant-design/icons-vue'
import {
  Modal,
  Image,
  Form,
  FormItem,
  Divider,
  RadioGroup,
  RadioButton,
  InputNumber,
  Button,
} from 'ant-design-vue/es'
import { useModal } from '@/composable/useModal'

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)

const cropMode = ref<'aspect' | 'size' | 'minMax' | 'free'>('free')
const aspectX = ref(1)
const aspectY = ref(1)
const cropWidth = ref(100)
const cropHeight = ref(100)
const minWidth = ref(100)
const minHeight = ref(100)
const maxWidth = ref(200)
const maxHeight = ref(200)
const selectedImage = ref('')
const croppedImage = ref('')

const stencilProps = computed(() =>
  cropMode.value === 'aspect' ? { aspectRatio: aspectX.value / aspectY.value } : {},
)

const stencilSize = computed(() =>
  cropMode.value === 'size' ? { width: cropWidth.value, height: cropHeight.value } : null,
)

const defaultSize = computed(() =>
  cropMode.value === 'size' ? { width: cropWidth.value, height: cropHeight.value } : null,
)

const cropperModal = useModal()

const cropImage = () => {
  if (cropperRef.value) {
    const result = cropperRef.value.getResult()
    if (result && result.canvas) {
      croppedImage.value = result.canvas.toDataURL()
    }
    cropperModal.close()
  }
}

const selectedImageHandler = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImage.value = e.target?.result as string
      cropperModal.open()
    }
    reader.readAsDataURL(file)
  }
}

const remove = () => {
  cropperRef.value = null
  selectedImage.value = ''
  croppedImage.value = ''
}
</script>
