import useDocumentationsByProduct from '@/pages/documentation/hooks/use-documentations-by-product';
import SelectProduct from '@/shared/select-product';
import DocsForm from './tab-docs/components/form/docs-form';
import { makeSection } from './tab-docs/helpers';

interface TabDocsProps {
  id?: string;
  productId: string | undefined;
  setProductId: (id: string | undefined) => void;
}

const TabDocs = ({ id, productId, setProductId }: TabDocsProps) => {
  const { dataDocumentations, isLoadingDocumentations } = useDocumentationsByProduct(productId);

  return (
    <div className="flex flex-col gap-4">
      {/* Product Name */}
      <SelectProduct value={productId} onChange={setProductId} />

      {productId && isLoadingDocumentations ? (
        <div className="text-sm text-gray-500 py-4 italic">Loading existing documentation...</div>
      ) : (
        <DocsForm
          key={productId || 'new'}
          productId={productId}
          initialSections={
            dataDocumentations && dataDocumentations.length > 0
              ? dataDocumentations
              : [makeSection(0)]
          }
        />
      )}
    </div>
  );
};

export default TabDocs;
