import useRoles from '@/core/hooks/fetch/use-roles';
import FormLabel from '@/shared/form/label';
import { Form, Input, Select } from 'antd';

const FormUser = () => {
  const { dataRoles } = useRoles();
  return (
    <>
      <Form.Item name={'id'} hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name={'name'} label={<FormLabel label="Username" />}>
        <Input placeholder="Input Name" />
      </Form.Item>
      <Form.Item name={'nrp'} label={<FormLabel label="NRP" />}>
        <Input placeholder="Input NRP" />
      </Form.Item>
      <Form.Item name={'role_id'} label={<FormLabel label="Role" />}>
        <Select
          placeholder="Select Role"
          allowClear
          showSearch
          optionFilterProp="label"
          options={dataRoles?.map((role) => ({ label: role.name, value: role.id }))}
        />
      </Form.Item>
    </>
  );
};

export default FormUser;
