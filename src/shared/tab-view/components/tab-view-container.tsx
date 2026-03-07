import { TabViewContainerProps } from '../utils/models';

const TabViewContainer = ({ children }: TabViewContainerProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export default TabViewContainer;
