import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef, SelectProps } from 'antd';
import React, { forwardRef, useRef, useState } from 'react';

interface CustomSelectProps extends SelectProps {
  handleAdd?: (value: string) => void;
}

const CustomSelect = forwardRef<any, CustomSelectProps>(
  (
    {
      handleAdd,
      options,
      placeholder = 'Select value',
      optionFilterProp = 'label',
      showSearch = true,
      allowClear = true,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();
      handleAdd(value);
      setValue('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };

    return (
      <Select
        ref={ref}
        {...props}
        options={options}
        showSearch={showSearch}
        allowClear={allowClear}
        placeholder={placeholder}
        optionFilterProp={optionFilterProp}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Input
                placeholder="Please enter value"
                ref={inputRef}
                value={value}
                onChange={onValueChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
      />
    );
  },
);

export default CustomSelect;
