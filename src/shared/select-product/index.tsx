import useProductsSelect from '@/pages/product/hooks/use-products-select';
import FormLabel from '@/shared/form/label';
import { Select } from 'antd';

interface SelectProductProps {
  value?: string;
  onChange: (value: string) => void;
}

const SelectProduct = ({ value, onChange }: SelectProductProps) => {
  const { dataProductsSelect, isLoadingProductsSelect } = useProductsSelect();
  const productOptions = dataProductsSelect?.map((p) => ({ label: p.name, value: p.id })) || [];

  return (
    <div>
      <FormLabel label="Product Name" className="ml-[0px]" />
      <Select
        placeholder="Select product name"
        style={{ width: '100%' }}
        className="mt-1"
        value={value}
        onChange={onChange}
        options={productOptions}
        loading={isLoadingProductsSelect}
        showSearch
        optionFilterProp="label"
      />
    </div>
  );
};

export default SelectProduct;
