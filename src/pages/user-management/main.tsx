import useModal from '@/core/hooks/use-modal';
import useSelectedRow from '@/core/hooks/use-selected-row';
import BreadCrumbEID from '@/shared/breadcrumb';
import CardEID from '@/shared/card';
import LabelEID from '@/shared/header/label-eid';
import ModalDelete from '@/shared/modal/modal-delete';
import { Table } from '@/shared/table';
import { flexRender } from '@tanstack/react-table';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalResetPassword from './components/modal-reset-password';
import { useMutationUserManagement } from './hooks/mutation-user-management';
import useTableUserManagement from './hooks/use-table';
import useUserManagement from './hooks/use-user-management';
import { ITableUserManagement } from './utils/model';

const UserManagement = () => {
  const navigate = useNavigate();
  const selectedDataRef = useRef<string[]>();
  const usernameRef = useRef<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  const {
    open: openDelete,
    openModal: openModalDelete,
    closeModal: closeModalDelete,
    message,
    setMessage,
  } = useModal();

  const {
    open: openResetPassword,
    openModal: openModalResetPassword,
    closeModal: closeModalResetPassword,
    message: messageResetPassword,
    setMessage: setMessageResetPassword,
  } = useModal();

  const {
    open: openDeleteAll,
    message: messageDeleteAll,
    setMessage: setMessageDeleteAll,
    openModal: openModalDeleteAll,
    closeModal: closeModalDeleteAll,
  } = useModal();

  const { forgotPassword, deleteUserManagement, isPendingDeleteUserManagement } =
    useMutationUserManagement();

  const editHandler = (item: ITableUserManagement) => () => {
    navigate(`/management/user-role/edit/${item.id}`, {
      state: {
        data: item,
      },
    });
  };

  const {
    dataUserManagement,
    isLoadingUserManagement,
    pagination,
    refetchUserManagement,
    filters: { setPageNumber, setPageSize, setSearchTerm },
  } = useUserManagement();

  const deleteHandler = (item: ITableUserManagement) => {
    selectedDataRef.current = [item.id];
    setMessage(`Are you sure want to delete "Username: ${item.username}"?`);
    openModalDelete();
  };

  const onDeleteHandler = () => {
    if (selectedDataRef.current) {
      const body = selectedDataRef.current;

      deleteUserManagement(body).then(() => {
        closeModalDelete();
        refetchUserManagement();
      });
    }
  };

  const resetPasswordHandler = (username: string) => {
    setMessageResetPassword(`Are you sure want to reset password for username "${username}"?`);
    usernameRef.current = username;
    setNewPassword(null);
    setIsLoading(false);
    openModalResetPassword();
  };

  const onResetPassword = async () => {
    try {
      setIsLoading(true);
      const response = await forgotPassword({
        user_name: usernameRef.current as string,
      });

      if (response?.data) {
        setNewPassword(response.data);
      } else {
        throw new Error('No password data received');
      }
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandlerAll = () => {
    setMessageDeleteAll(`Are you sure want to delete ${selectedRow.length} data?`);
    openModalDeleteAll();
  };

  // Table Pagination
  const { table, isTableData } = useTableUserManagement({
    dataSource: dataUserManagement!,
    editHandler,
    deleteHandler,
    resetPasswordHandler,
    deleteHandlerAll,
  });

  const selectedRow = useSelectedRow(table);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClickAddUser = () => {
    navigate('/management/user-role/create');
  };

  const onDeleteAllHandler = () => {
    if (selectedRow.length > 0) {
      const body = selectedRow.map((item) => item.id);
      deleteUserManagement(body)
        .then(() => {
          refetchUserManagement();
        })
        .finally(() => {
          closeModalDeleteAll();
        });
    }
  };

  return (
    <>
      <BreadCrumbEID
        className="relative mb-2.5"
        items={[
          {
            label: 'Management',
            path: '#',
          },
          {
            label: 'User Role',
            path: '#',
          },
        ]}
      />
      <CardEID>
        {/* Content */}

        <LabelEID
          className="w-1/2"
          title="User List"
          subTitle="Track and monitoring user activity logins"
        />

        {/* Table */}
        <Table
          data={dataUserManagement}
          isLoading={false}
          pagination={pagination}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
        >
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head isAction={header.id === 'action'} key={header.id}>
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
                  <Table.Cell isAction={cell.column.id === 'action'} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <ModalDelete
          open={openDelete}
          onCancel={closeModalDelete}
          message={message}
          onOk={onDeleteHandler}
        />
        <ModalDelete
          open={openDeleteAll}
          onCancel={closeModalDeleteAll}
          message={messageDeleteAll}
          onOk={onDeleteAllHandler}
          isLoading={isPendingDeleteUserManagement}
        />
        <ModalResetPassword
          open={openResetPassword}
          newPassword={newPassword as string}
          isLoading={isLoading}
          onCancel={closeModalResetPassword}
          message={messageResetPassword}
          onOk={onResetPassword}
        />
      </CardEID>
    </>
  );
};

export default UserManagement;
