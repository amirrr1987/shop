<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  TypographyParagraph,
  TypographyText,
  TypographyTitle,
  Upload,
  message,
} from 'ant-design-vue'
import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { CURRENCY_UNIT_LABELS_FA, CURRENCY_UNITS } from '@shop/shared'
import type {
  CatalogFilterPosition,
  CatalogGridColumns,
  CurrencyUnit,
  StoreBranch,
} from '@shop/shared'
import { ApiError, uploadFile } from '@/api/client'
import { useSettingsStore } from '@/stores/settings'
import { formatMoney, formatNumber } from '@/utils/format'

const settings = useSettingsStore()
const saving = ref(false)
const uploadingLogo = ref(false)
const activeTab = ref('store')

const unit = ref<CurrencyUnit>(settings.currencyDisplayUnit)
const allowCustomer = ref(settings.allowCustomerCurrencyUnit)
const shopName = ref(settings.shopName)
const supportEmail = ref(settings.supportEmail)
const supportPhone = ref(settings.supportPhone)
const logoUrl = ref(settings.logoUrl)
const taxPercent = ref(settings.taxPercent)
const metaDescription = ref(settings.metaDescription)
const defaultOgImage = ref(settings.defaultOgImage)
const legalName = ref(settings.legalName)
const nationalId = ref(settings.nationalId)
const economicCode = ref(settings.economicCode)
const registrationNumber = ref(settings.registrationNumber)
const legalAddress = ref(settings.legalAddress)
const enamadCode = ref(settings.enamadCode)
const storeBranches = ref<StoreBranch[]>(
  settings.storeBranches.map((branch) => ({ ...branch })),
)
const catalogFilterPosition = ref<CatalogFilterPosition>(
  settings.catalogFilterPosition,
)
const catalogGridColumns = ref<CatalogGridColumns>(settings.catalogGridColumns)
const loyaltyEnabled = ref(settings.loyaltyEnabled)
const loyaltyEarnRialsPerPoint = ref(settings.loyaltyEarnRialsPerPoint)
const loyaltyRedeemRialsPerPoint = ref(settings.loyaltyRedeemRialsPerPoint)
const loyaltyMaxRedeemPercent = ref(settings.loyaltyMaxRedeemPercent)

watch(
  () =>
    [
      settings.currencyDisplayUnit,
      settings.allowCustomerCurrencyUnit,
      settings.shopName,
      settings.supportEmail,
      settings.supportPhone,
      settings.logoUrl,
      settings.taxPercent,
      settings.metaDescription,
      settings.defaultOgImage,
      settings.legalName,
      settings.nationalId,
      settings.economicCode,
      settings.registrationNumber,
      settings.legalAddress,
      settings.enamadCode,
      settings.storeBranches,
      settings.catalogFilterPosition,
      settings.catalogGridColumns,
      settings.loyaltyEnabled,
      settings.loyaltyEarnRialsPerPoint,
      settings.loyaltyRedeemRialsPerPoint,
      settings.loyaltyMaxRedeemPercent,
    ] as const,
  ([
    nextUnit,
    nextAllow,
    nextName,
    nextEmail,
    nextPhone,
    nextLogo,
    nextTax,
    nextMeta,
    nextDefaultOg,
    nextLegalName,
    nextNationalId,
    nextEconomicCode,
    nextRegistrationNumber,
    nextLegalAddress,
    nextEnamad,
    nextBranches,
    nextFilterPosition,
    nextGridColumns,
    nextLoyaltyEnabled,
    nextEarn,
    nextRedeem,
    nextMaxPercent,
  ]) => {
    unit.value = nextUnit
    allowCustomer.value = nextAllow
    shopName.value = nextName
    supportEmail.value = nextEmail
    supportPhone.value = nextPhone
    logoUrl.value = nextLogo
    taxPercent.value = nextTax
    metaDescription.value = nextMeta
    defaultOgImage.value = nextDefaultOg
    legalName.value = nextLegalName
    nationalId.value = nextNationalId
    economicCode.value = nextEconomicCode
    registrationNumber.value = nextRegistrationNumber
    legalAddress.value = nextLegalAddress
    enamadCode.value = nextEnamad
    storeBranches.value = nextBranches.map((branch) => ({ ...branch }))
    catalogFilterPosition.value = nextFilterPosition
    catalogGridColumns.value = nextGridColumns
    loyaltyEnabled.value = nextLoyaltyEnabled
    loyaltyEarnRialsPerPoint.value = nextEarn
    loyaltyRedeemRialsPerPoint.value = nextRedeem
    loyaltyMaxRedeemPercent.value = nextMaxPercent
  },
)

