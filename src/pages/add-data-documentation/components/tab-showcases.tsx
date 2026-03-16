import useShowcasesByProduct from '@/pages/documentation/hooks/use-showcases-by-product';
import SelectProduct from '@/shared/select-product';
import ShowcaseForm from './tab-showcases/components/form/showcases-form';

interface TabShowcaseProps {
  id?: string;
  productId: string | undefined;
  setProductId: (id: string | undefined) => void;
}

const TabShowcase = ({ id, productId, setProductId }: TabShowcaseProps) => {
  const { dataShowcases, isLoadingShowcases } = useShowcasesByProduct(productId);
  console.log(dataShowcases);

  return (
    <div className="flex flex-col gap-4">
      {/* Product Name */}
      <SelectProduct value={productId} onChange={setProductId} />

      {productId && isLoadingShowcases ? (
        <div className="text-sm text-gray-500 py-4 italic">Loading existing showcases...</div>
      ) : (
        <ShowcaseForm
          key={productId || 'new'}
          productId={productId}
          id={id}
          initialShowcases={dataShowcases}
        />
      )}
    </div>
  );
};

export default TabShowcase;
