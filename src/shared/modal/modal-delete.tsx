import IconDelete from '@/assets/icons/delete.svg';
import { ModalEID } from '.';
import { ModalDeleteProps } from './types';

const ModalDelete = ({
  message = 'Are you sure want to delete this data?',
  ...props
}: ModalDeleteProps) => {
  return (
    <ModalEID type={'danger'} okText="Yes, Delete" {...props}>
      <ModalEID.Header title="Delete Data" icon={IconDelete} />
      <ModalEID.Body>
        <p className="">{message}</p>
      </ModalEID.Body>
      <ModalEID.Footer />
    </ModalEID>
  );
};

export default ModalDelete;
