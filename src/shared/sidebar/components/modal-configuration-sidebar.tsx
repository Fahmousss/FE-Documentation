import { capitalize } from '@/core/utils/global-utils';
import ButtonAdd from '@/shared/button/components/button-add';
import ButtonDelete from '@/shared/button/components/button-delete';
import FormLabel from '@/shared/form/label';
import { ModalEID } from '@/shared/modal';
import { Form, Input, InputRef, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSectionContext } from '../hooks/use-section-context';
import useSidebarMutation from '../hooks/use-sidebar-mutation';
import { sidebarIcon, SidebarTypeOptions } from '../utils/constant';
import { IEditSidebarChildBody, ISidebarBody, ModalConfigurationProps } from '../utils/models';

const ModalConfigurationSidebar = ({ closeModal, open, item }: ModalConfigurationProps) => {
  const [form] = Form.useForm<ISidebarBody>();
  const inputRef = useRef<InputRef>(null);
  const [deletedItems, setDeletedItems] = useState<{ id: string }[]>([]);

  const isEdit = !!item;
  const { section, refetchSidebar } = useSectionContext();

  const {
    addSidebar,
    isPendingAddSidebar,
    isPendingEditSidebar,
    editChildSidebar,
    isPendingEditChildSidebar,
  } = useSidebarMutation();

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        image: item.image,
        child: item.child?.map((i) => ({
          id: i.id,
          name: i.name,
          image: i.image,
          path: i.path,
        })),
      });
    }
  }, [item]);

  const onCancel = () => {
    closeModal();
    form.resetFields();
  };

  const onFinish = (value: ISidebarBody) => {
    const body: IEditSidebarChildBody = {} as IEditSidebarChildBody;
    if (isEdit) {
      const body: IEditSidebarChildBody = {
        name: value.name,
        image: value.image,
        id: item.id,
        parent_id: item.parent_id,
        path: item.path,
        section_id: item.section_id!,
        child:
          value.child?.map((i) => ({
            id: i.id ?? '00000000-0000-0000-0000-000000000000',
            name: i.name,
            image: i.image ?? null,
            path: i.path,
            section_id: item.section_id!,
          })) ?? [],
        delete_child: deletedItems,
      };

      editChildSidebar(body)
        .then(() => {
          refetchSidebar?.();
        })
        .finally(() => {
          onCancel();
        });
    } else {
      body.image = value.image;
      body.name = value.name;
      body.type = value.type;
      body.child = value.child ?? [];
      body.section_id = section?.id ?? '';
      addSidebar(body)
        .then(() => {
          refetchSidebar?.();
        })
        .finally(() => {
          onCancel();
        });
    }
  };
  return (
    <ModalEID
      open={open}
      onCancel={onCancel}
      isLoading={isPendingAddSidebar || isPendingEditSidebar || isPendingEditChildSidebar}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <ModalEID.Header title={isEdit ? 'Edit Menu' : 'Add New Menu'} />
        <ModalEID.Body>
          <Form.Item name={'name'} label={<FormLabel label="Title" />}>
            <Input ref={inputRef} />
          </Form.Item>
          {isEdit ? null : (
            <Form.Item name={'type'} label={<FormLabel label="Type" />}>
              <Select options={SidebarTypeOptions} />
            </Form.Item>
          )}
          <Form.Item name={'image'} label={<FormLabel label="Icon" />}>
            <Select
              dropdownStyle={{ backgroundColor: '#fff' }}
              options={Object.keys(sidebarIcon).map((item) => ({
                label: capitalize(item),
                value: item,
              }))}
            />
          </Form.Item>
          <Form.List name="child">
            {(fields, { add, remove }) => (
              <>
                <h3 className="text-lg">Children: </h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="w-full flex justify-between items-end gap-10" key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      className={isEdit ? 'w-full' : 'w-1/2'}
                      label={<FormLabel label="Title" />}
                    >
                      <Input className="w-full" />
                    </Form.Item>
                    {isEdit ? null : (
                      <Form.Item
                        name={[name, 'type']}
                        className="w-1/2"
                        label={<FormLabel label="Type" />}
                      >
                        <Select className="w-full" options={SidebarTypeOptions} />
                      </Form.Item>
                    )}

                    <Form.Item {...restField} name={[name, 'id']} hidden>
                      <Input hidden />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'path']} hidden>
                      <Input hidden />
                    </Form.Item>
                    <ButtonDelete
                      type="button"
                      onClick={() => {
                        remove(name);
                        setDeletedItems([
                          ...deletedItems,
                          { id: form.getFieldValue('child')?.[name]?.id },
                        ]);
                      }}
                    />
                  </div>
                ))}
                <ButtonAdd
                  type="button"
                  size="small"
                  label="Add Child"
                  className="mt-2"
                  onClick={() => {
                    add();
                  }}
                />
              </>
            )}
          </Form.List>
        </ModalEID.Body>
        <ModalEID.Footer />
      </Form>
    </ModalEID>
  );
};

export default ModalConfigurationSidebar;
