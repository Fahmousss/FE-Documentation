import { Modal } from 'antd';
import { ModalHandleContext, ModalValueContext } from './context';
import { ModalRootProps } from './types';

const ModalWrapper = ({
  open,
  isLoading,
  onCancel,
  onOk,
  okText = 'Save',
  cancelText = 'Cancel',
  type = 'primary',
  ...props
}: ModalRootProps) => {
  return (
    <ModalValueContext.Provider value={{ open, okText, cancelText, isLoading, type }}>
      <ModalHandleContext.Provider value={{ onCancel, onOk }}>
        <Modal onCancel={onCancel} open={open} centered footer={null} {...props} />
      </ModalHandleContext.Provider>
    </ModalValueContext.Provider>
  );
};

export default ModalWrapper;
