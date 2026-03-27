import useShowcasesMutation from '@/pages/documentation/hooks/use-showcases-mutation';
import { IShowcaseItem, IShowcaseRequest } from '@/pages/documentation/utils/model';
import FormLabel from '@/shared/form/label';
import RichTextEditor from '@/shared/rich-text-editor';
import UploadImage from '@/shared/upload-image';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CardSection from '../../../card-section';
import { makeShowcase } from '../../helpers';
import PillTabs from '../pill-tabs';

export interface ShowcasesFormValues {
  showcases: IShowcaseItem[];
}

interface ShowcaseFormProps {
  productId: string | undefined;
  id?: string;
  initialShowcases?: IShowcaseItem[];
}

const ShowcaseForm = ({ productId, id, initialShowcases }: ShowcaseFormProps) => {
  const [form] = Form.useForm<ShowcasesFormValues>();
  const [activeShowcaseKey, setActiveShowcaseKey] = useState<number>(-1);

  const { bulkUpdateShowcase, isPendingBulkUpdateShowcase } = useShowcasesMutation();

  useEffect(() => {
    const formattedInitial = (initialShowcases || [makeShowcase(0)]).map((s) => ({
      ...s,
      publishDate: s.publishDate ? dayjs(s.publishDate) : null,
    }));
    form.setFieldsValue({ showcases: formattedInitial });
  }, [initialShowcases, form]);

  const onFinish = async (values: ShowcasesFormValues) => {
    if (!productId) return;
    const showcases = values.showcases || [];

    const body: IShowcaseRequest = {
      items: showcases.map((s, idx) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        mediaUrl: typeof s.photo === 'string' ? s.photo : '',
        publishDate: s.publishDate ? dayjs(s.publishDate).format('YYYY-MM-DD') : '',
        content: s.content,
        sortOrder: idx, // Ensure strict sort order mapped to UI
      })),
    };

    await bulkUpdateShowcase({ body, productId });
  };

  const isPending = isPendingBulkUpdateShowcase;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        showcases: (initialShowcases || [makeShowcase(0)]).map((s) => ({
          ...s,
          publishDate: s.publishDate ? dayjs(s.publishDate) : null,
        })),
      }}
      className="flex flex-col gap-4"
    >
      {/* Showcase header */}
      <div className="flex items-center justify-between mt-[-4px]">
        <span className="text-left text-sm font-bold whitespace-pre-line pl-2 border-l-4 border-[#00B887]">
          Detail Showcase
        </span>
      </div>

      <Form.List name="showcases">
        {(showcaseFields, { add, remove, move }) => {
          // ensure active key is valid
          if (activeShowcaseKey === -1 && showcaseFields.length > 0) {
            setActiveShowcaseKey(showcaseFields[0].key);
          } else if (
            showcaseFields.length > 0 &&
            !showcaseFields.find((f) => f.key === activeShowcaseKey)
          ) {
            setActiveShowcaseKey(showcaseFields[0].key);
          }

          return (
            <div className="flex flex-col gap-3 mt-[-8px]">
              <PillTabs
                fields={showcaseFields}
                activeKey={activeShowcaseKey}
                onSelect={setActiveShowcaseKey}
                onAdd={() => add(makeShowcase(showcaseFields.length))}
                onRemove={remove}
                onMove={move}
                form={form}
                namePath={['showcases']}
              />

              <CardSection className="rounded-t-none mt-[-12px]">
                {showcaseFields.map((field) => (
                  <div
                    key={field.key}
                    style={{ display: activeShowcaseKey === field.key ? 'block' : 'none' }}
                  >
                    {/* Name — Used explicitly for the tab naming, which isn't currently represented in the payload aside from ID */}
                    <div className="mb-4">
                      <FormLabel label="Tab Name" />
                      <Form.Item name={[field.name, 'name']} noStyle>
                        <Input placeholder="Input Tab Name" className="w-full mt-1" />
                      </Form.Item>
                    </div>

                    {/* Upload Foto */}
                    <div className="mb-4">
                      <div className="[&_input[type='file']]:hidden">
                        <Form.Item name={[field.name, 'photo']} noStyle shouldUpdate={true}>
                          <UploadImage />
                        </Form.Item>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mb-4">
                      <FormLabel label="Date" />
                      <Form.Item name={[field.name, 'publishDate']} noStyle>
                        <DatePicker
                          className="w-full mt-1"
                          placeholder="dd-mm-yyyy"
                          format="DD-MM-YYYY"
                        />
                      </Form.Item>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <FormLabel label="Title" />
                      <Form.Item name={[field.name, 'title']} noStyle>
                        <Input placeholder="Input Title" className="w-full mt-1" />
                      </Form.Item>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <FormLabel label="Description" />
                      <Form.Item name={[field.name, 'description']} noStyle>
                        <Input.TextArea
                          rows={3}
                          placeholder="Write text here ..."
                          className="w-full mt-1"
                        />
                      </Form.Item>
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
                ))}
              </CardSection>
            </div>
          );
        }}
      </Form.List>

      {/* Submit Button */}
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={isPending || !productId}
          className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors"
        >
          {isPending ? 'Saving...' : id ? 'Update' : 'Save'}
        </button>
      </div>
    </Form>
  );
};

export default ShowcaseForm;
