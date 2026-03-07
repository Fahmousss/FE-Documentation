import { sidebarIcon } from './constant';
import { ISidebar, ISidebarServer } from './models';

export const generateSidebar = (item: ISidebarServer): ISidebar => {
  return {
    ...item,
    Image: sidebarIcon[item.image],
    child: item.child.map((item) => ({
      ...item,
      Image: sidebarIcon[item.image!],
    })),
  };
};
