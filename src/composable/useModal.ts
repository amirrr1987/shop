import { ref } from "vue";

export const useModal = () => {
  const isOpen = ref<boolean>(false);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
