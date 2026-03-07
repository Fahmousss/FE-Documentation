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
import FormRole from './components/form-role';
import useRoleMutation from './hooks/use-role-mutation';
import useRolePaginated from './hooks/use-role-paginated';
import useTableRole from './hooks/use-table-role';
import { IRole, RoleBody, RoleForm } from './utils/model';
import { mapRoleBodyToForm, mapRoleFormToBody } from './utils/utils';

const Role = () => {
  const [form] = Form.useForm<RoleForm>();
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
    dataRole,
    refetchRole,
    pagination,
    isLoadingRole,
    filters: { setPageNumber, setPageSize, setSearchTerm },
  } = useRolePaginated();
  const {
    createRole,
    deleteRole,
    updateRole,
    isPendingCreateRole,
    isPendingDeleteRole,
    isPendingUpdateRole,
  } = useRoleMutation();
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const addDataHandler = () => openModal();
  const editHandler = (data: IRole) => {
    const formValue: RoleForm = mapRoleBodyToForm({
      id: data.id,
      name: data.name,
      permissions: data.permissions,
    });
    form.setFieldsValue(formValue);
    setIsEdit(true);
    openModal();
  };
  const deleteHandler = (data: IRole) => {
    form.setFieldValue('id', data.id);
    setMessage(`Are you sure want to delete this role “${data.name}”?`);
    openModalDelete();
  };
  const { isTableData, table } = useTableRole({
    dataSource: dataRole,
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
  const onFinish = (values: RoleForm) => {
    try {
      const body: RoleBody = mapRoleFormToBody(values);

      let mutation: Promise<any>;

      if (isEdit) {
        mutation = updateRole({ id: values.id, body });
      } else {
        mutation = createRole(body);
      }
      mutation
        .then(() => {
          refetchRole();
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
      deleteRole(id)
        .then(() => {
          refetchRole();
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
      <div className="w-full flex flex-col gap-4">
        <Header title="Management Role" />
        <div className="w-full h-full">
          <CardEID className="rounded-xl">
            <div className="flex items-center justify-between">
              <Label title="Role Table" subTitle="Role Information Table" />
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
              // isLoading={isLoadingRole || !dataRole}
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
                  //  plural="Roles" singular="Role" addDataHandler={addDataHandler}
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
        width={1000}
        isLoading={isPendingCreateRole || isPendingUpdateRole}
      >
        <ModalEID.Header
          title={isEdit ? 'Edit Role' : 'Add Role'}
          subtitle="This field is for desc terms of service"
        />
        <Form form={form} onFinish={onFinish} layout="vertical">
          <ModalEID.Body>
            <FormRole />
          </ModalEID.Body>
          <ModalEID.Footer />
        </Form>
      </ModalEID>
      <ModalDelete
        open={openDelete}
        onCancel={onCancelDelete}
        message={message}
        onOk={onDeleteHandler}
        isLoading={isPendingDeleteRole}
      />
    </>
  );
};

export default Role;
