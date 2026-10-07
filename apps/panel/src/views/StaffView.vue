<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import { useAbility } from '@casl/vue'
import {
  Badge,
  Button,
  Form,
  FormItem,
  Input,
  InputPassword,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { FormInstance, RuleObject } from 'ant-design-vue/es/form'
import type { TableColumnType } from 'ant-design-vue'
import {
  EditOutlined,
  PlusOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue'
import type {
  AdminUser,
  CreateAdminUserInput,
  PanelRole,
  UpdateAdminUserInput,
  UserRole,
} from '@shop/shared'
import { PANEL_ROLES, USER_ROLE_LABELS_FA } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { useAuthStore } from '@/stores/auth'
import { ROLE_COLOR } from '@/utils/status'
import { formatDateTime } from '@/utils/date'

type UserForm = {
  fullName: string
  email: string
  password: string
  role: PanelRole
}

const auth = useAuthStore()
const ability = useAbility<AppAbility>()
const queryClient = useQueryClient()
const searchQuery = useRouteQuery('q', '')
const roleFilter = useRouteQuery('role', '')

const createOpen = ref(false)
const editOpen = ref(false)
const editingUser = ref<AdminUser | null>(null)
const formRef = ref<FormInstance>()
const editFormRef = ref<FormInstance>()

const model = reactive<UserForm>({
  fullName: '',
  email: '',
  password: '',
  role: 'editor',
})

const editModel = reactive<UserForm>({
  fullName: '',
  email: '',
  password: '',
  role: 'editor',
})

const assignableRoles = computed((): PanelRole[] => {
  if (auth.user?.role === 'owner') {
    return [...PANEL_ROLES]
  }
  return ['viewer', 'editor']
})

const roleSelectOptions = computed(() =>
  assignableRoles.value.map((value) => ({
    label: USER_ROLE_LABELS_FA[value],
    value,
  })),
)

const roleFilterOptions = [
  { label: 'همه', value: '' },
  ...PANEL_ROLES.map((value) => ({
    label: USER_ROLE_LABELS_FA[value],
    value,
  })),
]

const createRules: Record<keyof UserForm, RuleObject | RuleObject[]> = {
  fullName: [{ required: true, message: 'نام الزامی است' }],
  email: [
    { required: true, message: 'ایمیل الزامی است' },
    { type: 'email', message: 'ایمیل معتبر نیست' },
  ],
  password: [
    { required: true, message: 'رمز الزامی است' },
    { min: 8, message: 'حداقل ۸ کاراکتر' },
  ],
  role: [{ required: true, message: 'نقش الزامی است' }],
}

const editRules: Record<keyof UserForm, RuleObject | RuleObject[]> = {
  fullName: [{ required: true, message: 'نام الزامی است' }],
  email: [
    { required: true, message: 'ایمیل الزامی است' },
    { type: 'email', message: 'ایمیل معتبر نیست' },
  ],
  password: [{ min: 8, message: 'حداقل ۸ کاراکتر' }],
  role: [{ required: true, message: 'نقش الزامی است' }],
}

const columns: TableColumnType<AdminUser>[] = [
  { title: 'نام', dataIndex: 'fullName', key: 'fullName' },
  { title: 'ایمیل', dataIndex: 'email', key: 'email' },
  { title: 'نقش', key: 'role', width: 150 },
  { title: 'وضعیت', key: 'isActive', width: 110 },
  { title: 'تاریخ عضویت', dataIndex: 'createdAt', key: 'createdAt', width: 170 },
  { title: 'عملیات', key: 'actions', width: 200 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.staff,
  queryFn: () =>
    api<AdminUser[]>('/users/admin', {
      params: { scope: 'staff' },
    }),
})

const allRows = computed(() => data.value ?? [])
const searchText = computed(() => searchQuery.value.trim().toLowerCase())

const rows = computed(() => {
  return allRows.value.filter((user) => {
    if (roleFilter.value && user.role !== roleFilter.value) return false
    if (!searchText.value) return true
    const haystack = [user.fullName, user.email, user.id]
      .join(' ')
      .toLowerCase()
    return haystack.includes(searchText.value)
  })
})

const totalCount = computed(() => rows.value.length)

const roleCounts = computed(() => {
  const counts: Partial<Record<UserRole, number>> = {}
  for (const item of allRows.value) {
    counts[item.role] = (counts[item.role] ?? 0) + 1
  }
  return counts
})

function canManageRow(user: AdminUser) {
  if (auth.user?.role === 'owner') return true
  if (auth.user?.role === 'admin') {
    return user.role === 'editor' || user.role === 'viewer'
  }
  return false
}

const {
  mutate: updateRole,
  isPending: isUpdatingRole,
  variables: roleVariables,
} = useMutation({
  mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
    api<AdminUser>(`/users/${id}/role`, {
      method: 'PATCH',
      body: { role },
    }),
  onSuccess: () => {
    message.success('نقش به‌روزرسانی شد')
    void queryClient.invalidateQueries({ queryKey: queryKeys.staff })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'به‌روزرسانی ناموفق بود')
  },
})

const { mutate: createUser, isPending: isCreating } = useMutation({
  mutationFn: (body: CreateAdminUserInput) =>
    api<AdminUser>('/users/admin', {
      method: 'POST',
      body,
    }),
  onSuccess: (user) => {
    message.success(`کاربر «${user.fullName}» ایجاد شد`)
    createOpen.value = false
    resetCreateForm()
    void queryClient.invalidateQueries({ queryKey: queryKeys.staff })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ایجاد کاربر ناموفق بود')
  },
})

const { mutate: updateUser, isPending: isUpdating } = useMutation({
  mutationFn: ({ id, body }: { id: string; body: UpdateAdminUserInput }) =>
    api<AdminUser>(`/users/${id}`, {
      method: 'PATCH',
      body,
    }),
  onSuccess: (user) => {
    message.success(`«${user.fullName}» به‌روزرسانی شد`)
    editOpen.value = false
    editingUser.value = null
    void queryClient.invalidateQueries({ queryKey: queryKeys.staff })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'به‌روزرسانی ناموفق بود')
  },
})

