import useModal from '@/core/hooks/use-modal';
import useUserRole from '@/core/hooks/use-user-role';
import BreadCrumbEID from '@/shared/breadcrumb';
import ButtonEID from '@/shared/button';
import ButtonAdd from '@/shared/button/components/button-add';
import ButtonDelete from '@/shared/button/components/button-delete';
import CardEID from '@/shared/card';
import FormLabel from '@/shared/form/label';
import LabelEID from '@/shared/header/label-eid'; 
import { Checkbox, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalAddRole } from './components/modal-add-role';
import { useMutationUserManagement } from './hooks/mutation-user-management';
import useAllMenu from './hooks/use-all-menu';
import { ICreateUserManagementBody } from './utils/model';

const CreateUserManagement = () => {
  const [form] = Form.useForm<ICreateUserManagementBody>();
  const navigate = useNavigate();
  const plainOptions = ['View', 'Create', 'Edit', 'Delete'];
  const [role, setRole] = useState<string | null>(null);
  const { open, openModal, closeModal } = useModal();

  // Hooks
  const { dataUserRole } = useUserRole();
  const { dataMenu, isLoadingMenu } = useAllMenu();
  const { addUser } = useMutationUserManagement();
  const [menuPermissions, setMenuPermissions] = useState<{
    [key: string]: string[];
  }>({});

  // Handle "Select All" checkbox click
  const handleSelectAllForMenu = (menuIndex: number) => {
    const currentPermissions = form.getFieldValue(['child', menuIndex, 'permissions']) || [];
    const newPermissions =
      currentPermissions.length === plainOptions.length ? [] : [...plainOptions];

    form.setFieldValue(['child', menuIndex, 'permissions'], newPermissions);

    const updatedPermissions = { ...menuPermissions };
    const menuName = form.getFieldValue(['child', menuIndex, 'menu_name']);
    if (menuName) {
      updatedPermissions[menuName] = newPermissions;
    }
    setMenuPermissions(updatedPermissions);
  };

  // Handle individual checkbox change
  const isMenuFullySelected = (menuIndex: number): boolean => {
    const currentPermissions = form.getFieldValue(['child', menuIndex, 'permissions']) || [];
    return currentPermissions.length === plainOptions.length;
  };

  const handleMenuPermissionChange = (menuIndex: number, checkedValues: string[]) => {
    const menuName = form.getFieldValue(['child', menuIndex, 'menu_name']);
    if (menuName) {
      setMenuPermissions((prev) => ({
        ...prev,
        [menuName]: checkedValues,
      }));
    }
  };

  const handleAddMenu = () => {
    const currentMenus = form.getFieldValue('child') || [];
    form.setFieldValue('child', [
      ...currentMenus,
      {
        menu_name: undefined,
        permissions: [],
      },
    ]);
  };

  const onFinish = async (values: ICreateUserManagementBody) => {
    try {
      console.log('Form submitted!', values);

      const body = {
        password: values.password,
        username: values.username,
        role: values.role,
        list_menu: values?.role
          ? []
          : values?.child?.map((item) => ({
              menu_name: item.menu_name,
              permissions: item.permissions,
            })),
      };

      await addUser(body)
        .then(() => {
          form.resetFields();
        })
        .finally(() => {
          navigate('/management/user-role');
        });
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleCancel = () => {
    navigate('/management/user-role');
  };

  const handleAddRole = () => {
    openModal();
  };

  return (
    <>
      <BreadCrumbEID
        className="relative mb-2.5"
        items={[
          {
            label: 'Management Role',
            path: '/management/user-role',
          },
          {
            label: 'Add new user',
            path: '#',
          },
        ]}
      />

      <CardEID>
        <LabelEID title="Create New Data" subTitle="Fill this form to register new data" />

        <Form form={form} layout="vertical" onFinish={onFinish} className="flex flex-col gap-4">
          <div className="flex w-full gap-3 justify-between">
            <Form.Item
              rules={[
                { required: true, message: 'Username is required' },
                {
                  pattern: /^[a-z0-9]+$/,
                  message:
                    'Username must only contain lowercase letters and numbers, with no spaces.',
                },
              ]}
              name="username"
              className="w-full md:w-1/3"
              label={<FormLabel label="Username" />}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Password is required' },
                {
                  min: 10,
                  message: 'Password must be at least 10 characters long',
                },
                {
                  pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
                  message: 'Password must contain at least one Uppercase, lowercase, and number',
                },
              ]}
              name="password"
              className="w-full md:w-1/3"
              label={<FormLabel label="Password" />}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name="role"
              className="w-full md:w-1/3"
              label={<FormLabel label="Role" />}
            >
              <SelectAction
                dataOption={dataUserRole?.map((item) => ({
                  label: item.role,
                  value: item.role,
                }))}
                onChange={(value) => setRole(value)}
                placeholder="Role"
                labelAdd="Add Role"
                handleAdd={handleAddRole}
              />
            </Form.Item>
          </div>

          {role !== 'Super Admin' ? (
            <Form.List name="child">
              {(fields, { remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div className="w-full flex justify-between items-end gap-10" key={field.key}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'menu_name']}
                        className="w-1/2"
                        label={<FormLabel label="Menu" />}
                      >
                        <Select
                          options={dataMenu?.map((item) => ({
                            label: item.menu_name,
                            value: item.menu_name,
                          }))}
                          loading={isLoadingMenu}
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        className="w-1/2"
                        name={[field.name, 'permissions']}
                        label={
                          <div className="flex gap-2 items-center">
                            <FormLabel label="Permissions" />
                            <Checkbox
                              checked={isMenuFullySelected(index)}
                              onChange={() => handleSelectAllForMenu(index)}
                            >
                              Select All
                            </Checkbox>
                          </div>
                        }
                      >
                        <Checkbox.Group
                          options={plainOptions}
                          onChange={(values) =>
                            handleMenuPermissionChange(index, values as string[])
                          }
                        />
                      </Form.Item>

                      {/* Delete */}
                      {fields.length > 1 && (
                        <ButtonDelete
                          color="red"
                          width={24}
                          height={24}
                          type="button"
                          onClick={() => {
                            remove(field.name);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </ButtonDelete>
                      )}
                    </div>
                  ))}

                  {role !== 'Super Admin' ? (
                    <ButtonAdd type="button" label="Add Menu" onClick={handleAddMenu} />
                  ) : null}
                </>
              )}
            </Form.List>
          ) : null}

          {/* Submit Button */}
          <div className="flex gap-2 justify-end">
            <ButtonEID type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </ButtonEID>
            <ButtonEID type="submit" label="Submit">
              Create
            </ButtonEID>
          </div>
        </Form>
        <ModalAddRole open={open} closeModal={closeModal} />
      </CardEID>
    </>
  );
};

export default CreateUserManagement;
