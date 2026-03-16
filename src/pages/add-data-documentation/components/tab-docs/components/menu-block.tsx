import CardSection from '../../card-section';
import FormLabel from '@/shared/form/label';
import RichTextEditor from '@/shared/rich-text-editor';
import { Form, FormInstance, Input } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';
import { useState, useEffect } from 'react';
import PillTabs from './pill-tabs';
import { makeSubmenu } from '../helpers';

interface MenuBlockProps {
  field: FormListFieldData;
  form: FormInstance;
  namePath: (string | number)[]; // The path to the parent matching 'menus' array: e.g. ['sections', sectionIndex]
}

const MenuBlock = ({ field, form, namePath }: MenuBlockProps) => {
  const currentPath = [...namePath, 'menus', field.name];
  const [activeSubmenuKey, setActiveSubmenuKey] = useState<number>(-1);

  return (
    <CardSection className="mt-[-16px] rounded-t-none">
      {/* Menu Name */}
      <div className="mb-4">
        <FormLabel label="Menu" />
        <Form.Item name={[field.name, 'name']} noStyle>
          <Input placeholder="Input menu" className="w-full mt-1" />
        </Form.Item>
      </div>

      {/* Submenus Form.List */}
      <Form.List name={[field.name, 'submenus']}>
        {(submenuFields, { add, remove, move }) => {
          // ensure active key is valid
          if (activeSubmenuKey === -1 && submenuFields.length > 0) {
            setActiveSubmenuKey(submenuFields[0].key);
          } else if (submenuFields.length > 0 && !submenuFields.find((f) => f.key === activeSubmenuKey)) {
             setActiveSubmenuKey(submenuFields[0].key);
          }

          return (
            <>
              <PillTabs
                fields={submenuFields}
                activeKey={activeSubmenuKey}
                onSelect={setActiveSubmenuKey}
                onAdd={() => {
                  add(makeSubmenu(submenuFields.length));
                }}
                onRemove={remove}
                onMove={move}
                form={form}
                namePath={[...currentPath, 'submenus']}
              />
              <CardSection className="rounded-t-none">
                {submenuFields.map((subField) => (
                  <div
                    key={subField.key}
                    style={{ display: activeSubmenuKey === subField.key ? 'block' : 'none' }}
                  >
                    <div className="mb-4">
                      <FormLabel label="Submenu" />
                      <Form.Item name={[subField.name, 'name']} noStyle>
                        <Input placeholder="Input submenu" className="w-full mt-1" />
                      </Form.Item>
                    </div>

                    <div>
                      <FormLabel label="Content" />
                      <div className="mt-1 max-h-[500px] overflow-none">
                        {/* We use Form.Item to handle the content state */}
                        <Form.Item name={[subField.name, 'content']} noStyle>
                          <RichTextEditor />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                ))}
              </CardSection>
            </>
          );
        }}
      </Form.List>
    </CardSection>
  );
};

export default MenuBlock;
