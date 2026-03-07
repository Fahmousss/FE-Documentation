import { useCallback, useState } from 'react';

export default function useModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    openModal,
    closeModal,
    message,
    setMessage,
  };
}
