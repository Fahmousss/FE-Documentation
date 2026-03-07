import { cn } from '@/core/utils/class.utils';
import { useTabViewValueContext } from '../hooks/tab-view-context';
import { TabViewHeaderContainerVariant } from '../utils/variant';
import TabViewHeader from './tab-view-header';

const TabViewHeaderContainer = () => {
  const { items, mode } = useTabViewValueContext();
  return (
    <div className={cn(TabViewHeaderContainerVariant({ mode }), 'rounded-md')}>
      {items?.map((item) => <TabViewHeader key={`tab-view-header-${item.id}`} item={item} />)}
    </div>
  );
};

export default TabViewHeaderContainer;