const { mutate: setActive, isPending: isSettingActive } = useMutation({
  mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
    api<AdminUser>(`/users/${id}/active`, {
      method: 'PATCH',
      body: { isActive },
    }),
  onSuccess: (user) => {
    message.success(
      user.isActive
        ? `«${user.fullName}» فعال شد`
        : `«${user.fullName}» غیرفعال شد`,
    )
    void queryClient.invalidateQueries({ queryKey: queryKeys.staff })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'تغییر وضعیت ناموفق بود')
  },
})

function resetCreateForm() {
  model.fullName = ''
  model.email = ''
  model.password = ''
  model.role = assignableRoles.value.includes('editor')
    ? 'editor'
    : assignableRoles.value[0]!
  formRef.value?.resetFields()
}

function openCreate() {
  resetCreateForm()
  createOpen.value = true
}

function openEdit(user: AdminUser) {
  editingUser.value = user
  editModel.fullName = user.fullName
  editModel.email = user.email
  editModel.password = ''
  editModel.role = (PANEL_ROLES as readonly string[]).includes(user.role)
    ? (user.role as PanelRole)
    : 'editor'
  editOpen.value = true
}

async function onCreateSubmit() {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }
  createUser({
    fullName: model.fullName.trim(),
    email: model.email.trim(),
    password: model.password,
    role: model.role,
  })
}

async function onEditSubmit() {
  try {
    await editFormRef.value?.validate()
  } catch {
    return
  }
  const current = editingUser.value
  if (!current) return

  const body: UpdateAdminUserInput = {}
  if (editModel.fullName.trim() !== current.fullName) {
    body.fullName = editModel.fullName.trim()
  }
  if (editModel.email.trim().toLowerCase() !== current.email) {
    body.email = editModel.email.trim()
  }
  if (editModel.password) {
    body.password = editModel.password
  }
  if (editModel.role !== current.role) {
    body.role = editModel.role
  }
  if (Object.keys(body).length === 0) {
    message.info('تغییری اعمال نشد')
    editOpen.value = false
    return
  }
  updateUser({ id: current.id, body })
}

function onRoleChange(user: AdminUser, role: UserRole) {
  if (role === user.role) return
  if (user.id === auth.user?.id && role !== 'owner' && auth.user.role === 'owner') {
    message.warning('نمی‌توانید نقش خودتان را از مدیر کل تغییر دهید')
    return
  }
  updateRole({ id: user.id, role })
}

function onToggleActive(user: AdminUser) {
  setActive({ id: user.id, isActive: !user.isActive })
}

watch(error, (value) => {
  if (value) {
    message.error(
      value instanceof ApiError ? value.message : 'بارگذاری ناموفق بود',
    )
  }
})
</script>

