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
import { IDocumentationItem } from "./utils/model";
import { Table } from "@/shared/table";

const Documentations = () => {
    const navigate = useNavigate();

    // hooks params 
    const { id } = useParams();

    // hook modal
    const {
        open: openDelete,
        openModal: openModalDelete,
        closeModal: closeModalDelete,
        message,
        setMessage,
    } = useModal();

    // ✅ handler edit & create
    const addOrEditDataHandler = (id?: string) => {
        if (id) {
            navigate(`/Documentation/EditDataDocumentation/${id}`);
            return;
        }
        navigate('/Documentation/AddDataDocumentation');
    };

    // ✅ handler delete — buka modal dan set pesan
    const deleteHandler = (item: IDocumentationItem) => {
        setMessage(`Apakah kamu yakin ingin menghapus "${item.name}"?`);
        openModalDelete();
    };

    // hook fetch documentation data
    const {
        dataDocumentations,
        refetchDocumentations,
        pagination,
        isLoadingDocumentations,
        filters: { setPageNumber, setPageSize, setSearchTerm }
    } = useDocumentationsPaginated(id);

    console.log(dataDocumentations);
    

    // ✅ hook table — passing edit & delete handler
    const { table, isTableData } = useTableDocumentations({
        dataSource: dataDocumentations,
        editHandler: (item) => addOrEditDataHandler(item.id), // ✅ kirim UUID
        deleteHandler: (item) => deleteHandler(item),
    });

    // handler search
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPageNumber(1);
    };

    // ✅ handler confirm delete (dipanggil saat klik OK di modal)
    const onDeleteHandler = () => {
        // panggil mutation delete di sini jika ada
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
                            <InputSearch
                                size="large"
                                searchHandler={searchHandler}
                            />

                            <ButtonEID
                                variant="primary"
                                size="small"
                                onClick={() => addOrEditDataHandler()} // ✅ tanpa id = create
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
                        isLoading={isLoadingDocumentations} // ✅ dari hook
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
                isLoading={false} // ✅ ganti dengan isPending dari mutation delete jika ada
            />
        </div>
    );
};

export default Documentations;