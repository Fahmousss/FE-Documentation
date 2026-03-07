import ButtonEID from '@/shared/button';
import Arrow from '@/shared/icon/arrow';
import { InputNumber } from 'antd';
import { useTableContext } from '../../hooks/table-context';

const PaginationSwitch = () => {
  const {
    pagination: { PageNumber, TotalPages },
    setPageNumber,
  } = useTableContext();
  const nextHandler = () => {
    setPageNumber?.(PageNumber + 1);
  };
  const prevHandler = () => {
    setPageNumber?.(PageNumber - 1);
  };
  return (
    <div className="flex items-center gap-2">
      <ButtonEID size="icon" variant="secondary" onClick={prevHandler} className="size-8">
        <Arrow className="-rotate-90" width={16} height={16} mode="grey" />
      </ButtonEID>
      <div className="flex items-center gap-2">
        <InputNumber
          value={PageNumber}
          min={0}
          max={TotalPages}
          className="size-8"
          controls={false}
        />
        <p>/</p>
        <p>{TotalPages}</p>
      </div>
      <ButtonEID
        size="icon"
        variant="secondary"
        onClick={nextHandler}
        className="dark:bg-transparent size-8"
      >
        <Arrow className="rotate-90" width={16} height={16} mode="grey" />
      </ButtonEID>
    </div>
  );
};

export default PaginationSwitch;

