import { IBlogCreator, IBlogItem } from '@/pages/documentation/utils/model';

const uid = () => crypto.randomUUID();

export const makeCreator = (): IBlogCreator => ({ name: '', photoUrl: '' });

export const makeBlog = (i: number): IBlogItem => ({
  id: uid(),
  name: `Section ${i + 1}`,
  title: '',
  publishDate: '', // Can be kept empty for Day.js usage
  description: '',
  content: '',
  heroImage: null,
  creators: [makeCreator()],
  sortOrder: i,
});
