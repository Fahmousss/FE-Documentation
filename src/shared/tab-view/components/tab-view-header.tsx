import { cn } from '@/core/utils/class.utils';
import { useTabViewHandlerContext, useTabViewValueContext } from '../hooks/tab-view-context';
import { TabViewHeaderProps } from '../utils/models';
import { TabViewSubTitleVariant, TabViewTitleVariant, TabViewVariant } from '../utils/variant';

const TabViewHeader = ({ item: { id, title, Icon, subtitle } }: TabViewHeaderProps) => {
  const { active, mode, isSubtitle } = useTabViewValueContext();
  const { setActive } = useTabViewHandlerContext();

  const isActive = active === id;

  const clickHandler = () => setActive(id);

  return (
    <div onClick={clickHandler} className={cn(TabViewVariant({ isActive, mode }))}>
      {Icon ? (
        <div
          className={cn(
            'p-2 rounded',
            isSubtitle ? (isActive ? 'bg-green-500' : 'bg-neutral-600') : 'bg-transparent p-0',
          )}
        >
          <Icon
            width={16}
            height={16}
            mode={isSubtitle ? (isActive ? 'white' : 'success') : isActive ? 'success' : 'grey'}
          />
        </div>
      ) : null}
      <div className="flex flex-col">
        <p className={cn(TabViewTitleVariant({ isActive }))}>{title}</p>
        {isSubtitle ? (
          subtitle ? (
            <p className={cn(TabViewSubTitleVariant({ isActive }))}>{subtitle}</p>
          ) : (
            <span>&nbsp;</span>
          )
        ) : null}
      </div>
    </div>
  );
};

export default TabViewHeader;
