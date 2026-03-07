import useModal from '@/core/hooks/use-modal';
import { useAppDispatch } from '@/core/store/hooks';
import { CardConfiguration, LayoutEID, setConfiguration } from '@/core/store/slice/layout.slice';
import { cn } from '@/core/utils/class.utils';
// import BasicTable from "@/pages/tables/components/basic-table";
import ResponsiveChart from '@/shared/chart';
import FormLabel from '@/shared/form/label';
import IconGroup from '@/shared/icon/group';
import IconSetting from '@/shared/icon/setting';
import IconTrash from '@/shared/icon/trash';
import { ModalEID } from '@/shared/modal';
import { Dropdown, Form, Input, MenuProps, Select } from 'antd';
import { forwardRef, MouseEvent, useMemo } from 'react';
import { useParams } from 'react-router-dom';

interface CardGridEIDProps {
  item: LayoutEID;
  className?: string;
  deleteHandler?: () => void;
}

const CardGridEID = forwardRef<HTMLDivElement, CardGridEIDProps>(
  ({ item, className, deleteHandler }, ref) => {
    const dispatch = useAppDispatch();
    const { id: nameList } = useParams<{ id: string }>();
    const { i: idLayout } = item;
    const { open, openModal, closeModal } = useModal();
    const [form] = Form.useForm<CardConfiguration>();

    const settingHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.setFieldsValue({
        title: item.title,
        subtitle: item.subtitle,
        display: item.display,
      });
      openModal();
    };

    const onFinish = (values: CardConfiguration) => {
      const { title, subtitle, display } = values;
      dispatch(
        setConfiguration({
          nameList: nameList!,
          idLayout,
          subtitle,
          title,
          display,
        }),
      );

      closeModal();
    };

    const items: MenuProps['items'] = [
      {
        label: (
          <div className="noDrag flex justify-start items-center gap-1" onClick={deleteHandler}>
            <IconTrash mode={'danger'} width={14} height={14} />
            <p className="text-sm text-grey-200">Delete</p>
          </div>
        ),

        key: '0',
      },
      {
        label: (
          <div className="noDrag flex justify-start items-center gap-1" onClick={settingHandler}>
            <IconSetting mode={'grey'} width={14} height={14} />
            <p className="text-sm text-grey-200">Setting</p>
          </div>
        ),

        key: '1',
      },
    ];

    const content = useMemo(() => {
      const components = {
        chart: <ResponsiveChart />,
        table: <div className="w-full h-full">Table</div>,
        '': null,
      };

      return components[item.display] || null;
    }, [item.display]);
    return (
      <>
        <div
          ref={ref}
          className={cn('w-full h-full rounded-md p-2 flex flex-col gap-2', className)}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm">{item.subtitle}</p>
            </div>
            <Dropdown trigger={['click']} placement="bottomLeft" menu={{ items }}>
              <IconGroup
                mode={'grey'}
                width={16}
                height={16}
                className="noDrag hover:cursor-pointer"
              />
            </Dropdown>
          </div>
          {content}
        </div>
        <ModalEID width={500} open={open} onCancel={closeModal} className="noDrag">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <ModalEID.Header
              title="Settings Card Title and Subtitle"
              subtitle="Make changes to your card title."
            />
            <ModalEID.Body>
              <Form.Item name="title" label={<FormLabel label="Title" />}>
                <Input />
              </Form.Item>
              <Form.Item name="subtitle" label={<FormLabel label="Subtitle" />}>
                <Input />
              </Form.Item>
              <Form.Item name="display" label={<FormLabel label="Display" />}>
                <Select
                  options={[
                    {
                      label: 'Table',
                      value: 'table',
                    },
                    {
                      label: 'Chart',
                      value: 'chart',
                    },
                  ]}
                />
              </Form.Item>
            </ModalEID.Body>
            <ModalEID.Footer />
          </Form>
        </ModalEID>
      </>
    );
  },
);

export default CardGridEID;
