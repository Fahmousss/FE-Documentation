import { Input, Select } from 'antd';
import { ChangeEvent } from 'react';
import { DropdownSearchProps } from './types';

const DropdownSearch = ({
  inputChangeHandler,
  selectChangeHandler,
  options,
}: DropdownSearchProps) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    inputChangeHandler?.(target.value);
  };

  return (
    <div className="flex items-center">
      <Input
        addonBefore={
          <Select
            className="rounded-r-none placeholder:text-neutral-50"
            defaultValue={'All Columns'}
            options={options}
            onChange={selectChangeHandler}
          />
        }
        placeholder="Search Here"
        onChange={changeHandler}
      />
    </div>
  );
};

export default DropdownSearch;
