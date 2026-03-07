import { useMessageContext } from '@/core/hooks/use-message-context';
import useModal from '@/core/hooks/use-modal';
import { useUrlTab } from '@/core/hooks/use-url-tab';
import { ITest } from '@/core/models/xample-dashboard.models';
import { cn } from '@/core/utils/class.utils';
import ButtonAdd from '@/shared/button/components/button-add';
import ButtonDownload from '@/shared/button/components/button-download';
import ButtonUpload from '@/shared/button/components/button-upload';
import CardEID from '@/shared/card';
import InputSearch from '@/shared/form/input-search';
import FormLabel from '@/shared/form/label';
import Label from '@/shared/header/label';
import { ModalEID } from '@/shared/modal';
import ModalDelete from '@/shared/modal/modal-delete';
import { Table } from '@/shared/table';
import { flexRender } from '@tanstack/react-table';
import { DatePicker, Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import useFetchTest from './hooks/use-fetch';
import useTableTest from './hooks/use-table';

const { RangePicker } = DatePicker;

const VALID_TABS = ['basic', 'address', 'job'] as const;
type TabType = (typeof VALID_TABS)[number];

const TAB: { label: string; value: TabType }[] = [
  { label: 'Basic Info', value: 'basic' },
  { label: 'Address', value: 'address' },
  { label: 'Job Info', value: 'job' },
];

const Dashboard = () => {
  const [form] = Form.useForm<ITest>();
  const { tab: selectedSection, changeTab } = useUrlTab(VALID_TABS, 'basic');

  const { openMessage } = useMessageContext();

  const [selectedData, setSelectedData] = useState<ITest>({} as ITest);

  const { open, openModal, closeModal, message, setMessage } = useModal();
  const { open: openView, openModal: openModalView, closeModal: closeModalView } = useModal();
  const { open: openEdit, openModal: openModalEdit, closeModal: closeModalEdit } = useModal();

  const { dataTest, isLoadingTest, pagination, filter, Start, End } = useFetchTest();
  const { setPageNumber, setPageSize, setStart, setEnd, setSearchTerm } = filter;

  const { isTableData, table } = useTableTest({
    dataSource: dataTest,
    deleteHandler,
    viewHandler,
    editHandler,
    bulkActionHandler: deleteManyHandler,
    section: selectedSection,
  });

  const selectedRow = table.getSelectedRowModel().flatRows.map((row) => row.original);

  function viewHandler(data: ITest) {
    openModalView();
    setSelectedData(data);
  }

  function editHandler(data: ITest) {
    openModalEdit();
    setSelectedData(data);
    form.setFieldsValue(data);
  }

  function deleteHandler(data: ITest) {
    setSelectedData(data);
    setMessage(`Are you sure want to delete "First Name: ${data.first_name}"?`);
    openModal();
  }

  function deleteManyHandler(list: ITest[]) {
    setMessage(`Are you sure want to delete ${list.length} items?`);
    openModal();
  }

  const onDelete = () => {
    openMessage({
      mode: 'danger',
      title: 'Delete',
      message: 'Delete Success',
    });
    closeModal();
  };

  const onEdit = () => {
    openMessage({
      mode: 'warning',
      title: 'Edit',
      message: 'Edit Success',
    });
    closeModalEdit();
  };

  return (
    <div className="flex flex-col gap-2">
      <CardEID>
        {/* ✅ TAB SECTION (Clean & Reusable) */}
        <div className="flex items-center">
          {TAB.map((section) => (
            <button
              key={section.value}
              onClick={() => changeTab(section.value)}
              className={cn(
                'transition-all duration-300 font-Inter text-md py-1 px-4 rounded-full',
                {
                  'font-semibold text-white bg-green-500': selectedSection === section.value,
                  'font-normal text-neutral-600': selectedSection !== section.value,
                },
              )}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* ✅ TOP SECTION */}
        <div className="w-full flex justify-between">
          <Label title="Title Table" subTitle="Data table information" />

          <div className="w-full flex gap-2 items-center">
            <InputSearch searchHandler={(e) => setSearchTerm(e.target.value)} />

            <RangePicker
              value={[dayjs(Start), dayjs(End)]}
              onChange={(dates) => {
                if (dates) {
                  setStart(dates[0]?.format('YYYY-MM-DD HH:mm:ss'));
                  setEnd(dates[1]?.format('YYYY-MM-DD HH:mm:ss'));
                }
              }}
              size="large"
            />

            <ButtonDownload />
            <ButtonUpload />
            <ButtonAdd label="Add Data" onClick={openModalEdit} />
          </div>
        </div>

        {/* ✅ TABLE */}
        <Table
          isLoading={isLoadingTest}
          isTableData={isTableData}
          selectedRow={selectedRow.length}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          pagination={pagination}
        >
          <Table.Header>
            {table.getHeaderGroups().map((hg) => (
              <Table.Row key={hg.id}>
                {hg.headers.map((header) => (
                  <Table.Head
                    key={header.id}
                    isNumber={header.column.columnDef.id === 'no'}
                    isAction={header.column.columnDef.id === 'action'}
                    isSelect={header.column.columnDef.id === 'select'}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    isNumber={cell.column.columnDef.id === 'no'}
                    isAction={cell.column.columnDef.id === 'action'}
                    isSelect={cell.column.columnDef.id === 'select'}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* ✅ DELETE MODAL */}
        <ModalDelete open={open} message={message} onCancel={closeModal} onOk={onDelete} />

        {/* ✅ VIEW MODAL */}
        <ModalEID open={openView} onCancel={closeModalView}>
          <ModalEID.Header title="View Data" />
          <ModalEID.Body className="flex-row gap-10">
            <div className="w-full flex flex-col">
              <p className="text-lg text-grey-500">First Name:</p>
              <p className="text-lg text-grey-500">Last Name:</p>
              <p className="text-lg text-grey-500">Email:</p>
              <p className="text-lg text-grey-500">Age:</p>
            </div>
            <div className="w-full flex flex-col">
              <p className="text-lg text-grey-700">{selectedData.first_name}</p>
              <p className="text-lg text-grey-700">{selectedData.last_name}</p>
              <p className="text-lg text-grey-700">{selectedData.email}</p>
              <p className="text-lg text-grey-700">{selectedData.age}</p>
            </div>
          </ModalEID.Body>
        </ModalEID>

        {/* ✅ EDIT MODAL */}
        <ModalEID width={1000} onOk={onEdit} open={openEdit} onCancel={closeModalEdit}>
          <ModalEID.Header title="Edit Data" />
          <ModalEID.Body>
            <Form form={form} layout="vertical" className="w-full flex flex-wrap gap-8">
              <Form.Item
                name="first_name"
                className="w-[calc(50%-32px)]"
                label={<FormLabel label="First Name" />}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="last_name"
                className="w-[calc(50%-32px)]"
                label={<FormLabel label="Last Name" />}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                className="w-[calc(50%-32px)]"
                label={<FormLabel label="Email" />}
              >
                <Input type="email" size="large" />
              </Form.Item>
              <Form.Item
                name="age"
                className="w-[calc(50%-32px)]"
                label={<FormLabel label="Age" />}
              >
                <InputNumber size="large" className="w-full" />
              </Form.Item>
              <Form.Item
                name="address"
                className="w-[calc(50%-32px)]"
                label={<FormLabel label="Address" />}
              >
                <Input.TextArea rows={3} size="large" />
              </Form.Item>
            </Form>
          </ModalEID.Body>
          <ModalEID.Footer />
        </ModalEID>
      </CardEID>
    </div>
  );
};

export default Dashboard;
