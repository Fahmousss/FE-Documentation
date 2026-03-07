import { Table } from '..';

const TableBlank = () => {
  return (
    <Table.Row>
      <Table.Cell className="text-center" colSpan={999}>
        No Data
      </Table.Cell>
    </Table.Row>
  );
};

export default TableBlank;
