import { ReactNode } from 'react';

export interface Configuration {
  label: string;
  type: string;
  options: Partial<ConfigurationOptions>;
}

export interface ConfigurationOptions {
  len: number;
  min: number;
  max: number;
  required: boolean;
  pattern: string;
  data: string[];
}

export interface FormConfiguration {
  layout: number;
  configuration: Configuration[];
}

export interface DataDropdownProps {
  name: number;
}

export interface DynamicFormConfigurationFormOptionsProps {
  name: number;
}

export interface DynamicFormConfigurationOptionsProps {
  name: number;
  remove: (name: number) => void;
}

export interface DynamicFormItemProps {
  configuration: Configuration;
  layout: number;
}

export interface DynamicFormProviderProps {
  children: ReactNode;
  withPreview?: boolean;
}
