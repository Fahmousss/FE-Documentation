import { useCallback, useState } from 'react';

export default function useDateFilter() {
  const [Start, setStart] = useState<string>();
  const [End, setEnd] = useState<string>();
  const [type, setType] = useState<string>();

  const setDateRange = useCallback((params: { Start: string; End: string; type: string }) => {
    setStart(params.Start);
    setEnd(params.End);
    setType(params.type);
  }, []);

  return {
    Start,
    End,
    type,
    filters: {
      setDateRange,
      setStart,
      setEnd,
      setType,
    },
  };
}
