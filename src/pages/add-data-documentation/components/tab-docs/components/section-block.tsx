import ButtonDelete from '@/shared/button/components/button-delete';
import FormLabel from '@/shared/form/label';
import { Form, FormInstance, Input } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { useState } from 'react';
import { makeMenu } from '../helpers';
import MenuBlock from './menu-block';
import PillTabs from './pill-tabs';

interface SectionBlockProps {
  field: FormListFieldData;
  index: number;
  showDelete: boolean;
  dragHandleProps: {
    draggable: boolean;
    onDragStart: () => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDelete: () => void;
  form: FormInstance;
}

const SectionBlock = ({
  field,
  index,
  showDelete,
  dragHandleProps,
  onDelete,
  form,
}: SectionBlockProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState<number>(-1);

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
              return (
                <span className="text-md font-bold">{name ? name : `Section ${index + 1}`}</span>
              );
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

          {/* Menus Form.List */}
          <Form.List name={[field.name, 'menus']}>
            {(menuFields, { add, remove, move }) => {
              // Ensure active menu key is valid
              if (activeMenuKey === -1 && menuFields.length > 0) {
                setActiveMenuKey(menuFields[0].key);
              } else if (
                menuFields.length > 0 &&
                !menuFields.find((f) => f.key === activeMenuKey)
              ) {
                setActiveMenuKey(menuFields[0].key);
              }

              return (
                <>
                  <PillTabs
                    fields={menuFields}
                    activeKey={activeMenuKey}
                    onSelect={setActiveMenuKey}
                    onAdd={() => add(makeMenu(menuFields.length))}
                    onRemove={remove}
                    onMove={move}
                    form={form}
                    namePath={['sections', field.name, 'menus']}
                  />

                  {menuFields.map((menuField) => (
                    <div
                      key={menuField.key}
                      style={{ display: activeMenuKey === menuField.key ? 'block' : 'none' }}
                    >
                      <MenuBlock
                        field={menuField}
                        form={form}
                        namePath={['sections', field.name]}
                      />
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
