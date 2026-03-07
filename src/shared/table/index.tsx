import Paginator from './components/pagination';
import TableBlank from './components/table-blank';
import TableBody from './components/table-body';
import TableCaption from './components/table-caption';
import TableCell from './components/table-cell';
import TableFooter from './components/table-footer';
import TableHead from './components/table-head';
import TableHeader from './components/table-header';
import TableLoader from './components/table-loader';
import TableRoot from './components/table-root';
import TableRow from './components/table-row';
import { TableComponent } from './utils/models';

// Main Table
(TableRoot as TableComponent).Header = TableHeader;
(TableRoot as TableComponent).Body = TableBody;
(TableRoot as TableComponent).Footer = TableFooter;

// Body Table
(TableRoot as TableComponent).Row = TableRow;
(TableRoot as TableComponent).Head = TableHead;
(TableRoot as TableComponent).Cell = TableCell;
(TableRoot as TableComponent).Caption = TableCaption;
(TableRoot as TableComponent).Pagination = Paginator;

// Case
(TableRoot as TableComponent).Blank = TableBlank;
(TableRoot as TableComponent).Loader = TableLoader;

const Table = TableRoot as TableComponent;

export { Table };
