import { cn } from '@/core/utils/class.utils';
import { capitalize } from '@/core/utils/global-utils';
import FormLabel from '@/shared/form/label';
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select } from 'antd';
import { useMemo } from 'react';
import { DynamicFormItemProps } from '../utils/model';

const DynamicFormItem = ({ configuration, layout }: DynamicFormItemProps) => {
  const { type, label, options } = configuration;
  const renderInput = () => {
    switch (type) {
      case 'text':
        return <Input />;
      case 'number':
        return <InputNumber className="w-full" />;
      case 'email':
        return <Input />;
      case 'password':
        return <Input.Password />;
      case 'select':
        return (
          <Select
            options={configuration?.options?.data?.map((item) => ({
              label: capitalize(item),
              value: item,
            }))}
          />
        );
      case 'checkbox':
        if (configuration?.options?.data?.length > 0) {
          return (
            <Checkbox.Group className="flex gap-2 items-center">
              {configuration?.options?.data?.map((item, index) => (
                <Checkbox key={`item-checkbox-${index}`} value={item}>
                  {capitalize(item)}
                </Checkbox>
              ))}
            </Checkbox.Group>
          );
        }
        return <Checkbox />;
      case 'radio':
        return (
          <Radio.Group className="flex items-center">
            {configuration?.options?.data?.map((item, index) => (
              <Radio key={`item-radio-${index}`} value={item}>
                {capitalize(item)}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'date':
        return <DatePicker className="w-full" />; // Replace with Date component when needed
    }
  };
  const className = cn('', {
    'w-full': layout === 1,
    'w-[calc(50%-12px)]': layout === 2,
    'w-[calc(33.33%-12px)]': layout === 3,
  });
  const rulesType = useMemo(() => {
    switch (type) {
      case 'email':
        return 'email';
      case 'checkbox':
        if (configuration.options?.data?.length > 0) {
          return 'array';
        }
        return 'boolean';
      case 'date':
        return 'date';
      case 'number':
        return 'number';
      default:
        return 'string';
    }
  }, [type, configuration.options.data]);
  return (
    <Form.Item
      rules={[
        {
          type: rulesType,
          required: options?.required,
          min: options?.min,
          max: options?.max,
          len: options?.len,
          pattern: RegExp(options?.pattern),
        },
      ]}
      className={className}
      name={label}
      label={<FormLabel label={capitalize(label)} />}
      valuePropName={
        type === 'checkbox' && !configuration?.options?.data?.length ? 'checked' : undefined
      }
      layout={type === 'checkbox' || type === 'radio' ? 'horizontal' : 'vertical'}
    >
      {renderInput()}
    </Form.Item>
  );
};

export default DynamicFormItem;
