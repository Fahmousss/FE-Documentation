import { IPreferencesItem, IPreferencesSection } from '@/pages/documentation/utils/model';

const uid = () => crypto.randomUUID();

export const makeItem = (i: number): IPreferencesItem => ({
  id: uid(),
  name: `Item ${i + 1}`,
  content: '',
  sortOrder: i,
});

export const makeSection = (i: number): IPreferencesSection => ({
  id: uid(),
  name: '',
  sortOrder: i,
  items: [makeItem(0), makeItem(1), makeItem(2)],
});