const sampleOrderRials = 5_000_000

const loyaltyPreview = computed(() => {
  const earnUnit = Math.max(1, Number(loyaltyEarnRialsPerPoint.value) || 1)
  const redeemUnit = Math.max(1, Number(loyaltyRedeemRialsPerPoint.value) || 1)
  const maxPercent = Math.min(
    100,
    Math.max(0, Number(loyaltyMaxRedeemPercent.value) || 0),
  )
  const earned = Math.floor(sampleOrderRials / earnUnit)
  const maxDiscount = Math.floor((sampleOrderRials * maxPercent) / 100)
  const maxPoints = Math.floor(maxDiscount / redeemUnit)
  return {
    earned,
    maxPoints,
    maxDiscount: maxPoints * redeemUnit,
  }
})

onMounted(() => {
  void settings.fetch().catch(() => {
    message.error('بارگذاری تنظیمات ناموفق بود')
  })
})

async function onUploadLogo(file: File) {
  if (!file.type.startsWith('image/')) {
    message.error('فقط فایل تصویری مجاز است')
    return false
  }
  uploadingLogo.value = true
  try {
    const result = await uploadFile<{ url: string }>(
      '/uploads/images',
      file,
      file.name || 'logo.jpg',
    )
    logoUrl.value = result.url
    message.success('لوگو آپلود شد — ذخیره را بزنید')
  } catch (err) {
    message.error(err instanceof ApiError ? err.message : 'آپلود ناموفق بود')
  } finally {
    uploadingLogo.value = false
  }
  return false
}

function addBranch() {
  if (storeBranches.value.length >= 12) {
    message.warning('حداکثر ۱۲ شعبه')
    return
  }
  storeBranches.value.push({
    name: '',
    address: '',
    phone: '',
    hours: '',
    mapUrl: '',
  })
}

function removeBranch(index: number) {
  storeBranches.value.splice(index, 1)
}

