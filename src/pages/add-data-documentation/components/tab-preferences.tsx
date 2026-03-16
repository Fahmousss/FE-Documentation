import usePreferencesByProduct from '@/pages/documentation/hooks/use-preferences-by-product';
import SelectProduct from '@/shared/select-product';
import PreferencesForm from './tab-preferences/components/form/preferences-form';
import { makeSection } from './tab-preferences/helpers';

interface TabPreferencesProps {
  id?: string;
  productId: string | undefined;
  setProductId: (id: string | undefined) => void;
}

const TabPreferences = ({ productId, setProductId }: TabPreferencesProps) => {
  const { dataPreferences, isLoadingPreferences } = usePreferencesByProduct(productId);

  return (
    <div className="flex flex-col gap-4">
      {/* Product Name */}
      <SelectProduct value={productId} onChange={setProductId} />

      {productId && isLoadingPreferences ? (
        <div className="text-sm text-gray-500 py-4 italic">Loading existing preferences...</div>
      ) : (
        <PreferencesForm
          key={productId || 'new'}
          productId={productId}
          initialSections={
            dataPreferences && dataPreferences.length > 0 ? dataPreferences : [makeSection(0)]
          }
        />
      )}
    </div>
  );
};

export default TabPreferences;
