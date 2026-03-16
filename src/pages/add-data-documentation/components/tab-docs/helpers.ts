import {
  IDocumentationMenu,
  IDocumentationSection,
  IDocumentationSubmenu,
} from '@/pages/documentation/utils/model';

export const uid = () => crypto.randomUUID();

export const makeSubmenu = (i: number): IDocumentationSubmenu => ({
  id: uid(),
  name: `Submenu ${i + 1}`,
  content: '',
  sortOrder: i,
});

export const makeMenu = (i: number): IDocumentationMenu => ({
  id: uid(),
  name: `Menu ${i + 1}`,
  sortOrder: i,
  submenus: [makeSubmenu(0), makeSubmenu(1), makeSubmenu(2)],
});

export const makeSection = (i: number): IDocumentationSection => ({
  id: uid(),
  name: '',
  sortOrder: i,
  menus: [makeMenu(0), makeMenu(1), makeMenu(2)],
});
