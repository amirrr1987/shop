// types/remote-permissions.d.ts

import type { DefineComponent } from 'vue'

declare module 'remotePermissions/PermissionBootstrap' {
  // const component : DefineComponent<{}, {}, any>
  // export default component
  export function mountPermissionApp(el: Element): void
}

// declare module "remotePermissions/PermissionStore" {
//   import { Store } from "pinia";
//   import { PermissionState } from "@/types/permission";
//   export function usePermissionStore(): Store<string, PermissionState>;
// }
