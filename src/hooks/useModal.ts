import { ref } from 'vue';

export const useModal = () => {
  const showModal = ref(false);

  const toggleModal = () => {
    showModal.value = !showModal.value;
  };

  return {
    showModal,
    toggleModal,
  };
};

export default useModal;
