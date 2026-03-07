import useUserRole from '@/core/hooks/use-user-role';
import FormLabel from '@/shared/form/label';
import { ModalEID } from '@/shared/modal';
import { ModalActionProps } from '@/shared/modal/types';
import { Form, Input } from 'antd';
import useMutationRole from '../hooks/mutation-role';

export const ModalAddRole = ({ open, closeModal }: ModalActionProps) => {
  const [form] = Form.useForm();

  // Hooks
  const { addRole } = useMutationRole();
  const { refetchUserRole } = useUserRole();

  const onFinish = (values: { name: string }) => {
    addRole(values).then(() => {
      form.resetFields();
      closeModal();
      refetchUserRole();
    });
  };

  return (
    <ModalEID open={open} onCancel={closeModal} okText="Create">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <ModalEID.Header
          title="Create New Role"
          subtitle="Fill this form to create new role data"
        />
        <ModalEID.Body>
          <Form.Item
            rules={[{ required: true }]}
            name="name"
            className="w-full"
            label={<FormLabel label="Role Name" />}
          >
            <Input />
          </Form.Item>
        </ModalEID.Body>
        <ModalEID.Footer />
      </Form>
    </ModalEID>
  );
};
