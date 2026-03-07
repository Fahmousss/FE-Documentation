import DynamicForm from '@/shared/dynamic-form';
import DynamicFormModal from './modal';

const FormModalPage = () => {
  return (
    <DynamicForm withPreview>
      <DynamicFormModal />
    </DynamicForm>
  );
};

export default FormModalPage;
