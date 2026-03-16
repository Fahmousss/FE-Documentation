import usePreferencesMutation from '@/pages/documentation/hooks/use-preferences-mutation';
import { IPreferencesRequest, IPreferencesSection } from '@/pages/documentation/utils/model';
import { Form } from 'antd';
import { useEffect } from 'react';
import { makeSection } from '../../helpers';
import { useDragList } from '../../hooks/use-drag-list';
import SectionBlock from '../section-block';

export interface PreferencesFormValues {
  sections: IPreferencesSection[];
}

interface PreferencesFormProps {
  productId: string | undefined;
  initialSections: IPreferencesSection[];
}

const PreferencesForm = ({ productId, initialSections }: PreferencesFormProps) => {
  const [form] = Form.useForm<PreferencesFormValues>();
  const { bulkUpdatePreferences, isPendingBulkUpdatePreferences } = usePreferencesMutation();

  useEffect(() => {
    form.setFieldsValue({ sections: initialSections });
  }, [initialSections, form]);

  const onFinish = async (values: PreferencesFormValues) => {
    if (!productId) return;

    const sections = values.sections || [];
    const formattedSections = sections.map((s, sIdx) => ({
      ...s,
      sortOrder: sIdx, // Re-index section
      items: (s.items || []).map((item, itemIdx) => ({
        ...item,
        sortOrder: itemIdx, // Re-index item
      })),
    }));

    // Map IPreferencesSection -> IPreferencesRequestSection
    const body: IPreferencesRequest = {
      sections: formattedSections.map((sec) => ({
        id: sec.id,
        name: sec.name,
        sortOrder: sec.sortOrder,
        items: sec.items.map((item) => ({
          id: item.id,
          itemName: item.name, // Local payload "name" maps to specific "itemName" field for the API
          content: item.content,
          sortOrder: item.sortOrder,
        })),
      })),
    };

    await bulkUpdatePreferences({ body, productId });
  };

  const { onDragStart, onDragOver, onDragEnd } = useDragList((from, to) => {
    const sections = form.getFieldValue('sections') || [];
    const newSections = [...sections];
    const [moved] = newSections.splice(from, 1);
    newSections.splice(to, 0, moved);
    form.setFieldsValue({ sections: newSections });
  });

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ sections: initialSections }}
      className="flex flex-col gap-4"
    >
      <Form.List name="sections">
        {(fields, { add, remove }) => {
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
                {fields.map((field, idx) => (
                  <SectionBlock
                    key={field.key}
                    field={field}
                    index={idx}
                    showDelete={fields.length > 1}
                    form={form}
                    dragHandleProps={{
                      draggable: true,
                      onDragStart: () => onDragStart(idx),
                      onDragOver: (e) => onDragOver(e, idx),
                      onDragEnd,
                    }}
                    onDelete={() => remove(field.name)}
                  />
                ))}
              </div>
            </>
          );
        }}
      </Form.List>

      {/* Submit Button */}
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={isPendingBulkUpdatePreferences || !productId}
          className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors"
        >
          {isPendingBulkUpdatePreferences ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Form>
  );
};

export default PreferencesForm;
