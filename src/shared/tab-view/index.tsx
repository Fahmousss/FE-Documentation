import { useEffect, useState } from 'react';
import TabViewContainer from './components/tab-view-container';
import TabViewContentContainer from './components/tab-view-content-container';
import TabViewHeaderContainer from './components/tab-view-header-container';
import { TabViewHandlerContext, TabViewValueContext } from './hooks/tab-view-context';
import { TabViewProps } from './utils/models';
import { TabViewMode } from './utils/variant';

const TabView = ({ activeTabs, items, mode = 'default', currentTabs }: TabViewProps) => {
  const [active, setActive] = useState<string>();
  const [modeComp, setModeComp] = useState<TabViewMode>();

  useEffect(() => {
    if (items?.some((item) => item.subtitle !== undefined)) {
      setModeComp('subTitle');
    } else {
      setModeComp(mode);
    }
    if (active !== '') {
      setActive(activeTabs ? activeTabs : items?.[0].id);
    }
  }, [items]);

  useEffect(() => {
    currentTabs?.(active as string);
  }, [active]);

  const isSubtitle = items?.some((item) => item.subtitle !== undefined);

  return (
    <TabViewHandlerContext.Provider value={{ setActive }}>
      <TabViewValueContext.Provider
        value={{ items, mode: modeComp, active: active as string, isSubtitle }}
      >
        <TabViewContainer>
          <TabViewHeaderContainer />
          <TabViewContentContainer />
        </TabViewContainer>
      </TabViewValueContext.Provider>
    </TabViewHandlerContext.Provider>
  );
};

export default TabView;
