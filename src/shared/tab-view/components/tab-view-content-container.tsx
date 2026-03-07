import { useMemo } from 'react';
import { useTabViewValueContext } from '../hooks/tab-view-context';

const TabViewContentContainer = () => {
  const { items, active } = useTabViewValueContext();

  const children = useMemo(() => {
    return items?.find((item) => item.id === active)?.content;
  }, [active]);

  return <div className="text-grey-800">{children}</div>;
};

export default TabViewContentContainer;
