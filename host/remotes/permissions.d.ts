// types/remote-permissions.d.ts

import type { DefineComponent } from 'vue'

declare module 'remotePermissions/PermissionApp' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'remotePermissions/PermissionBootstrap' {
}

declare module 'remotePermissions/PermissionRouter' {
  
}

declare module "remotePermissions/PermissionStore" {
  import { Store } from "pinia";
  import { PermissionState } from "@/types/permission";
  export function usePermissionStore(): Store<string, PermissionState>;
}
