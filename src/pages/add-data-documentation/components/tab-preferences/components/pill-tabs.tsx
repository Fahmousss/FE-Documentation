import { Form, FormInstance } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';
import { GripVertical } from 'lucide-react';
import React from 'react';
import { useDragList } from '../hooks/use-drag-list';

interface PillTabsProps {
  fields: FormListFieldData[];
  activeKey: number;
  onSelect: (key: number) => void;
  onAdd: () => void;
  onRemove: (name: number) => void;
  onMove: (from: number, to: number) => void;
  form: FormInstance;
  namePath: (string | number)[];
}

const PillTabs = ({
  fields,
  activeKey,
  onSelect,
  onAdd,
  onRemove,
  onMove,
  form,
  namePath,
}: PillTabsProps) => {
  const { onDragStart, onDragOver, onDragEnd } = useDragList(onMove);

  return (
    <div className="flex flex-wrap items-center mt-2">
      {fields.map((field, i) => (
        <div
          key={field.key}
          draggable
          onDragStart={() => onDragStart(i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDragEnd={onDragEnd}
          onClick={() => onSelect(field.key)}
          className={`
              flex items-center gap-1.5 px-4 py-1.5 rounded-t-lg text-sm cursor-pointer border transition-all select-none
              ${
                activeKey === field.key
                  ? 'bg-white text-[#01B763] border-[#01B763] shadow-sm'
                  : 'bg-white text-[#D0D1DD] border-[#D0D1DD] font-semibold hover:border-gray-300 hover:bg-gray-50'
              }
          `}
        >
          <GripVertical size={14} className="opacity-40" />
          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => {
              // Extract the item array for this level
              const getVal = (obj: any) =>
                namePath.reduce((acc, part) => acc?.[part], obj)?.[field.name]?.name;
              return getVal(prev) !== getVal(curr);
            }}
          >
            {() => {
              const itemName = form.getFieldValue([...namePath, field.name, 'name']);
              return <span className="font-medium">{itemName || `Item ${i + 1}`}</span>;
            }}
          </Form.Item>

          <span
            className={`ml-1 text-lg font-light leading-none hover:opacity-70 px-1
                ${activeKey === field.key ? 'text-[#01B763]' : 'text-[#D0D1DD]'}`}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(field.name);
            }}
          >
            ×
          </span>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="w-8 h-8 rounded-t-lg bg-white text-[#D0D1DD] flex items-center border-2 justify-center text-lg leading-none hover:text-[#01B763] hover:border-[#01B763] transition-colors shadow-sm"
      >
        +
      </button>
    </div>
  );
};

export default PillTabs;
