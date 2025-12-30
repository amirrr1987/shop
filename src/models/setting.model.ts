import { z } from 'zod'

// Transform null to undefined for form compatibility
const nullToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  schema.transform((val) => (val === null ? undefined : val))

export const settingSchema = z.object({
  id: z.string().uuid(),

  // Theme Colors
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),

  // Site Information
  siteName: z.string(),
  siteSlogan: z.string().optional(),
  siteDescription: z.string().optional(),
  siteKeywords: z.string().optional(),

  // Site Assets
  siteLogo: z.string().optional(),
  siteLogoDark: z.string().optional(),
  siteFavicon: z.string().optional(),

  // Contact Information
  siteEmail: z.string().optional(),
  sitePhone: z.string().optional(),
  siteMobile: z.string().optional(),
  siteAddress: z.string().optional(),
  siteCity: z.string().optional(),
  siteProvince: z.string().optional(),
  sitePostalCode: z.string().optional(),

  // Social Media
  socialInstagram: z.string().optional(),
  socialTelegram: z.string().optional(),
  socialWhatsapp: z.string().optional(),
  socialTwitter: z.string().optional(),
  socialLinkedin: z.string().optional(),
  socialYoutube: z.string().optional(),

  // Footer
  footerAbout: z.string().optional(),
  siteCopyright: z.string().optional(),

  // SEO & Analytics
  googleAnalyticsId: z.string().optional(),
  googleTagManagerId: z.string().optional(),
  metaPixelId: z.string().optional(),

  // E-commerce Settings
  currency: z.string(),
  currencyCode: z.string(),
  taxRate: z.number(),
  shippingCost: z.number(),
  freeShippingThreshold: z.number(),

  // Store Status
  isStoreOpen: z.boolean(),
  storeClosedMessage: z.string().optional(),

  // Working Hours
  workingHours: z.string().optional(),

  // Map Coordinates
  mapLatitude: z.number().optional(),
  mapLongitude: z.number().optional(),

  // Header Settings
  headerStyle: z.string(),
  headerSticky: z.boolean(),
  headerShowSearch: z.boolean(),
  headerShowCart: z.boolean(),
  headerShowCategories: z.boolean(),
  headerTopBarText: z.string().optional(),
  headerTopBarBgColor: z.string().optional(),
  headerTopBarEnabled: z.boolean(),

  // Footer Settings
  footerStyle: z.string(),
  footerShowNewsletter: z.boolean(),
  footerNewsletterTitle: z.string().optional(),
  footerNewsletterDescription: z.string().optional(),
  footerShowSocial: z.boolean(),
  footerShowContact: z.boolean(),
  footerTrustBadges: z.string().optional(),
  footerBgColor: z.string().optional(),
  footerTextColor: z.string().optional(),

  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export const updateSettingSchema = settingSchema.partial().extend({
  id: z.string().uuid(),
})

export type Setting = z.infer<typeof settingSchema>
export type UpdateSetting = z.infer<typeof updateSettingSchema>
