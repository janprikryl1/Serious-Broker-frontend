import { useState } from 'react';

export const useModal = (open?: boolean) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  const openModal = () => setIsOpen(() => true);

  const closeModal = () => setIsOpen(() => false);

  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, openModal, closeModal, toggle };
};
