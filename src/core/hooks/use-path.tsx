import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePath() {
  const location = useLocation();

  const path = useMemo(() => {
    return location.pathname.split('/').filter((path) => path !== '');
  }, [location.pathname]);

  return path;
}
