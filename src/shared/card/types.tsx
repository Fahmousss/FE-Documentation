import { PickerProps } from 'antd/es/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';
import { FilterDateValue } from '../date-picker/constant';

export interface CardProps {
  className?: string;
  children: ReactNode;
}

export type EnhancedCardProps = CardProps & HTMLAttributes<HTMLDivElement>;
export interface OldCardHeaderProps {
  withType?: boolean;
  formatDate?: string;
  dateType?: PickerProps['picker'];
  type?: string;
  fullScreen?: boolean;
  exportHandler?: VoidFunction;
  zoomInHandler?: VoidFunction;
  zoomOutHandler?: VoidFunction;
  fullSizeHandler?: VoidFunction;
  filterHandler?: VoidFunction;
  options?: { label: string; value: string }[];
  onChangeSelectHandler?: (value: string) => void;
  handleDateRangeChange?: (dates: [Dayjs, Dayjs]) => void;
  setType?: Dispatch<SetStateAction<string>>;
  selectValue?: string;
}

export interface CardHeaderProps {
  zoomIn?: ZoomInOptions;
  zoomOut?: ZoomOutOptions;
  export?: ExportOptions;
  fullScreen?: FullScreenOptions;
  filter?: FilterDataOptions;
  rangePicker?: FilterRangeOptions;
  datePicker?: FilterDateOptions;
  select?: SelectOptions;
}

export interface DefaultOptions {
  label?: string;
  display?: boolean;
  handler?: VoidFunction;
}
interface ZoomInOptions extends DefaultOptions {}

interface ZoomOutOptions extends DefaultOptions {}

interface ExportOptions extends DefaultOptions {}

interface FullScreenOptions extends DefaultOptions {}

interface FilterDataOptions extends DefaultOptions {}

interface FilterRangeOptions extends Omit<DefaultOptions, 'handler'> {
  withPresets?: boolean;
  type?: FilterDateValue;
  setType?: Dispatch<SetStateAction<string>>;
  dateType?: PickerProps['picker'];
  withType?: boolean;
  formatDate?: string;
  allowedFilter?: FilterDateValue[];
  handler?: (dates: [Dayjs, Dayjs]) => void;
}

interface FilterDateOptions extends Omit<FilterRangeOptions, 'withPresets' | 'handler'> {
  handler?: (date: Dayjs) => void;
}

interface SelectOptions extends Omit<DefaultOptions, 'handler'> {
  value?: string;
  options?: { label: string; value: string }[];
  handler?: (value: string) => void;
}
