import useModal from '@/core/hooks/use-modal';
import ButtonEID from '@/shared/button';
import CardEID from '@/shared/card';
import InputSearch from '@/shared/form/input-search';
import Label from '@/shared/header/label';
import { ModalEID } from '@/shared/modal';
import ModalDelete from '@/shared/modal/modal-delete';
import { Table } from '@/shared/table';
import { flexRender } from '@tanstack/react-table';
import { Form } from 'antd';
import { ChangeEvent, useCallback, useState } from 'react'; // ✅ hapus useEffect
import { IProducts, ProductsBody, ProductsForm } from './utils/model';
import useProductsPaginated from './hooks/use-products-paginated';
import useProductsMutation from './hooks/use-products-mutation';
import useTableProducts from './hooks/use-table-products';
import FormProducts from './components/form-products';

const Products = () => {
  const [form] = Form.useForm<ProductsForm>();
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
    dataProducts,
    refetchProducts,
    isLoadingProducts,
    pagination,
    filters: { setPageNumber, setPageSize, setSearchTerm },
  } = useProductsPaginated();

  const {
    createProducts,
    deleteProducts,
    updateProducts,
    isPendingCreateProducts,
    isPendingDeleteProducts,
    isPendingUpdateProducts,
  } = useProductsMutation();

  // ✅ Fix type: HTMLInputElement bukan ProductsBody
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  const addDataHandler = () => openModal();

  // ✅ Hapus openModal dari deps — fungsi dari useModal tidak stable, gunakan [] saja
  const editHandler = useCallback((data: IProducts) => {
    setIsEdit(true);
    openModal();
    form.setFieldsValue({
      id: data.id,
      name: data.name,
    });
  }, []);

  const deleteHandler = useCallback((data: IProducts) => {
    form.setFieldValue('id', data.id);
    setMessage(`Are you sure want to delete "${data.name}"?`);
    openModalDelete();
  }, []);

  const { isTableData, table } = useTableProducts({
    dataSource: dataProducts,
    editHandler,
    deleteHandler,
  });

  const onCancel = () => {
    closeModal();
    setIsEdit(false);
    form.resetFields();
  };

  const onFinish = (values: ProductsForm) => {
    try {
      const body: ProductsBody = {
        name: values.name,
      };

      let mutation: Promise<any>;

      if (isEdit) {
        mutation = updateProducts({ id: values.id, body });
      } else {
        mutation = createProducts(body);
      }

      mutation
        .then(() => {
          refetchProducts();
        })
        .finally(() => {
          onCancel();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteHandler = () => {
    const id = form.getFieldValue('id');
    deleteProducts(id)
      .then(() => {
        refetchProducts();
      })
      .finally(() => {
        closeModalDelete();
        form.resetFields();
      });
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="p-5 w-full h-full">
          <CardEID className="rounded-xl">
            <div className="flex items-center justify-between gap-4 ">
              <Label title="Products Table" subTitle="Data table information" />
              <div className="flex items-center gap-3 flex-shrink-0">
                <InputSearch size="large" searchHandler={searchHandler} />
                <ButtonEID
                  variant="primary"
                  size="small"
                  onClick={addDataHandler}
                  className="whitespace-nowrap"
                >
                  + Add Data
                </ButtonEID>
              </div>
            </div>
            <Table
              height="max-h-[63vh]"
              pagination={pagination}
              setPageNumber={setPageNumber}
              setPageSize={setPageSize}
              isLoading={isLoadingProducts}
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
                  <Table.Blank />
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
        isLoading={isPendingCreateProducts || isPendingUpdateProducts}
      >
        <ModalEID.Header
          title={isEdit ? 'Edit Products' : 'Add Products'}
          subtitle="This field is for desc terms of service"
        />
        <Form form={form} onFinish={onFinish} layout="vertical">
          <ModalEID.Body>
            <FormProducts />
          </ModalEID.Body>
          <ModalEID.Footer />
        </Form>
      </ModalEID>

      <ModalDelete
        open={openDelete}
        onCancel={closeModalDelete}
        message={message}
        onOk={onDeleteHandler}
        isLoading={isPendingDeleteProducts}
      />
    </>
  );
};

export default Products;