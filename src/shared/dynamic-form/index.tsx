import DynamicFormModalConfiguration from './components/dynamic-form-modal-configuration';
import DynamicFormModalPreview from './components/dynamic-form-modal-preview';
import DynamicFormProvider from './components/dynamic-form-provider';

interface DynamicFormProps {
  children: React.ReactNode;
  withPreview?: boolean;
}

const DynamicForm = ({ children, withPreview }: DynamicFormProps) => {
  return (
    <DynamicFormProvider withPreview={withPreview}>
      {children}
      <DynamicFormModalConfiguration />
      <DynamicFormModalPreview />
    </DynamicFormProvider>
  );
};

export default DynamicForm;
