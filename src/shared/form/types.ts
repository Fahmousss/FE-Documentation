import { InputProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ChangeEvent } from 'react';
import { ModalFooterProps } from '../modal/types';

export interface FormLabelProps {
  label: string;
  className?: string;
}

export interface InputSearchProps extends InputProps {
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  colorIcon?: 'white' | 'blue';
}

export interface FormFooterProps extends Omit<ModalFooterProps, 'okText' | 'onOk'> {
  isLoading?: boolean;
  submitText?: string;
  className?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

export interface DropdownSearchProps {
  options?: DefaultOptionType[];
  inputChangeHandler?: (value: string) => void;
  selectChangeHandler?: (value: string) => void;
}
