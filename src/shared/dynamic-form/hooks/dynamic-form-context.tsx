import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { FormConfiguration } from '../utils/model';

interface DynamicFormValueContext {
  modalClosed: boolean;
  withPreview: boolean;
  openModalPreview: boolean;
  openModalConfigure: boolean;
  configuration: FormConfiguration;
  tempConfiguration: FormConfiguration;
}

interface DynamicFormActionContext {
  setModalClosed: Dispatch<SetStateAction<boolean>>;
  setOpenModalPreview: Dispatch<SetStateAction<boolean>>;
  setOpenModalConfigure: Dispatch<SetStateAction<boolean>>;
  setConfiguration: Dispatch<SetStateAction<FormConfiguration>>;
  setTempConfiguration: Dispatch<SetStateAction<FormConfiguration>>;
}

export const DynamicFormValueContext = createContext<DynamicFormValueContext>(null);
export const DynamicFormActionContext = createContext<DynamicFormActionContext>(null);

export const useDynamicFormContext = () => {
  const valueContext = useContext(DynamicFormValueContext);
  const actionContext = useContext(DynamicFormActionContext);
  if (!valueContext || !actionContext) {
    throw new Error('useDynamicFormContext must be used within a DynamicFormProvider');
  }
  return { ...valueContext, ...actionContext };
};
