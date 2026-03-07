import FormLabel from '@/shared/form/label';
import { Checkbox, Form, Input, InputNumber } from 'antd';
import { DynamicFormConfigurationFormOptionsProps } from '../utils/model';
import DataDropdown from './data-dropdown';

const DynamicFormConfigurationFormOptions = ({
  name,
}: DynamicFormConfigurationFormOptionsProps) => {
  const form = Form.useFormInstance();
  const type = Form.useWatch(['configuration', name, 'type'], form);
  const disabled = !type;
  return (
    <div className="flex flex-wrap gap-3 items-end">
      {type === 'text' || type === 'number' || type === 'password' ? (
        <>
          <Form.Item
            layout="horizontal"
            className="w-[calc(33.3333%-12px)]"
            name={[name, 'options', 'len']}
            label={<FormLabel className="w-14" label="Length" />}
          >
            <InputNumber min={1} max={100} className="w-full" />
          </Form.Item>
          <Form.Item
            layout="horizontal"
            className="w-[calc(33.3333%-12px)]"
            name={[name, 'options', 'min']}
            label={<FormLabel className="w-14" label="Min" />}
          >
            <InputNumber min={1} max={100} className="w-full" />
          </Form.Item>
          <Form.Item
            layout="horizontal"
            className="w-[calc(33.3333%-12px)]"
            name={[name, 'options', 'max']}
            label={<FormLabel className="w-14" label="Max" />}
          >
            <InputNumber min={1} max={100} className="w-full" />
          </Form.Item>
        </>
      ) : null}
      <Form.Item
        layout="horizontal"
        className="w-[calc(33.3333%-12px)]"
        name={[name, 'options', 'required']}
        valuePropName="checked"
        label={<FormLabel className="w-14" label="Required" />}
      >
        <Checkbox disabled={disabled} className="w-full" />
      </Form.Item>
      {type === 'text' ? (
        <Form.Item
          layout="horizontal"
          className="w-[calc(33.3333%-12px)]"
          name={[name, 'options', 'pattern']}
          label={<FormLabel className="w-14" label="Pattern" />}
        >
          <Input className="w-full" />
        </Form.Item>
      ) : null}
      {type === 'select' || type === 'checkbox' || type === 'radio' ? (
        <Form.Item
          layout="horizontal"
          className="w-full"
          name={[name, 'options', 'data']}
          label={<FormLabel className="w-14" label="Data" />}
        >
          <DataDropdown name={name} />
        </Form.Item>
      ) : null}
    </div>
  );
};

export default DynamicFormConfigurationFormOptions;
