import { IShowcaseItem } from '@/pages/documentation/utils/model';

export const uid = () => crypto.randomUUID();

export const makeShowcase = (i: number): IShowcaseItem => ({
  id: uid(),
  name: `Showcase ${i + 1}`,
  photo: null,
  publishDate: null,
  title: '',
  description: '',
  content: '',
  sortOrder: i,
});
