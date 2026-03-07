import PaginationAction from './pagination-action';
import PaginationLabel from './pagination-label';
import PaginationWrapper from './pagination-wrapper';

const Pagination = () => {
  return (
    <PaginationWrapper>
      <PaginationLabel />
      <PaginationAction />
    </PaginationWrapper>
  );
};

export default Pagination;
