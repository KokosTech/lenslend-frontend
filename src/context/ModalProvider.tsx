/* eslint-disable indent */
'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import Modal from '@/components/common/modals';

const ModalContext = createContext<{
  open: boolean;
  toggleModal: () => void;
  setModal: (title: string, content: ReactNode) => void;
}>({
  open: true,
  toggleModal: () => {},
  setModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<ReactNode>(<></>);

  const setModal = (newTitle: string, newContent: ReactNode) => {
    setTitle(newTitle);
    setContent(newContent);
  };

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        toggleModal,
        setModal,
      }}
    >
      {children}
      {open && (
        <Modal
          title={title}
          onClose={() => {
            setOpen(false);
          }}
        >
          {content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export default ModalContext;

export const useModal = () => {
  const { open, toggleModal, setModal } = useContext(ModalContext);

  return {
    open,
    toggleModal,
    setModal,
  };
};
