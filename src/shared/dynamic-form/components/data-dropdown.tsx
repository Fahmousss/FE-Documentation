import PlusIcon from '@/assets/icons/plus.svg';
import { Button, Divider, Input, InputRef, Select, Space } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useEffect, useRef, useState } from 'react';
import { useDynamicFormContext } from '../hooks/dynamic-form-context';
import { DataDropdownProps } from '../utils/model';

let index = 0;

const DataDropdown = ({ name }: DataDropdownProps) => {
  const form = useFormInstance();
  const configuration = useWatch(['configuration', name], form);
  const { openModalConfigure } = useDynamicFormContext();
  const [items, setItems] = useState<string[]>(configuration?.options?.data || []);
  const [label, setLabel] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, label || `New item ${index++}`]);
    setLabel('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (items.length === 0) return;
    form.setFieldValue(['configuration', name, 'options', 'data'], items);
  }, [items]);

  useEffect(() => {
    if (openModalConfigure && configuration) {
      const data = configuration?.options?.data || [];
      setItems(data);
      setLabel('');
    }
  }, [openModalConfigure, configuration]);

  return (
    <Select
      className="w-full"
      placeholder="Add item"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              required
              placeholder="Please enter item"
              ref={inputRef}
              value={label}
              onChange={onLabelChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusIcon />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

export default DataDropdown;
