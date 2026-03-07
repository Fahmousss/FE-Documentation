import FormLabel from '@/shared/form/label';
import { Checkbox, CheckboxChangeEvent, Form, Input } from 'antd';
import { PermissionPagesArray, Permissions } from '../utils/constant';

const FormRole = () => {
  const form = Form.useFormInstance();
  const onCheckboxChange = (event: CheckboxChangeEvent) => {
    const checked = event.target.checked;

    // Buat object baru untuk menus
    const updatedMenus: Record<string, any> = {};
    PermissionPagesArray.forEach((page) => {
      updatedMenus[page] = {};
      Permissions.forEach((perm) => {
        updatedMenus[page][perm.name] = { selected: checked };
      });
    });

    // Set semua field ke value baru
    form.setFieldsValue({ permissions: updatedMenus });
  };
  return (
    <>
      <Form.Item name={'id'} hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name={'name'} label={<FormLabel label="Role" />}>
        <Input placeholder="Input Role" />
      </Form.Item>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <h3 className="w-1/2 font-Inter font-semibold text-md text-primary">Menu</h3>
          <div className="flex items-center gap-2.5">
            <p className="font-Inter font-bold text-lg text-primary">Permission</p>
            <Form.Item noStyle valuePropName="checked" name={'selectAll'}>
              <Checkbox onChange={onCheckboxChange}>
                <span className="font-Inter font-normal text-md text-primary">Select All</span>
              </Checkbox>
            </Form.Item>
          </div>
        </div>
        {PermissionPagesArray.map((page, index) => (
          <div key={`role-${page}-${index}`} className="flex items-center gap-4">
            <h3 className="w-1/2 px-3 py-2 bg-blue-clouds-500 rounded-md border border-blue-clouds-400 font-Inter font-normal text-base text-primary">
              {page}
            </h3>
            <Form.Item name={['permissions', page, 'id']} hidden>
              <Input hidden />
            </Form.Item>
            <div className="w-1/2 flex items-center justify-between">
              {Permissions.map((permission, index) => (
                <Form.Item
                  noStyle
                  valuePropName="checked"
                  name={['permissions', page, permission.name, 'selected']}
                  key={`permission-${page}-${permission.name}-${index}`}
                >
                  <Checkbox>
                    <span className="font-Inter font-normal text-md text-primary">
                      {permission.label}
                    </span>
                  </Checkbox>
                </Form.Item>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FormRole;
