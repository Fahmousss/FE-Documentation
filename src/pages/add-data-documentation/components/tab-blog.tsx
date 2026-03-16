import useBlogsByProduct from '@/pages/documentation/hooks/use-blogs-by-product';
import SelectProduct from '@/shared/select-product';
import BlogsForm from './tab-blog/components/form/blogs-form';
import { makeBlog } from './tab-blog/helpers';

interface TabBlogProps {
  id?: string;
  productId: string | undefined;
  setProductId: (id: string | undefined) => void;
}

const TabBlog = ({ productId, setProductId }: TabBlogProps) => {
  const { dataBlogs, isLoadingBlogs } = useBlogsByProduct(productId);

  return (
    <div className="flex flex-col gap-4">
      {/* Product Name */}
      <SelectProduct value={productId} onChange={setProductId} />

      {productId && isLoadingBlogs ? (
        <div className="text-sm text-gray-500 py-4 italic">Loading existing blogs...</div>
      ) : (
        <BlogsForm
          key={productId || 'new'}
          productId={productId}
          initialBlogs={
            dataBlogs && dataBlogs.length > 0 ? dataBlogs : [makeBlog(0)]
          }
        />
      )}
    </div>
  );
};

export default TabBlog;
