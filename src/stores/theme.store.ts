import type { Direction } from "ant-design-vue/es/config-provider";
import type { Locale } from "ant-design-vue/es/locale";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import faIR from "ant-design-vue/es/locale/fa_IR";
import type {
  MappingAlgorithm,
  SizeType,
} from "ant-design-vue/es/config-provider/context";
import type { AliasToken } from "ant-design-vue/es/theme/internal";
import type { OverrideToken } from "ant-design-vue/es/theme/interface";
import { theme } from "ant-design-vue";
export const useThemeStore = defineStore("theme", () => {
  const componentSize = ref<SizeType>("middle");
  const locale = ref<Locale>(faIR);
  const direction = ref<Direction>("rtl");
  const isDark = ref<boolean>(false);
  const toggleDark = () => {
    isDark.value = !isDark.value;
  };
  const isCompact = ref<boolean>(false);
  const toggleCompact = () => {
    isCompact.value = !isCompact.value;
  };
  const token = ref<Partial<AliasToken>>({
    colorPrimary: "#1677ff",
    fontFamily: "var(--font-sans)",
  });
  const components = ref<OverrideToken>({
    Layout: {
      colorBgTrigger: "#1677ff",
      colorBgElevated: "#1677ff",
      colorBgContainer: "#1677ff",
      colorBgLayout: "#1677ff",
    },

  });
  const algorithm = ref<MappingAlgorithm[]>([]);

  watch(isDark, (newVal) => {
    if (newVal) {
      algorithm.value = [theme.darkAlgorithm];
    } else {
      algorithm.value = [];
    }
  });
  watch(isCompact, (newVal) => {
    if (newVal) {
      algorithm.value = [theme.compactAlgorithm];
    } else {
      algorithm.value = [];
    }
  });




  const hashed = ref<boolean>(false);
  const inherit = ref<boolean>(false);
  return {
    direction,
    componentSize,
    locale,
    token,
    components,
    isDark,
    toggleDark,
    isCompact,
    toggleCompact,
    algorithm,
    hashed,
    inherit,
  };
});
