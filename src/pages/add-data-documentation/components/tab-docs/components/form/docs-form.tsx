import useDocumentationsMutation from '@/pages/documentation/hooks/use-documentations-mutation';
import { IDocumentationRequest, IDocumentationSection } from '@/pages/documentation/utils/model';
import { Form } from 'antd';
import { useEffect } from 'react';
import { makeSection } from '../../helpers';
import { useDragList } from '../../hooks/use-drag-list';
import SectionBlock from '../section-block';

export interface DocsFormValues {
  sections: IDocumentationSection[];
}

interface DocsFormProps {
  productId: string | undefined;
  initialSections: IDocumentationSection[];
}

const DocsForm = ({ productId, initialSections }: DocsFormProps) => {
  const [form] = Form.useForm<DocsFormValues>();
  const { bulkUpdateDocumentations, isPendingBulkUpdateDocumentations } =
    useDocumentationsMutation();

  useEffect(() => {
    form.setFieldsValue({ sections: initialSections });
  }, [initialSections, form]);

  const onFinish = async (values: DocsFormValues) => {
    if (!productId) return;

    const sections = values.sections || [];
    const formattedSections = sections.map((s, sIdx) => ({
      ...s,
      sortOrder: sIdx,
      menus: (s.menus || []).map((m, mIdx) => ({
        ...m,
        sortOrder: mIdx,
        submenus: (m.submenus || []).map((sub, subIdx) => ({
          ...sub,
          sortOrder: subIdx,
        })),
      })),
    }));

    const body: IDocumentationRequest = {
      product_id: productId,
      sections: formattedSections,
    };

    console.log(body);
    await bulkUpdateDocumentations({ body, productId });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ sections: initialSections }}
      className="flex flex-col gap-4"
    >
      <Form.List name="sections">
        {(fields, { add, remove, move }) => {
          return <SectionsList fields={fields} add={add} remove={remove} move={move} form={form} />;
        }}
      </Form.List>

      {/* Submit Button */}
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={isPendingBulkUpdateDocumentations || !productId}
          className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors"
        >
          {isPendingBulkUpdateDocumentations ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Form>
  );
};

const SectionsList = ({ fields, add, remove, move, form }: any) => {
  const { onDragStart, onDragOver, onDragEnd } = useDragList(move);

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mt-[-4px]">
        <span className="text-left text-sm font-bold whitespace-pre-line pl-2 border-l-4 border-[#00B887]">
          Section
        </span>
        <button
          type="button"
          onClick={() => add(makeSection(fields.length))}
          className="w-6 h-6 rounded bg-[#01B763] text-white flex items-center justify-center text-lg leading-none hover:bg-[#1a9068] transition-colors"
        >
          +
        </button>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-3 mt-[-8px]">
        {fields.map((field: any, idx: number) => (
          <SectionBlock
            key={field.key}
            field={field}
            index={idx}
            showDelete={fields.length > 1}
            dragHandleProps={{
              draggable: true,
              onDragStart: () => onDragStart(idx),
              onDragOver: (e: React.DragEvent) => onDragOver(e, idx),
              onDragEnd,
            }}
            onDelete={() => remove(field.name)}
            form={form}
          />
        ))}
      </div>
    </>
  );
};

export default DocsForm;
