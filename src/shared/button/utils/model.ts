import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { ButtonVariants } from './variants';

export type ButtonMode = VariantProps<typeof ButtonVariants>['variant'];

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  isLoading?: boolean;
  label?: string;
  icon?: string;
}

export interface ButtonActionProps extends ButtonProps {}

export interface ButtonDeleteProps extends ButtonActionProps {
  width?: number;
  height?: number;
}

export interface ButtonAddActionProps extends ButtonActionProps {
  isIcon?: true;
}

export interface ButtonExportImportProps extends Omit<ButtonActionProps, 'onClick'> {
  onExport?: () => void;
  onImport?: () => void;
}

export interface ButtonExportImportProps extends Omit<ButtonActionProps, 'onClick'> {
  onExport?: () => void;
  onImport?: () => void;
}
