import { useEffect, useState } from 'react';
import { DEFAULT_DEBOUNCE_DELAY } from '../constant/config.constant';

export default function useDebounce<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, DEFAULT_DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
}