<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px; gap: 12px; flex-wrap: wrap">
      <Space align="center" wrap>
        <TypographyTitle :level="3" style="margin: 0">
          کارکنان
        </TypographyTitle>
        <Badge
          :count="totalCount"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="9999"
          :show-zero="true"
        />
        <Tag
          v-for="role in PANEL_ROLES"
          :key="role"
          v-show="roleCounts[role]"
          :color="ROLE_COLOR[role]"
        >
          {{ roleCounts[role] }} {{ USER_ROLE_LABELS_FA[role] }}
        </Tag>
      </Space>
      <Space wrap>
        <Input.Search
          :value="searchQuery"
          allow-clear
          placeholder="جستجو: نام یا ایمیل…"
          style="width: 240px"
          @update:value="(value) => { searchQuery = value }"
        />
        <Select
          :value="roleFilter"
          :options="roleFilterOptions"
          style="width: 140px"
          @change="(value) => { roleFilter = value ? String(value) : '' }"
        />
        <Button
          v-if="ability.can('create', 'Staff')"
          type="primary"
          @click="openCreate"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          کاربر پنل
        </Button>
      </Space>
    </div>

    <Table
      row-key="id"
      :loading="isPending"
      :columns="columns"
      :data-source="rows"
      :pagination="{ pageSize: 20 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'role'">
          <Select
            v-if="ability.can('update', 'Staff') && canManageRow(record as AdminUser)"
            :value="(record as AdminUser).role"
            :options="roleSelectOptions"
            :loading="isUpdatingRole && roleVariables?.id === (record as AdminUser).id"
            size="small"
            style="width: 130px"
            @change="(value) => onRoleChange(record as AdminUser, value as UserRole)"
          />
          <Tag
            v-else
            :color="ROLE_COLOR[(record as AdminUser).role]"
          >
            {{ USER_ROLE_LABELS_FA[(record as AdminUser).role] }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'isActive'">
          <Tag :color="(record as AdminUser).isActive ? 'success' : 'default'">
            {{ (record as AdminUser).isActive ? 'فعال' : 'غیرفعال' }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'createdAt'">
          {{ formatDateTime((record as AdminUser).createdAt) }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'Staff') && canManageRow(record as AdminUser)"
              size="small"
              @click="openEdit(record as AdminUser)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="
                ability.can('delete', 'Staff') &&
                  canManageRow(record as AdminUser) &&
                  (record as AdminUser).id !== auth.user?.id
              "
              :title="
                (record as AdminUser).isActive
                  ? 'این کاربر غیرفعال شود؟'
                  : 'این کاربر دوباره فعال شود؟'
              "
              ok-text="بله"
              cancel-text="خیر"
              @confirm="onToggleActive(record as AdminUser)"
            >
              <Button
                size="small"
                :danger="(record as AdminUser).isActive"
                :loading="isSettingActive"
              >
                <template #icon>
                  <StopOutlined v-if="(record as AdminUser).isActive" />
                  <CheckCircleOutlined v-else />
                </template>
                {{ (record as AdminUser).isActive ? 'غیرفعال' : 'فعال‌سازی' }}
              </Button>
            </Popconfirm>
          </Space>
        </template>
      </template>
    </Table>

    <Modal
      v-model:open="createOpen"
      title="ایجاد کاربر پنل"
      ok-text="ایجاد"
      cancel-text="انصراف"
      :confirm-loading="isCreating"
      destroy-on-close
      @ok="onCreateSubmit"
    >
      <Form
        ref="formRef"
        layout="vertical"
        :model="model"
        :rules="createRules"
        style="margin-top: 12px"
      >
        <FormItem label="نام کامل" name="fullName">
          <Input v-model:value="model.fullName" />
        </FormItem>
        <FormItem label="ایمیل" name="email">
          <Input v-model:value="model.email" type="email" autocomplete="off" />
        </FormItem>
        <FormItem label="رمز عبور" name="password">
          <InputPassword v-model:value="model.password" autocomplete="new-password" />
        </FormItem>
        <FormItem label="نقش" name="role">
          <Select
            v-model:value="model.role"
            :options="roleSelectOptions"
            style="width: 100%"
          />
        </FormItem>
      </Form>
      <p style="margin: 0; color: rgba(0, 0, 0, 0.45); font-size: 12px">
        ناظر: فقط مشاهده · ویرایشگر: کاتالوگ/سفارش/مجله · مدیر: عملیات فروشگاه · مدیر کل: همه چیز
      </p>
    </Modal>

    <Modal
      v-model:open="editOpen"
      title="ویرایش کاربر"
      ok-text="ذخیره"
      cancel-text="انصراف"
      :confirm-loading="isUpdating"
      destroy-on-close
      @ok="onEditSubmit"
    >
      <Form
        ref="editFormRef"
        layout="vertical"
        :model="editModel"
        :rules="editRules"
        style="margin-top: 12px"
      >
        <FormItem label="نام کامل" name="fullName">
          <Input v-model:value="editModel.fullName" />
        </FormItem>
        <FormItem label="ایمیل" name="email">
          <Input v-model:value="editModel.email" type="email" autocomplete="off" />
        </FormItem>
        <FormItem label="رمز عبور جدید" name="password">
          <InputPassword
            v-model:value="editModel.password"
            placeholder="خالی = بدون تغییر"
            autocomplete="new-password"
          />
        </FormItem>
        <FormItem label="نقش" name="role">
          <Select
            v-model:value="editModel.role"
            :options="roleSelectOptions"
            style="width: 100%"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
