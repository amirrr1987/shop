import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability'
import type { PublicUser } from '@shop/shared'

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type Subjects =
  | 'Product'
  | 'Category'
  | 'Brand'
  | 'Order'
  | 'Customer'
  | 'Staff'
  | 'ProductUnit'
  | 'Review'
  | 'Coupon'
  | 'Shipping'
  | 'Contact'
  | 'Newsletter'
  | 'Magazine'
  | 'Dashboard'
  | 'Settings'
  | 'Audit'
  | 'all'

export type AppAbility = MongoAbility<[Actions, Subjects]>

export function defineAbilityFor(user: PublicUser | null): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (user?.role === 'owner') {
    can('manage', 'all')
  } else if (user?.role === 'admin') {
    can('read', 'Dashboard')
    can('manage', 'Product')
    can('manage', 'Category')
    can('manage', 'Brand')
    can('manage', 'ProductUnit')
    can('manage', 'Order')
    can('manage', 'Customer')
    can('manage', 'Review')
    can('manage', 'Magazine')
    can('manage', 'Coupon')
    can('manage', 'Shipping')
    can('manage', 'Contact')
    can('manage', 'Newsletter')
    can('update', 'Settings')
    can('read', 'Settings')
    can('read', 'Audit')
    can('read', 'Staff')
    can('create', 'Staff')
    can('update', 'Staff')
  } else if (user?.role === 'editor') {
    can('read', 'Dashboard')
    can('manage', 'Product')
    can('manage', 'Category')
    can('manage', 'Brand')
    can('read', 'ProductUnit')
    can('update', 'ProductUnit')
    can('manage', 'Order')
    can('read', 'Customer')
    can('manage', 'Review')
    can('manage', 'Magazine')
    can('read', 'Contact')
    can('update', 'Contact')
  } else if (user?.role === 'viewer') {
    can('read', 'Dashboard')
    can('read', 'Product')
    can('read', 'Category')
    can('read', 'Brand')
    can('read', 'ProductUnit')
    can('read', 'Order')
    can('read', 'Customer')
    can('read', 'Review')
    can('read', 'Magazine')
    can('read', 'Contact')
  }

  return build()
}

export const ability = createMongoAbility<[Actions, Subjects]>()

export function updateAbility(user: PublicUser | null) {
  const next = defineAbilityFor(user)
  ability.update(next.rules)
}
