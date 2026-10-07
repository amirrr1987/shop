export const USER_ROLES = [
  'owner',
  'admin',
  'editor',
  'viewer',
  'customer',
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const PANEL_ROLES = ['owner', 'admin', 'editor', 'viewer'] as const;

export type PanelRole = (typeof PANEL_ROLES)[number];

export const OPS_ROLES = ['owner', 'admin'] as const;

export const CATALOG_WRITE_ROLES = ['owner', 'admin', 'editor'] as const;

export const PANEL_READ_ROLES = PANEL_ROLES;

export const USER_ROLE_LABELS_FA: Record<UserRole, string> = {
  owner: 'مالک',
  admin: 'مدیر',
  editor: 'ویرایشگر',
  viewer: 'ناظر',
  customer: 'مشتری',
};

export const USER_ROLE_RANK: Record<UserRole, number> = {
  owner: 100,
  admin: 80,
  editor: 60,
  viewer: 40,
  customer: 20,
};

export function isPanelRole(role: string): role is PanelRole {
  return (PANEL_ROLES as readonly string[]).includes(role);
}

export const ORDER_STATUSES = [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS_FA: Record<OrderStatus, string> = {
  pending: 'در انتظار',
  paid: 'پرداخت‌شده',
  shipped: 'ارسال‌شده',
  delivered: 'تحویل‌شده',
  cancelled: 'لغو‌شده',
};

export const PAYMENT_STATUSES = [
  'pending',
  'paid',
  'failed',
  'refunded',
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_STATUS_LABELS_FA: Record<PaymentStatus, string> = {
  pending: 'در انتظار پرداخت',
  paid: 'پرداخت‌شده',
  failed: 'ناموفق',
  refunded: 'مسترد‌شده',
};

export const REVIEW_STATUSES = ['pending', 'approved', 'rejected'] as const;

export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export const REVIEW_STATUS_LABELS_FA: Record<ReviewStatus, string> = {
  pending: 'در انتظار تایید',
  approved: 'تایید‌شده',
  rejected: 'رد‌شده',
};

export const CONTACT_STATUSES = ['new', 'read', 'archived'] as const;

export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export const CONTACT_STATUS_LABELS_FA: Record<ContactStatus, string> = {
  new: 'جدید',
  read: 'خوانده‌شده',
  archived: 'بایگانی',
};

export const MAGAZINE_POST_STATUSES = ['draft', 'published'] as const;

export type MagazinePostStatus = (typeof MAGAZINE_POST_STATUSES)[number];

export const MAGAZINE_POST_STATUS_LABELS_FA: Record<
  MagazinePostStatus,
  string
> = {
  draft: 'پیش‌نویس',
  published: 'منتشر‌شده',
};

export const COUPON_TYPES = ['percent', 'fixed'] as const;

export type CouponType = (typeof COUPON_TYPES)[number];

export const COUPON_TYPE_LABELS_FA: Record<CouponType, string> = {
  percent: 'درصدی',
  fixed: 'مبلغ ثابت',
};

export const PRODUCT_PRICE_MODES = ['fixed', 'call'] as const;

export type ProductPriceMode = (typeof PRODUCT_PRICE_MODES)[number];

export const PRODUCT_PRICE_MODE_LABELS_FA: Record<ProductPriceMode, string> = {
  fixed: 'قیمت ثابت',
  call: 'تماس بگیرید',
};

export const PRODUCT_SORTS = [
  'newest',
  'price-asc',
  'price-desc',
  'bestselling',
  'popular',
] as const;

export type ProductSort = (typeof PRODUCT_SORTS)[number];

export const PRODUCT_SORT_LABELS_FA: Record<ProductSort, string> = {
  newest: 'جدیدترین',
  'price-asc': 'ارزان‌ترین',
  'price-desc': 'گران‌ترین',
  bestselling: 'پرفروش‌ترین',
  popular: 'محبوب‌ترین',
};

export const PRODUCT_CONDITIONS = ['new'] as const;

export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number];

export const PRODUCT_CONDITION_LABELS_FA: Record<ProductCondition, string> = {
  new: 'نو',
};

export const OTP_PURPOSES = ['guest_checkout'] as const;

export type OtpPurpose = (typeof OTP_PURPOSES)[number];

export const PAYMENT_PROVIDERS = ['zarinpal', 'mock'] as const;

export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number];

export const PAYMENT_TX_TYPES = ['charge', 'refund'] as const;

export type PaymentTxType = (typeof PAYMENT_TX_TYPES)[number];

export const PAYMENT_TX_STATUSES = ['pending', 'succeeded', 'failed'] as const;

export type PaymentTxStatus = (typeof PAYMENT_TX_STATUSES)[number];

export const AUDIT_ACTIONS = [
  'coupon.create',
  'coupon.update',
  'coupon.delete',
  'payment.refund',
  'settings.update',
  'order.status_update',
  'user.create',
  'user.update',
  'user.role_change',
  'user.activate',
  'user.deactivate',
] as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[number];

export const AUDIT_ACTION_LABELS_FA: Record<AuditAction, string> = {
  'coupon.create': 'ایجاد کوپن',
  'coupon.update': 'ویرایش کوپن',
  'coupon.delete': 'حذف کوپن',
  'payment.refund': 'استرداد پرداخت',
  'settings.update': 'به‌روزرسانی تنظیمات',
  'order.status_update': 'تغییر وضعیت سفارش',
  'user.create': 'ایجاد کاربر',
  'user.update': 'ویرایش کاربر',
  'user.role_change': 'تغییر نقش کاربر',
  'user.activate': 'فعال‌سازی کاربر',
  'user.deactivate': 'غیرفعال‌سازی کاربر',
};

export const CATALOG_FILTER_POSITIONS = ['start', 'end', 'top'] as const;

export type CatalogFilterPosition = (typeof CATALOG_FILTER_POSITIONS)[number];

export const CATALOG_GRID_COLUMNS = [3, 4, 5] as const;

export type CatalogGridColumns = (typeof CATALOG_GRID_COLUMNS)[number];
