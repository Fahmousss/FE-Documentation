import ButtonDelete from '@/shared/button/components/button-delete';
import FormLabel from '@/shared/form/label';
import RichTextEditor from '@/shared/rich-text-editor';
import { Form, FormInstance, Input } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { useState } from 'react';
import CardSection from '../../card-section';
import { makeItem } from '../helpers';
import PillTabs from './pill-tabs';

interface SectionBlockProps {
  field: FormListFieldData;
  index: number;
  showDelete: boolean;
  form: FormInstance;
  dragHandleProps: {
    draggable: boolean;
    onDragStart: () => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDelete: () => void;
}

const SectionBlock = ({
  field,
  index,
  showDelete,
  form,
  dragHandleProps,
  onDelete,
}: SectionBlockProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItemKey, setActiveItemKey] = useState<number>(-1);

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
      {/* Accordion Header */}
      <div className="flex items-center justify-between px-2 py-2 bg-secondary/10 border-gray-200 select-none">
        <div
          className="flex items-center gap-2 flex-1 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div
            {...dragHandleProps}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <GripVertical size={16} />
          </div>
          {collapsed ? (
            <ChevronDown size={14} className="text-gray-500" />
          ) : (
            <ChevronUp size={14} className="text-gray-500" />
          )}
          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => {
              const prevVal = prev.sections?.[field.name]?.name;
              const currVal = curr.sections?.[field.name]?.name;
              return prevVal !== currVal;
            }}
          >
            {() => {
              const name = form.getFieldValue(['sections', field.name, 'name']);
              return <span className="text-md font-bold">{name ? name : `Section ${index + 1}`}</span>;
            }}
          </Form.Item>
        </div>
        {showDelete && (
          <ButtonDelete
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        )}
      </div>

      {/* Accordion Body */}
      {!collapsed && (
        <div className="p-6 flex flex-col gap-4">
          {/* Section Name */}
          <div>
            <FormLabel label="Section Name" />
            <Form.Item name={[field.name, 'name']} noStyle shouldUpdate={true}>
              <Input placeholder="Input section" className="w-full mt-1" />
            </Form.Item>
          </div>

          <Form.List name={[field.name, 'items']}>
            {(itemFields, { add, remove, move }) => {
              // Ensure active menu key is valid
              if (activeItemKey === -1 && itemFields.length > 0) {
                setActiveItemKey(itemFields[0].key);
              } else if (itemFields.length > 0 && !itemFields.find((f) => f.key === activeItemKey)) {
                setActiveItemKey(itemFields[0].key);
              }

              return (
                <>
                  <PillTabs
                    fields={itemFields}
                    activeKey={activeItemKey}
                    onSelect={setActiveItemKey}
                    onAdd={() => add(makeItem(itemFields.length))}
                    onRemove={remove}
                    onMove={move}
                    form={form}
                    namePath={['sections', field.name, 'items']}
                  />

                  {itemFields.map((itemField) => (
                    <div
                      key={itemField.key}
                      style={{ display: activeItemKey === itemField.key ? 'block' : 'none' }}
                    >
                      <CardSection className="mt-[-16px] rounded-t-none">
                        {/* Item Name */}
                        <div className="mb-4">
                          <FormLabel label="Item Name" />
                          <Form.Item name={[itemField.name, 'name']} noStyle shouldUpdate={true}>
                            <Input placeholder="Input item name" className="w-full mt-1" />
                          </Form.Item>
                        </div>

                        {/* Content */}
                        <div>
                          <FormLabel label="Content" />
                          <div className="mt-1 max-h-[500px] overflow-none">
                            <Form.Item name={[itemField.name, 'content']} noStyle>
                              <RichTextEditor />
                            </Form.Item>
                          </div>
                        </div>
                      </CardSection>
                    </div>
                  ))}
                </>
              );
            }}
          </Form.List>
        </div>
      )}
    </div>
  );
};

export default SectionBlock;
