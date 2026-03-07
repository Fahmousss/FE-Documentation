import { useState } from 'react';
import { DynamicFormActionContext, DynamicFormValueContext } from '../hooks/dynamic-form-context';
import { DynamicFormProviderProps, FormConfiguration } from '../utils/model';

const DynamicFormProvider = ({ children, withPreview = false }: DynamicFormProviderProps) => {
  const [configuration, setConfiguration] = useState<FormConfiguration>({} as FormConfiguration);
  const [tempConfiguration, setTempConfiguration] = useState<FormConfiguration>(
    {} as FormConfiguration,
  );
  const [openModalConfigure, setOpenModalConfigure] = useState(false);
  const [openModalPreview, setOpenModalPreview] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  return (
    <DynamicFormValueContext.Provider
      value={{
        modalClosed,
        withPreview,
        openModalConfigure,
        openModalPreview,
        configuration,
        tempConfiguration,
      }}
    >
      <DynamicFormActionContext.Provider
        value={{
          setModalClosed,
          setOpenModalConfigure,
          setOpenModalPreview,
          setConfiguration,
          setTempConfiguration,
        }}
      >
        {children}
      </DynamicFormActionContext.Provider>
    </DynamicFormValueContext.Provider>
  );
};

export default DynamicFormProvider;
