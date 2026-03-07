import FormLabel from '@/shared/form/label';
import { ModalEID } from '@/shared/modal';
import { ModalActionProps } from '@/shared/modal/types';
import { Form, Input, InputRef } from 'antd';
import { useEffect, useRef } from 'react';
import { useSectionContext } from '../../hooks/use-section-context';
import useSectionMutation, { IFormSection } from '../../hooks/use-section-mutation';
import { useSidebarContext } from '../../hooks/use-sidebar-context';

const ModalSection = ({ closeModal, open }: ModalActionProps) => {
  const { section } = useSectionContext();
  const isEdit = !!section;
  const inputRef = useRef<InputRef>(null);
  const { addSection, editSection, isPendingAddSection, isPendingEditSection } =
    useSectionMutation();
  const { refetchSection } = useSidebarContext();

  const [form] = Form.useForm<IFormSection>();

  const onCancel = () => {
    closeModal();
    form.resetFields();
  };

  const onFinish = (values: IFormSection) => {
    if (isEdit) {
      editSection(values)
        .then(() => {
          refetchSection();
        })
        .finally(() => {
          onCancel();
        });
    } else {
      addSection(values)
        .then(() => {
          refetchSection();
        })
        .finally(() => {
          onCancel();
        });
    }
  };

  useEffect(() => {
    if (open && isEdit)
      form.setFieldsValue({
        id: section.id,
        name: section.name,
      });
  }, [isEdit, open]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
      });
    }
  }, [ref]);
  return (
    <ModalEID
      open={open}
      onCancel={onCancel}
      isLoading={isPendingAddSection || isPendingEditSection}
      panelRef={ref}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <ModalEID.Header title={isEdit ? 'Edit Section' : 'Add New Section'} />
        <ModalEID.Body>
          <Form.Item name={'name'} label={<FormLabel label="Title" />} rules={[{ required: true }]}>
            <Input ref={inputRef} />
          </Form.Item>
          <Form.Item name={'id'} hidden>
            <Input hidden />
          </Form.Item>
        </ModalEID.Body>
        <ModalEID.Footer />
      </Form>
    </ModalEID>
  );
};

export default ModalSection;
