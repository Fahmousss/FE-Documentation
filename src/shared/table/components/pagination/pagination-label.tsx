import useColor from '@/core/hooks/use-color';
import Typography from '@/shared/typography';
import { useTableContext } from '../../hooks/table-context';

const PaginationLabel = () => {
  const { colorList } = useColor();
  const {
    selectedRow,
    pagination: { PageNumber, PageSize, TotalCount },
  } = useTableContext();
  const isSelect = selectedRow || selectedRow === 0;

  const totalCountLeft = TotalCount - PageSize * (PageNumber - 1);
  const totalDisplay = totalCountLeft > PageSize ? PageSize : totalCountLeft;
  return isSelect ? (
    <div className="flex gap-2 items-center">
      <Typography.H5
        style={{
          color: colorList['text-secondary'],
        }}
      >
        Selected: {selectedRow} / {totalDisplay} data
      </Typography.H5>
    </div>
  ) : (
    <div />
  );
};

export default PaginationLabel;
