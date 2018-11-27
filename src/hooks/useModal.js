import { useState } from 'react';

function useModal() {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = value => {
    setValue(value);
    setOpen(true);
  };

  const closeModal = () => {
    setValue(null);
    setOpen(false);
  };

  return [open, value, openModal, closeModal];
}

export default useModal;
