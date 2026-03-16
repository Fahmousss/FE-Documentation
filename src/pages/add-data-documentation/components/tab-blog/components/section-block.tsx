import ButtonDelete from '@/shared/button/components/button-delete';
import FormLabel from '@/shared/form/label';
import RichTextEditor from '@/shared/rich-text-editor';
import UploadImage from '@/shared/upload-image';
import { DatePicker, Form, FormInstance, Input } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';
import { ChevronDown, ChevronUp, GripVertical, Plus } from 'lucide-react';
import { useState } from 'react';
import { makeCreator } from '../helpers';
import CreatorCard from './creator-card';

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
              const prevVal = prev.sections?.[field.name]?.title;
              const currVal = curr.sections?.[field.name]?.title;
              return prevVal !== currVal;
            }
          }>
            {() => {
              const title = form.getFieldValue(['sections', field.name, 'title']);
              return <span className="text-md font-bold">{title ? title : `Section ${index + 1}`}</span>;
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
          {/* Upload Foto Hero */}
          <div>
            <div className="[&_input[type='file']]:hidden">
              <Form.Item name={[field.name, 'heroImage']} noStyle shouldUpdate={true}>
                <UploadImage
                  label="Upload Foto Hero"
                  description="(Max image foto 1 mb)"
                />
              </Form.Item>
            </div>
          </div>

          {/* Date */}
          <div>
            <FormLabel label="Date" />
            <Form.Item name={[field.name, 'publishDate']} noStyle shouldUpdate={true}>
              <DatePicker
                className="w-full mt-1"
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </div>

          {/* Title */}
          <div>
            <FormLabel label="Title" />
            <Form.Item name={[field.name, 'title']} noStyle shouldUpdate={true}>
              <Input placeholder="Input Title" className="w-full mt-1" />
            </Form.Item>
          </div>

          {/* Description */}
          <div>
            <FormLabel label="Description" />
            <Form.Item name={[field.name, 'description']} noStyle shouldUpdate={true}>
              <Input.TextArea
                rows={3}
                placeholder="Write text here ..."
                className="w-full mt-1"
              />
            </Form.Item>
          </div>

          {/* Add Creator List */}
          <div>
            <Form.List name={[field.name, 'creators']}>
              {(creatorFields, { add, remove }) => (
                <>
                  {/* Creator header */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-bold border-l-4 border-[#00B887] pl-2">
                      Add Creator
                    </span>
                    <button
                      type="button"
                      onClick={() => add(makeCreator())}
                      className="w-6 h-6 rounded bg-[#01B763] text-white flex items-center justify-center hover:bg-[#1a9068] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Creator cards — grid 4 kolom */}
                  {creatorFields.length > 0 && (
                    <div className="p-4 pt-6 border border-gray-200 rounded-md grid grid-cols-4 gap-6">
                      {creatorFields.map((creatorField) => (
                        <CreatorCard
                          key={creatorField.key}
                          field={creatorField}
                          showDelete={creatorFields.length > 1}
                          onDelete={() => remove(creatorField.name)}
                          namePath={['sections', field.name, 'creators', creatorField.name]}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </Form.List>
          </div>

          {/* Content */}
          <div>
            <FormLabel label="Content" />
            <div className="mt-1 max-h-[500px] overflow-none">
              <Form.Item name={[field.name, 'content']} noStyle>
                <RichTextEditor />
              </Form.Item>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionBlock;