async function onSave() {
  saving.value = true
  try {
    const branches = storeBranches.value
      .map((branch) => ({
        name: branch.name.trim(),
        address: branch.address.trim(),
        phone: (branch.phone ?? '').trim(),
        hours: (branch.hours ?? '').trim(),
        mapUrl: (branch.mapUrl ?? '').trim(),
      }))
      .filter((branch) => branch.name && branch.address)

    await settings.update({
      currencyDisplayUnit: unit.value,
      allowCustomerCurrencyUnit: allowCustomer.value,
      shopName: shopName.value.trim() || 'فروشگاه',
      supportEmail: supportEmail.value.trim(),
      supportPhone: supportPhone.value.trim(),
      logoUrl: logoUrl.value.trim(),
      taxPercent: Number(taxPercent.value) || 0,
      metaDescription: metaDescription.value.trim(),
      defaultOgImage: defaultOgImage.value.trim(),
      legalName: legalName.value.trim(),
      nationalId: nationalId.value.trim(),
      economicCode: economicCode.value.trim(),
      registrationNumber: registrationNumber.value.trim(),
      legalAddress: legalAddress.value.trim(),
      enamadCode: enamadCode.value.trim(),
      storeBranches: branches,
      catalogFilterPosition: catalogFilterPosition.value,
      catalogGridColumns: catalogGridColumns.value,
      loyaltyEnabled: loyaltyEnabled.value,
      loyaltyEarnRialsPerPoint: Number(loyaltyEarnRialsPerPoint.value) || 100_000,
      loyaltyRedeemRialsPerPoint:
        Number(loyaltyRedeemRialsPerPoint.value) || 10_000,
      loyaltyMaxRedeemPercent: Number(loyaltyMaxRedeemPercent.value) || 0,
    })
    message.success('تنظیمات ذخیره شد')
  } catch (err) {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div style="padding-bottom: 88px">
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 16px;
      "
    >
      <div>
        <TypographyTitle :level="3" style="margin: 0 0 4px">
          تنظیمات فروشگاه
        </TypographyTitle>
        <TypographyParagraph type="secondary" style="margin: 0">
          هویت، مالیات، اعتماد، کاتالوگ و امتیاز — مبلغ‌ها همیشه به ریال ذخیره
          می‌شوند.
        </TypographyParagraph>
      </div>
      <Button type="primary" :loading="saving" @click="onSave">
        <template #icon>
          <SaveOutlined />
        </template>
        ذخیره تنظیمات
      </Button>
    </div>

    <Tabs v-model:active-key="activeTab" type="card">
      <Tabs.TabPane key="store" tab="فروشگاه">
        <Card>
          <Form layout="vertical">
            <Row :gutter="16">
              <Col :xs="24" :md="14">
                <FormItem label="نام فروشگاه" required>
                  <Input v-model:value="shopName" :maxlength="80" />
                </FormItem>
                <FormItem label="ایمیل پشتیبانی">
                  <Input
                    v-model:value="supportEmail"
                    type="email"
                    placeholder="support@example.com"
                    dir="ltr"
                  />
                </FormItem>
                <FormItem label="تلفن پشتیبانی">
                  <Input
                    v-model:value="supportPhone"
                    placeholder="021-..."
                    dir="ltr"
                  />
                </FormItem>
                <FormItem label="توضیح SEO (صفحهٔ اصلی)">
                  <Input.TextArea
                    v-model:value="metaDescription"
                    :rows="3"
                    :maxlength="300"
                    show-count
                    placeholder="توضیح کوتاه برای موتورهای جستجو و اشتراک‌گذاری"
                  />
                </FormItem>
                <FormItem label="تصویر پیش‌فرض OG">
                  <Input
                    v-model:value="defaultOgImage"
                    placeholder="/uploads/… یا URL کامل"
                    dir="ltr"
                    allow-clear
                  />
                </FormItem>
              </Col>
              <Col :xs="24" :md="10">
                <FormItem label="لوگو">
                  <Space direction="vertical" style="width: 100%">
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 120px;
                        border: 1px dashed #d9d9d9;
                        border-radius: 8px;
                        background: #fafafa;
                        padding: 12px;
                      "
                    >
                      <img
                        v-if="logoUrl"
                        :src="logoUrl"
                        alt="لوگو"
                        style="
                          max-height: 96px;
                          max-width: 100%;
                          object-fit: contain;
                        "
                      >
                      <TypographyText
                        v-else
                        type="secondary"
                      >
                        هنوز لوگو تنظیم نشده
                      </TypographyText>
                    </div>
                    <Space>
                      <Upload
                        :show-upload-list="false"
                        accept="image/*"
                        :before-upload="onUploadLogo"
                      >
                        <Button :loading="uploadingLogo">
                          <UploadOutlined />
                          آپلود لوگو
                        </Button>
                      </Upload>
                      <Button
                        v-if="logoUrl"
                        danger
                        @click="logoUrl = ''"
                      >
                        <DeleteOutlined />
                        حذف
                      </Button>
                    </Space>
                  </Space>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </Tabs.TabPane>

      <Tabs.TabPane key="money" tab="مالی و واحد پول">
        <Card>
          <Form layout="vertical">
            <FormItem label="مالیات (درصد)">
              <InputNumber
                v-model:value="taxPercent"
                :min="0"
                :max="100"
                :step="0.5"
                style="width: 200px"
              />
              <TypographyParagraph
                type="secondary"
                style="margin: 8px 0 0"
              >
                روی مبلغ بعد از تخفیف (قبل از ارسال) اعمال می‌شود و در سفارش
                ذخیره می‌گردد.
              </TypographyParagraph>
            </FormItem>

            <Divider />

            <FormItem label="واحد نمایش قیمت در فروشگاه">
              <Radio.Group v-model:value="unit">
                <Space direction="vertical">
                  <Radio
                    v-for="item in CURRENCY_UNITS"
                    :key="item"
                    :value="item"
                  >
                    {{ CURRENCY_UNIT_LABELS_FA[item] }}
                  </Radio>
                </Space>
              </Radio.Group>
            </FormItem>

            <FormItem>
              <Space align="center">
                <Switch v-model:checked="allowCustomer" />
                <span>مشتری بتواند واحد نمایش را عوض کند</span>
              </Space>
            </FormItem>

            <Alert
              type="info"
              show-icon
              message="اگر مبلغ بر واحد درشت بخش‌پذیر نباشد، نمایش به واحد ریزتر برمی‌گردد تا قیمت گرد نشود."
            />
          </Form>
        </Card>
      </Tabs.TabPane>

      <Tabs.TabPane key="legal" tab="قانونی و اعتماد">
        <Card title="مشخصات قانونی فاکتور" style="margin-bottom: 16px">
          <TypographyParagraph type="secondary">
            روی فاکتور چاپ‌پذیر فروشگاه و پنل نمایش داده می‌شود.
          </TypographyParagraph>
          <Form layout="vertical">
            <FormItem label="نام حقوقی / رسمی">
              <Input
                v-model:value="legalName"
                :maxlength="120"
                placeholder="اختیاری — اگر خالی باشد نام فروشگاه استفاده می‌شود"
              />
            </FormItem>
            <Row :gutter="16">
              <Col :xs="24" :md="8">
                <FormItem label="شناسه ملی">
                  <Input v-model:value="nationalId" :maxlength="20" dir="ltr" />
                </FormItem>
              </Col>
              <Col :xs="24" :md="8">
                <FormItem label="کد اقتصادی">
                  <Input
                    v-model:value="economicCode"
                    :maxlength="20"
                    dir="ltr"
                  />
                </FormItem>
              </Col>
              <Col :xs="24" :md="8">
                <FormItem label="شماره ثبت">
                  <Input
                    v-model:value="registrationNumber"
                    :maxlength="40"
                    dir="ltr"
                  />
                </FormItem>
              </Col>
            </Row>
            <FormItem label="نشانی قانونی">
              <Input.TextArea
                v-model:value="legalAddress"
                :rows="2"
                :maxlength="400"
                show-count
              />
            </FormItem>
          </Form>
        </Card>

        <Card title="اینماد" style="margin-bottom: 16px">
          <Form layout="vertical">
            <FormItem
              label="کد اینماد"
              extra="فقط query مثل id=123&Code=abc — خالی = بدون ویجت در فوتر"
            >
              <Input
                v-model:value="enamadCode"
                :maxlength="200"
                placeholder="id=...&Code=..."
                dir="ltr"
              />
            </FormItem>
          </Form>
        </Card>

        <Card title="شعب حضوری">
          <Form layout="vertical">
            <Space direction="vertical" style="width: 100%">
              <Card
                v-for="(branch, index) in storeBranches"
                :key="index"
                size="small"
                :title="`شعبه ${index + 1}`"
              >
                <template #extra>
                  <Button
                    type="link"
                    danger
                    size="small"
                    @click="removeBranch(index)"
                  >
                    حذف
                  </Button>
                </template>
                <Row :gutter="12">
                  <Col :xs="24" :md="12">
                    <FormItem label="نام">
                      <Input v-model:value="branch.name" :maxlength="80" />
                    </FormItem>
                  </Col>
                  <Col :xs="24" :md="12">
                    <FormItem label="تلفن">
                      <Input
                        v-model:value="branch.phone"
                        :maxlength="32"
                        dir="ltr"
                      />
                    </FormItem>
                  </Col>
                  <Col :span="24">
                    <FormItem label="آدرس">
                      <Input.TextArea
                        v-model:value="branch.address"
                        :rows="2"
                        :maxlength="300"
                      />
                    </FormItem>
                  </Col>
                  <Col :xs="24" :md="12">
                    <FormItem label="ساعات کاری">
                      <Input v-model:value="branch.hours" :maxlength="120" />
                    </FormItem>
                  </Col>
                  <Col :xs="24" :md="12">
                    <FormItem label="لینک نقشه">
                      <Input
                        v-model:value="branch.mapUrl"
                        :maxlength="500"
                        dir="ltr"
                        placeholder="https://..."
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Card>
              <Button type="dashed" block @click="addBranch">
                <template #icon>
                  <PlusOutlined />
                </template>
                افزودن شعبه
              </Button>
            </Space>
          </Form>
        </Card>
      </Tabs.TabPane>

      <Tabs.TabPane key="catalog" tab="کاتالوگ">
        <Card>
          <Form layout="vertical">
            <FormItem label="موقعیت پیش‌فرض فیلتر (RTL)">
              <Select
                v-model:value="catalogFilterPosition"
                style="width: 240px"
                :options="[
                  { label: 'راست', value: 'end' },
                  { label: 'چپ', value: 'start' },
                  { label: 'بالا', value: 'top' },
                ]"
              />
            </FormItem>
            <FormItem label="ستون‌های گرید دسکتاپ">
              <Select
                v-model:value="catalogGridColumns"
                style="width: 240px"
                :options="[
                  { label: '۳ ستون', value: 3 },
                  { label: '۴ ستون', value: 4 },
                  { label: '۵ ستون', value: 5 },
                ]"
              />
            </FormItem>
            <Alert
              type="info"
              show-icon
              message="مشتری می‌تواند در فروشگاه موقتاً فیلتر و تعداد ستون را عوض کند (localStorage)."
            />
          </Form>
        </Card>
      </Tabs.TabPane>

      <Tabs.TabPane key="loyalty" tab="امتیاز وفاداری">
        <Card>
          <Form layout="vertical">
            <FormItem label="فعال‌سازی امتیاز">
              <Space align="center">
                <Switch v-model:checked="loyaltyEnabled" />
                <span>کسب امتیاز با خرید پرداخت‌شده و خرج در چک‌اوت</span>
              </Space>
            </FormItem>

            <Alert
              v-if="!loyaltyEnabled"
              type="warning"
              show-icon
              style="margin-bottom: 16px"
              message="امتیاز خاموش است — مشتری در چک‌اوت گزینه‌ای نمی‌بیند و امتیازی ثبت نمی‌شود."
            />

            <Row :gutter="16">
              <Col :xs="24" :md="8">
                <FormItem label="هر چند ریال خالص = ۱ امتیاز">
                  <InputNumber
                    v-model:value="loyaltyEarnRialsPerPoint"
                    :min="1"
                    :step="10000"
                    style="width: 100%"
                    :disabled="!loyaltyEnabled"
                  />
                  <TypographyText type="secondary" style="font-size: 12px">
                    معادل تقریبی نمایش:
                    {{ formatMoney(Number(loyaltyEarnRialsPerPoint) || 0) }}
                  </TypographyText>
                </FormItem>
              </Col>
              <Col :xs="24" :md="8">
                <FormItem label="ارزش هر امتیاز هنگام خرج (ریال)">
                  <InputNumber
                    v-model:value="loyaltyRedeemRialsPerPoint"
                    :min="1"
                    :step="1000"
                    style="width: 100%"
                    :disabled="!loyaltyEnabled"
                  />
                  <TypographyText type="secondary" style="font-size: 12px">
                    {{ formatMoney(Number(loyaltyRedeemRialsPerPoint) || 0) }}
                    تخفیف به‌ازای هر امتیاز
                  </TypographyText>
                </FormItem>
              </Col>
              <Col :xs="24" :md="8">
                <FormItem label="سقف درصد تخفیف از جمع کالا">
                  <InputNumber
                    v-model:value="loyaltyMaxRedeemPercent"
                    :min="0"
                    :max="100"
                    style="width: 100%"
                    :disabled="!loyaltyEnabled"
                  />
                </FormItem>
              </Col>
            </Row>

            <Card
              size="small"
              title="نمونه محاسبه"
              :bordered="true"
              style="background: #fafafa"
            >
              <TypographyParagraph style="margin-bottom: 8px">
                برای سفارش نمونه
                <TypographyText strong>
                  {{ formatMoney(sampleOrderRials) }}
                </TypographyText>
                (خالص کالا بعد از تخفیف کوپن):
              </TypographyParagraph>
              <ul style="margin: 0; padding-inline-start: 18px">
                <li>
                  امتیاز کسب‌شده پس از پرداخت:
                  <TypographyText strong>
                    {{ formatNumber(loyaltyPreview.earned) }}
                  </TypographyText>
                </li>
                <li>
                  حداکثر امتیاز قابل خرج در همین مبلغ:
                  <TypographyText strong>
                    {{ formatNumber(loyaltyPreview.maxPoints) }}
                  </TypographyText>
                  → تخفیف
                  <TypographyText strong>
                    {{ formatMoney(loyaltyPreview.maxDiscount) }}
                  </TypographyText>
                </li>
              </ul>
            </Card>
          </Form>
        </Card>
      </Tabs.TabPane>
    </Tabs>

    <div
      style="
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        z-index: 20;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 12px 24px;
        background: rgba(255, 255, 255, 0.92);
        border-top: 1px solid #f0f0f0;
        backdrop-filter: blur(6px);
      "
    >
      <Button type="primary" size="large" :loading="saving" @click="onSave">
        <template #icon>
          <SaveOutlined />
        </template>
        ذخیره تنظیمات
      </Button>
    </div>
  </div>
</template>
