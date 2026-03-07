import { Input } from 'antd';
import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { InputSearchProps } from './types';

const InputSearch = ({
  searchHandler,
  className,
  debounceDelay,
  placeholder = 'Search',
  ...props
}: InputSearchProps & { debounceDelay?: number }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<any>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      e.target.select();
    }
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    searchHandler?.(e);
  };

  const handleClear = () => {
    setValue('');
    // Trigger empty event manually
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    searchHandler?.(event);
    // Focus kembali ke input
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <Input
        {...props}
        ref={inputRef}
        value={value}
        size="large"
        placeholder={placeholder}
        className={`
          !bg-slate-100 !border border-slate-300/80 hover:border-green-600 focus:border-green-600
          text-slate-700 !placeholder:text-red-500 selection:border-red-500
          !rounded-lg text-[14px] min-w-32 py-[9px] 2xl:min-w-60 max-w-full
          transition-all duration-200 ease-in-out !shadow-none
          selection:bg-slate-300 selection:text-inherit ${className}
        `}
        prefix={
          <div className="pr-1">
            <Search size={17} className="text-slate-500/80" />
          </div>
        }
        suffix={
          <div className="w-6 flex items-center justify-center">
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="
                  p-[3px] rounded-full bg-slate-200 hover:bg-slate-300/85
                  text-slate-500 transition-all duration-200
                  focus:outline-none focus:ring-0
                "
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            )}
          </div>
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputSearch;
