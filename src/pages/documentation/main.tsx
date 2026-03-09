import useModal from "@/core/hooks/use-modal";
import ButtonEID from "@/shared/button";
import CardEID from "@/shared/card";
import InputSearch from "@/shared/form/input-search";
import Label from "@/shared/header/label";
import ModalDelete from "@/shared/modal/modal-delete";
import useDocumentationsPaginated from "./hooks/use-documentations-paginated";
import useTableDocumentations from "./hooks/use-table-documentations";
import { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flexRender } from "@tanstack/react-table";
import { IProductItem } from "./utils/model";
import { Table } from "@/shared/table";

const Documentations = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        open: openDelete,
        openModal: openModalDelete,
        closeModal: closeModalDelete,
        message,
        setMessage,
    } = useModal();

    const addOrEditDataHandler = (id?: string) => {
        if (id) {
            navigate(`/Documentation/EditDataDocumentation/${id}`);
            return;
        }
        navigate('/Documentation/AddDataDocumentation');
    };

    const deleteHandler = (item: IProductItem) => {
        setMessage(`Apakah kamu yakin ingin menghapus "${item.name}"?`);
        openModalDelete();
    };

    const {
        dataDocumentations,
        pagination,
        isLoadingDocumentations,
        filters: { setPageNumber, setPageSize, setSearchTerm },
    } = useDocumentationsPaginated(id);

    const { table, isTableData } = useTableDocumentations({
        dataSource: dataDocumentations,
        editHandler: (item) => addOrEditDataHandler(item.id),
        deleteHandler: (item) => deleteHandler(item),
    });

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPageNumber(1);
    };

    const onDeleteHandler = () => {
        closeModalDelete();
    };

    return (
        <div className="w-full flex flex-col">
            <div className="p-5 w-full h-full">
                <CardEID className="rounded-xl">
                    <div className="flex items-center justify-between gap-4">
                        <Label
                            title="Documentations Table"
                            subTitle="Data table information"
                        />
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <InputSearch size="large" searchHandler={searchHandler} />
                            <ButtonEID
                                variant="primary"
                                size="small"
                                onClick={() => addOrEditDataHandler()}
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
                        isLoading={isLoadingDocumentations}
                        isTableData={isTableData}
                    >
                        <Table.Header>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Table.Row key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Table.Head
                                            key={header.id}
                                            isAction={header.column.id === "action"}
                                            isNumber={header.column.id === "no"}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
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
                                                isAction={cell.column.id === "action"}
                                                isNumber={cell.column.id === "no"}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
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

            <ModalDelete
                open={openDelete}
                onCancel={closeModalDelete}
                message={message}
                onOk={onDeleteHandler}
                isLoading={false}
            />
        </div>
    );
};

export default Documentations;