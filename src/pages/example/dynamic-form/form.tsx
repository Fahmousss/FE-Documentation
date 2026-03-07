import ButtonEID from '@/shared/button';
import CardEID from '@/shared/card';
import FormFooter from '@/shared/form/footer';
import Header from '@/shared/header';
import { Form } from 'antd';
import { useState } from 'react';
import DynamicFormItem from '@/shared/dynamic-form/components/dynamic-form-item';
import { useDynamicFormContext } from '@/shared/dynamic-form/hooks/dynamic-form-context';

const PageForm = () => {
  const { configuration, setOpenModalConfigure } = useDynamicFormContext();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const openModalHandler = () => setOpenModalConfigure(true);

  const onFinish = (values) => {
    console.log(values);
    setFormValues(values);
  };
  return (
    <>
      <CardEID>
        <div className="flex items-center justify-between">
          <Header title="Dynamic Form" />
          <ButtonEID variant="primary" onClick={openModalHandler}>
            Configure
          </ButtonEID>
        </div>
        <Form form={form} layout="vertical" className="flex gap-3 flex-wrap" onFinish={onFinish}>
          {configuration?.configuration?.map((item, index) => (
            <DynamicFormItem
              key={`dynamic-form-item-${index}`}
              layout={configuration?.layout}
              configuration={item}
            />
          ))}
          <FormFooter />
        </Form>
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
    </>
  );
};

export default PageForm;
