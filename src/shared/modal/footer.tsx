import ButtonGradient from '../button/components/button-gradient';
import { useModalHandleContext, useModalValueContext } from './context';

const ModalFooter = () => {
  const { onCancel, onOk } = useModalHandleContext();
  const { cancelText, okText, isLoading } = useModalValueContext();

  return (
    <div className="pt-5 flex  justify-end items-center gap-2 border-t border-t-grey-200 noDrag">
      <ButtonGradient
        variant={"green"}
        className="w-1/4"
        isLoading={isLoading}
        onClick={onOk}
        loadingText="Loading..."
        label={typeof okText === 'string' ? okText : undefined}
      // icon={Save}
      />
      <ButtonGradient
        className="w-1/4"
        onClick={onCancel}
        label={typeof cancelText === 'string' ? cancelText : undefined}
        showDefaultIcon={false}
      />

    </div>
  );
};

export default ModalFooter;
