import { cn } from '@/core/utils/class.utils';
import { DropdownVariants } from '@/core/variants/list.variants';
import ButtonEID from '@/shared/button';
import ButtonDelete from '@/shared/button/components/button-delete';
import FormLabel from '@/shared/form/label';
import IconSetting from '@/shared/icon/setting';
import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDynamicFormContext } from '../hooks/dynamic-form-context';
import { typeOptions } from '../utils/constant';
import { DynamicFormConfigurationOptionsProps } from '../utils/model';
import DynamicFormConfigurationFormOptions from './dynamic-form-configuration-form-options';

const DynamicFormConfigurationOptions = ({
  name,
  remove,
}: DynamicFormConfigurationOptionsProps) => {
  const { openModalConfigure } = useDynamicFormContext();
  const [show, setShow] = useState(false);
  const settingConfigurationHandler = () => {
    setShow((prev) => !prev);
  };
  const onRemoveHandler = () => {
    remove(name);
  };

  useEffect(() => {
    if (!openModalConfigure) {
      setShow(false);
    }
  }, [openModalConfigure]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-end mb-2">
        <Form.Item
          className="w-1/2"
          name={[name, 'label']}
          rules={[{ required: true }]}
          label={<FormLabel label="Label" />}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          name={[name, 'type']}
          rules={[{ required: true }]}
          label={<FormLabel label="Type" />}
        >
          <Select options={typeOptions} />
        </Form.Item>
        <ButtonEID
          type="button"
          size="icon"
          className="size-8"
          onClick={settingConfigurationHandler}
        >
          <IconSetting mode="white" width={16} height={16} />
        </ButtonEID>
        <ButtonDelete type="button" size="icon" onClick={onRemoveHandler} />
      </div>
      <div className={cn(DropdownVariants({ show }))}>
        <div className="overflow-hidden flex flex-col gap-1">
          <DynamicFormConfigurationFormOptions name={name} />
        </div>
      </div>
    </div>
  );
};

export default DynamicFormConfigurationOptions;
