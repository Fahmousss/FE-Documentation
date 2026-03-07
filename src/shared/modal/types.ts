import { ModalProps } from 'antd';
import { FC, ReactNode } from 'react';
import { ButtonMode } from '../button/utils/model';

export interface ModalCompound extends FC<ModalRootProps> {
  Header: FC<ModalHeaderProps>;
  Footer: FC;
  Body: FC<ModalBodyProps>;
}

export interface ModalRootProps extends ModalProps {
  isLoading?: boolean;
  type?: ButtonMode;
  disabled?: boolean;
}

export interface ModalFooterProps {
  okText?: string;
  cancelText?: string;
}

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export interface ModalDeleteProps
  extends Pick<ModalRootProps, 'open' | 'onCancel' | 'onOk' | 'isLoading'> {
  message?: string;
  newPassword?: string;
}

export interface ModalConfirmProps extends ModalRootProps {
  title?: string;
  message?: string;
}

export interface ModalActionProps {
  closeModal: () => void;
  open: boolean;
  onFinishAction?: () => void;
  dataComponent?: unknown;
  table_id?: string;
}
