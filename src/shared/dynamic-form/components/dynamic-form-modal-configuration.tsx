import ButtonAdd from '@/shared/button/components/button-add';
import FormLabel from '@/shared/form/label';
import { ModalEID } from '@/shared/modal';
import { Form, InputNumber } from 'antd';
import { useEffect, useRef } from 'react';
import { useDynamicFormContext } from '../hooks/dynamic-form-context';
import { FormConfiguration } from '../utils/model';
import DynamicFormConfigurationOptions from './dynamic-form-configuration-options';

const DynamicFormModalConfiguration = () => {
  const {
    withPreview,
    modalClosed,
    configuration,
    tempConfiguration,
    openModalConfigure,
    setModalClosed,
    setOpenModalConfigure,
    setOpenModalPreview,
    setConfiguration,
    setTempConfiguration,
  } = useDynamicFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [formModal] = Form.useForm<FormConfiguration>();
  const onCancel = () => {
    setOpenModalConfigure(false);
    formModal.resetFields();
    setModalClosed(true);
  };
  const onFinish = (values: FormConfiguration) => {
    if (withPreview) {
      setTempConfiguration(values);
      setOpenModalPreview(true);
    } else {
      setConfiguration(values);
    }
    onCancel();
  };
  useEffect(() => {
    if (openModalConfigure) {
      if (!modalClosed && tempConfiguration?.configuration?.length > 0) {
        formModal.setFieldsValue(tempConfiguration);
      } else {
        formModal.setFieldsValue(configuration);
      }
    }
  }, [openModalConfigure, configuration, modalClosed, tempConfiguration]);

  useEffect(() => {
    if (openModalConfigure && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [openModalConfigure]);

  return (
    <ModalEID
      onCancel={onCancel}
      open={openModalConfigure}
      width={600}
      okText={withPreview ? 'Preview' : 'Save'}
    >
      <Form form={formModal} layout="vertical" onFinish={onFinish}>
        <ModalEID.Header title="Modal Title" subtitle="Modal Subtitle" />
        <ModalEID.Body>
          <Form.Item
            rules={[{ required: true, min: 1, max: 3, type: 'number' }]}
            className="w-full"
            name={'layout'}
            label={<FormLabel label="Layout" />}
          >
            <InputNumber ref={inputRef} className="w-full" min={1} max={3} />
          </Form.Item>
          <Form.List name={'configuration'}>
            {(fields, { add, remove }) => (
              <>
                <ButtonAdd
                  type="button"
                  size="small"
                  label="Add Configuration"
                  className="mt-2"
                  onClick={() => {
                    add();
                  }}
                />
                <div className="max-h-[200px] overflow-y-auto">
                  {fields.map(({ key, name }) => (
                    <DynamicFormConfigurationOptions
                      key={`form-config-option-${key}`}
                      name={name}
                      remove={remove}
                    />
                  ))}
                </div>
              </>
            )}
          </Form.List>
        </ModalEID.Body>
        <ModalEID.Footer />
      </Form>
    </ModalEID>
  );
};

export default DynamicFormModalConfiguration;
