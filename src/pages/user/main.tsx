import useModal from '@/core/hooks/use-modal';
import ButtonEID from '@/shared/button';
import CardEID from '@/shared/card';
import InputSearch from '@/shared/form/input-search';
import Header from '@/shared/header';
import Label from '@/shared/header/label';
import { ModalEID } from '@/shared/modal';
import ModalDelete from '@/shared/modal/modal-delete';
import { Table } from '@/shared/table';
import { flexRender } from '@tanstack/react-table';
import { Form } from 'antd';
import { ChangeEvent, useState } from 'react';
import FormUser from './components/form-user';
import useTableUser from './hooks/use-table-user';
import useUserMutation from './hooks/use-user-mutation';
import useUserPaginated from './hooks/use-user-paginated';
import { IUser, UserBody, UserForm } from './utils/model';

const User = () => {
  const [form] = Form.useForm<UserForm>();
  const id = Form.useWatch('id', form);
  const [isEdit, setIsEdit] = useState(false);
  const { open, openModal, closeModal } = useModal();
  const {
    open: openDelete,
    openModal: openModalDelete,
    closeModal: closeModalDelete,
    message,
    setMessage,
  } = useModal();
  const {
    dataUser,
    refetchUser,
    isLoadingUser,
    pagination,
    filters: { setPageNumber, setPageSize, setSearchTerm },
  } = useUserPaginated();
  const {
    createUser,
    deleteUser,
    updateUser,
    isPendingCreateUser,
    isPendingDeleteUser,
    isPendingUpdateUser,
  } = useUserMutation();
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const addDataHandler = () => openModal();
  const editHandler = (data: IUser) => {
    form.setFieldsValue({
      id: data.id,
      nrp: data.nrp,
      role_id: data.role_id,
      name: data.name,
    });
    setIsEdit(true);
    openModal();
  };
  const deleteHandler = (data: IUser) => {
    form.setFieldValue('id', data.id);
    setMessage(`Are you sure want to delete this name “${data.name}”?`);
    openModalDelete();
  };
  const { isTableData, table } = useTableUser({
    dataSource: dataUser,
    editHandler,
    deleteHandler,
  });
  const onCancel = () => {
    setIsEdit(false);
    form.resetFields();
    closeModal();
  };
  const onCancelDelete = () => {
    form.resetFields();
    closeModalDelete();
  };
  const onFinish = (values: UserForm) => {
    try {
      const body: UserBody = {
        id: values.id,
        nrp: values.nrp,
        role_id: values.role_id,
        name: values.name,
      };

      let mutation: Promise<any>;

      if (isEdit) {
        mutation = updateUser({ id: values.id, body });
      } else {
        mutation = createUser(body);
      }
      mutation
        .then(() => {
          refetchUser();
        })
        .finally(() => {
          onCancel();
        });
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteHandler = () => {
    try {
      deleteUser(id)
        .then(() => {
          refetchUser();
        })
        .finally(() => {
          onCancelDelete();
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col">
        <Header title="Management User" />
        <div className="p-5 w-full h-full">
          <CardEID className="rounded-xl">
            <div className="flex items-center justify-between">
              <Label title="User Table" subTitle="User Information Table" />
              <div className="flex items-center gap-3">
                <InputSearch size="large" searchHandler={searchHandler} />
                <ButtonEID variant="primary" size="small" onClick={addDataHandler}>
                  + Add Data
                </ButtonEID>
              </div>
            </div>
            <Table
              height="max-h-[63vh]"
              pagination={pagination}
              setPageNumber={setPageNumber}
              setPageSize={setPageSize}
              // isLoading={isLoadingUser || !dataUser}
              isLoading={false}
              isTableData={isTableData}
            >
              <Table.Header>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.Row key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Table.Head
                        key={header.id}
                        isAction={header.column.id === 'action'}
                        isNumber={header.column.id === 'no'}
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
                {isTableData ? (
                  table.getRowModel().rows.map((row) => (
                    <Table.Row key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <Table.Cell
                          key={cell.id}
                          isAction={cell.column.id === 'action'}
                          isNumber={cell.column.id === 'no'}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))
                ) : (
                  <Table.Blank
                  //  plural="Users" singular="User" addDataHandler={addDataHandler}
                  />
                )}
              </Table.Body>
            </Table>
          </CardEID>
        </div>
      </div>
      <ModalEID
        open={open}
        onCancel={onCancel}
        width={700}
        isLoading={isPendingCreateUser || isPendingUpdateUser}
      >
        <ModalEID.Header
          title={isEdit ? 'Edit User' : 'Add User'}
          subtitle="This field is for desc terms of service"
        />
        <Form form={form} onFinish={onFinish} layout="vertical">
          <ModalEID.Body>
            <FormUser />
          </ModalEID.Body>
          <ModalEID.Footer />
        </Form>
      </ModalEID>
      <ModalDelete
        open={openDelete}
        onCancel={onCancelDelete}
        message={message}
        onOk={onDeleteHandler}
        isLoading={isPendingDeleteUser}
      />
    </>
  );
};

export default User;
