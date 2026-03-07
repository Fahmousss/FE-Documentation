import { cn } from '@/core/utils/class.utils';
import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { Dayjs } from 'dayjs';
import { forwardRef, useEffect, useRef, useState } from 'react';

type CustomProps = RangePickerProps;

const CustomRangePicker = forwardRef<any, CustomProps>(
  ({ value, onChange, allowClear = true, className, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const [selectTrigger, setSelectTrigger] = useState(false);
    const [changeTrigger, setChangeTrigger] = useState(false);
    const onOpenChange = (open: boolean) => {
      if (!open && !selectTrigger) setChangeTrigger(true);
      setOpen(open);
    };
    const onChangeShadowPicker = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
      onChange(date, dateString);
      setSelectTrigger(true);
      setOpen(false);
    };
    const onWrapperClick = () => {
      if (changeTrigger) {
        setChangeTrigger(false);
        return;
      }
      setOpen(true);
    };

    useEffect(() => {
      if (selectTrigger) {
        setChangeTrigger(false);
        setSelectTrigger(false);
      }
    }, [selectTrigger]);

    useEffect(() => {
      function detectOutside(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const wrapper = divRef.current;
        const popup = document.querySelector('.ant-picker-dropdown');

        const clickedInsideWrapper = wrapper?.contains(e.target as Node);
        const clickedInsidePopup = popup?.contains(e.target as Node);

        if (!clickedInsideWrapper && !clickedInsidePopup) {
          setChangeTrigger(false);
        }
      }

      document.addEventListener('click', detectOutside);
      return () => document.removeEventListener('click', detectOutside);
    }, []);

    useEffect(() => {
      if (divRef.current) {
        setHeight(divRef.current.offsetHeight);
      }
    }, []);

    useEffect(() => {
      if (!divRef.current) return;
      setHeight(divRef.current.offsetHeight);
    }, [divRef]);
    return (
      <div style={{ position: 'relative' }}>
        {/* {!value ? ( */}
        <div
          ref={divRef}
          onClick={onWrapperClick}
          className="border w-fit rounded px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
        >
          <CalendarOutlined />
        </div>
        {/* ) : (
          <DatePicker
            ref={ref}
            {...props}
            value={value}
            onChange={onChange}
            allowClear={allowClear}
            className={cn('w-full', className)}
          />
        )} */}
        <DatePicker.RangePicker
          {...props}
          ref={ref}
          open={open}
          value={value}
          onOpenChange={onOpenChange}
          allowClear={allowClear}
          className={cn('w-full', className)}
          onChange={onChangeShadowPicker}
          style={{
            position: 'absolute',
            top: height * 0.7,
            left: 0,
            opacity: 0,
            zIndex: -1,
            width: 0,
            height: 0,
          }}
        />
      </div>
    );
  },
);

export default CustomRangePicker;
