import ButtonEID from '@/shared/button';
import CardEID from '@/shared/card';
import Header from '@/shared/header';
import { ModalEID } from '@/shared/modal';
import { Form } from 'antd';
import { useState } from 'react';
import DynamicFormItem from '@/shared/dynamic-form/components/dynamic-form-item';
import { useDynamicFormContext } from '@/shared/dynamic-form/hooks/dynamic-form-context';

const DynamicFormModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const { setOpenModalConfigure, configuration, setModalClosed } = useDynamicFormContext();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

  const openModalHandler = () => {
    setOpenModal(true);
  };
  const openModalConfigureHandler = () => {
    setOpenModalConfigure(true);
  };

  const cancelHandler = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const onFinishForm = (values: { [key: string]: any }) => {
    setFormValues(values);
    cancelHandler();
  };

  return (
    <>
      <CardEID>
        <div className="flex items-center justify-between">
          <Header title="Dynamic Form Modal" />
          <div className="w-fit flex items-center gap-3">
            <ButtonEID variant="primary" onClick={openModalConfigureHandler}>
              Configure
            </ButtonEID>
            <ButtonEID variant="primary" onClick={openModalHandler}>
              Open Modal
            </ButtonEID>
          </div>
        </div>
        <div className="w-full flex gap-3">
          <div className="w-1/2 flex flex-col gap-4">
            <p>Configuration: </p>
            <pre>{JSON.stringify(configuration, null, 2)}</pre>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <p>Form Values: </p>
            <pre>{JSON.stringify(formValues, null, 2)}</pre>
          </div>
        </div>
      </CardEID>
      <ModalEID
        onCancel={cancelHandler}
        open={openModal}
        width={600}
        cancelText={'Cancel'}
        okText={'Submit'}
      >
        <Form form={form} layout="vertical" onFinish={onFinishForm}>
          <ModalEID.Header title={'Modal Title'} subtitle={'Modal Subtitle'} />
          <ModalEID.Body>
            <div className="flex gap-3 flex-wrap">
              {configuration?.configuration?.map((item, index) => (
                <DynamicFormItem
                  key={`dynamic-form-item-${index}`}
                  layout={configuration?.layout}
                  configuration={item}
                />
              ))}
            </div>
          </ModalEID.Body>
          <ModalEID.Footer />
        </Form>
      </ModalEID>
    </>
  );
};

export default DynamicFormModal;
