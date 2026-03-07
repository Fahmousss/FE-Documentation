import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import Typography from '@/shared/typography';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const NavbarTime = () => {
  const { colorList } = useColor();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center">
      <Typography.Display1
        style={{ color: colorList['text-secondary'] }}
        className={cn('font-normal')}
      >
        {`${dayjs(date).format('dddd, D MMM YYYY').toUpperCase()}`}
      </Typography.Display1>
      <svg
        className="mx-2"
        xmlns="http://www.w3.org/2000/svg"
        width="2"
        height="22"
        viewBox="0 0 2 22"
        fill="none"
      >
        <path d="M1 21.5L1 0.5" stroke={colorList.placeholder} strokeWidth="2" />
      </svg>
      <Typography.Display1 style={{ color: colorList['text-secondary'] }}>
        {dayjs(date).format('HH:mm:ss')}
      </Typography.Display1>
    </div>
  );
};

export default NavbarTime;
