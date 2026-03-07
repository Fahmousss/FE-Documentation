import { limitList } from '@/core/constant/config.constant';
import { Select } from 'antd';
import { useTableContext } from '../../hooks/table-context';

const PaginationSize = () => {
  const {
    setPageSize,
    pagination: { PageSize },
  } = useTableContext();
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="paginator">
        <p className="text-grey-500 text-base font-normal">Shows</p>
      </label>
      <Select
        dropdownStyle={{ backgroundColor: '#fff' }}
        id="paginator"
        size="middle"
        onChange={(val) => {
          setPageSize?.(Number(val));
        }}
        className="min-w-16"
        value={PageSize}
      >
        {limitList.map((item, index) => (
          <Select.Option key={`optionPaginator-${index}`} value={item} className="p-1 text-sm">
            {item}
          </Select.Option>
        ))}
      </Select>
      <p className="text-grey-500 text-base font-normal">entries</p>
    </div>
  );
};

export default PaginationSize;
