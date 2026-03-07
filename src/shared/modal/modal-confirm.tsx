import IconConfirm from '@/assets/icons/confirm.svg';
import { ModalEID } from '.';
import { ModalConfirmProps } from './types';

const ModalConfirm = ({
  message = 'Are you sure want to create new data? Please ensure your data is correct.',
  title = 'Create New Data',
  okText = 'Yes, Create',
  ...props
}: ModalConfirmProps) => {
  return (
    <ModalEID {...props} type={'primary'} okText={okText}>
      <ModalEID.Header title={title} icon={IconConfirm} />
      <ModalEID.Body>
        <p className="">{message}</p>
      </ModalEID.Body>
      <ModalEID.Footer />
    </ModalEID>
  );
};

export default ModalConfirm;
