import { useMessageContext } from '@/core/hooks/use-message-context';
import useModal from '@/core/hooks/use-modal';
import ButtonAdd from '@/shared/button/components/button-add';
import CardEID from '@/shared/card';
import InputSearch from '@/shared/form/input-search';
import FormLabel from '@/shared/form/label';
import LabelEID from '@/shared/header/label-eid';
import { ModalEID } from '@/shared/modal';
import ModalDelete from '@/shared/modal/modal-delete';
import { Table } from '@/shared/table';
import { flexRender } from '@tanstack/react-table';
import { Form, Input } from 'antd';
import { useState } from 'react';
import useFetchBrand from './hooks/fetch-brand';
import useMutationBrand from './hooks/mutation-brand';
import useTableBrand, { IBrand } from './hooks/use-table-brand';

const Admin = () => {
  const { openMessage } = useMessageContext();
  // Menggunakan custom hooks untuk data dan mutasi
  const { dataBrand, isLoadingBrand, refetchBrand } = useFetchBrand();
  const {
    addBrand,
    editBrand,
    deleteBrand,
    isPendingAddBrand,
    isPendingEditBrand,
    isPendingDeleteBrand,
  } = useMutationBrand();

  const [form] = Form.useForm<IBrand>();
  const { open, openModal, closeModal } = useModal();
  const {
    open: openDelete,
    openModal: openModalDelete,
    closeModal: closeModalDelete,
    message,
    setMessage,
  } = useModal();
  const [edit, setEdit] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const searchHandler = () => {
    refetchBrand();
  };

  const testingSuccessAlert = () => {
    openMessage({
      mode: 'success',
      title: 'Congratulations!',
      message: 'You have successfully submitted the application!',
    });
  };
  const testingUpdateAlert = () => {
    openMessage({
      mode: 'warning',
      title: 'Warning',
      message: 'warning berhasil!',
    });
  };
  const testingDeleteAlert = () => {
    openMessage({
      mode: 'danger',
      title: 'Delete',
      message: 'Delete Success',
    });
  };

  const addHandler = () => {
    setEdit(false);
    openModal();
  };
  const editHandler = (data: IBrand) => {
    setEdit(true);
    setSelectedBrand(data);
    form.setFieldsValue(data);
    openModal();
  };

  const deleteHandler = (data: IBrand) => {
    setMessage(`Are you sure want to delete BRAND: "${data.brand_name}"?`);
    openModalDelete();
  };
  const cancelHandler = () => {
    closeModal();
    form.resetFields();
  };

  const okHandler = async () => {
    try {
      const values = await form.validateFields();

      if (edit && selectedBrand) {
        await editBrand({ id: selectedBrand.id, name: values.brand_name });
      } else {
        await addBrand({ name: values.brand_name });
      }

      form.resetFields();
      closeModal();
      refetchBrand();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const { isTableData, table } = useTableBrand({
    deleteHandler,
    editHandler,
    dataSource: dataBrand,
  });
  return (
    <CardEID>
      <div className="w-full flex items-center justify-between">
        <LabelEID title="Brand" subTitle="List of data brand" />
        <div className="w-fit flex items-center gap-2">
          <InputSearch searchHandler={searchHandler} size="middle" />
          <ButtonAdd
            size="small"
            label="Success"
            className="py-2 px-3"
            onClick={testingSuccessAlert}
          />
          <ButtonAdd size="small" label="Edit" className="py-2 px-3" onClick={testingUpdateAlert} />
          <ButtonAdd
            size="small"
            label="Delete"
            className="py-2 px-3"
            onClick={testingDeleteAlert}
          />
        </div>
      </div>
      <Table
        data={table.getRowModel().rows}
        isLoading={isLoadingBrand}
        // selectedRow={0}
        pagination={{
          HasNext: false,
          HasPrevious: false,
          PageNumber: 1,
          PageSize: 10,
          TotalCount: 10,
          TotalPages: 1,
        }}
      >
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head
                  isNumber={header.id === 'no'}
                  isAction={header.id === 'action'}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                key={cell.id}
                isNumber={cell.column.id === 'no'}
                isAction={cell.column.id === 'action'}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table>

      {/* ✅ MODAL */}
      <ModalEID open={open} onCancel={cancelHandler} okText="Create" onOk={okHandler}>
        <ModalEID.Header
          title={edit ? 'Edit Brand Data ' : 'Create New Brand'}
          subtitle={
            edit
              ? 'Modify this form to update brand data'
              : 'Fill up this form to create new brand data'
          }
        />
        <ModalEID.Body>
          <Form layout="vertical" form={form}>
            <Form.Item name="brand_name" label={<FormLabel label="Brand Name" />}>
              <Input placeholder="Input brand name" />
            </Form.Item>
            <Form.Item name="id" hidden>
              <Input hidden />
            </Form.Item>
          </Form>
        </ModalEID.Body>
        <ModalEID.Footer />
      </ModalEID>

      <ModalDelete message={message} open={openDelete} onCancel={closeModalDelete} />
    </CardEID>
  );
};

export default Admin;
