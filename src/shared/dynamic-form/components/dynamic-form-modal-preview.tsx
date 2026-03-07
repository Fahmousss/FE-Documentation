import { ModalEID } from '@/shared/modal';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useDynamicFormContext } from '../hooks/dynamic-form-context';
import DynamicFormItem from './dynamic-form-item';

const DynamicFormModalPreview = () => {
  const {
    tempConfiguration,
    openModalPreview,
    setModalClosed,
    setOpenModalPreview,
    setOpenModalConfigure,
    setConfiguration,
    setTempConfiguration,
  } = useDynamicFormContext();

  const [form] = Form.useForm();
  const onCancel = () => {
    setOpenModalPreview(false);
    form.resetFields();
    setOpenModalConfigure(true);
    setModalClosed(false);
  };

  const onFinish = () => {
    setOpenModalPreview(false);
    form.resetFields();
    setConfiguration(tempConfiguration);
    setTempConfiguration({} as any);
    setModalClosed(true);
  };

  useEffect(() => {
    if (!openModalPreview) {
      form.resetFields();
    }
  }, [openModalPreview]);
  return (
    <ModalEID
      width={600}
      open={openModalPreview}
      okText={'Save'}
      onCancel={onCancel}
      closeIcon={false}
      cancelText={'Back'}
      closable={false}
      maskClosable={false}
      onOk={onFinish}
    >
      <Form form={form} layout="vertical">
        <ModalEID.Header title={'Preview'} subtitle={'Preview Subtitle'} />
        <ModalEID.Body>
          <div className="flex gap-3 flex-wrap">
            {tempConfiguration?.configuration?.map((item, index) => (
              <DynamicFormItem
                key={`dynamic-form-item-${index}`}
                layout={tempConfiguration?.layout}
                configuration={item}
              />
            ))}
          </div>
        </ModalEID.Body>
        <ModalEID.Footer />
      </Form>
    </ModalEID>
  );
};

export default DynamicFormModalPreview;
