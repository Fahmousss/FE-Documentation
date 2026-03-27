import useBlogsMutation from '@/pages/documentation/hooks/use-blogs-mutation';
import { IBlogItem, IBlogRequest } from '@/pages/documentation/utils/model';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { makeBlog } from '../../helpers';
import { useDragList } from '../../hooks/use-drag-list';
import SectionBlock from '../section-block';

export interface BlogsFormValues {
  sections: IBlogItem[];
}

interface BlogsFormProps {
  productId: string | undefined;
  initialBlogs: IBlogItem[];
}

const BlogsForm = ({ productId, initialBlogs }: BlogsFormProps) => {
  const [form] = Form.useForm<BlogsFormValues>();
  const { updateBlog, isPendingUpdateBlog } = useBlogsMutation();

  useEffect(() => {
    form.setFieldsValue({ sections: initialBlogs });
  }, [initialBlogs, form]);

  const onFinish = async (values: BlogsFormValues) => {
    if (!productId) return;

    const sections = values.sections || [];
    const formattedSections = sections.map((s, sIdx) => ({
      ...s,
      sortOrder: sIdx, // Re-index section
    }));

    const body: IBlogRequest = {
      sections: formattedSections.map((b) => ({
        id: b.id,
        title: b.title || '',
        // Reverse dayjs formatted date back to ISO 8601 strings
        publishDate:
          b.publishDate && dayjs.isDayjs(b.publishDate)
            ? b.publishDate.toISOString()
            : typeof b.publishDate === 'string'
              ? b.publishDate
              : '',
        description: b.description || '',
        content: b.content || '',
        heroImageUrl: typeof b.heroImage === 'string' ? b.heroImage : '',
        creators: (b.creators || []).map((c) => ({
          name: c.name || '',
          photoUrl: typeof c.photoUrl === 'string' ? c.photoUrl : '',
        })),
        sortOrder: b.sortOrder,
      })),
    };

    console.log(body);
    await updateBlog({ body, productId });
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
      initialValues={{ sections: initialBlogs }}
      className="flex flex-col gap-4"
    >
      <Form.List name="sections">
        {/* Antd Form.List specific render prop */}
        {(fields, { add, remove }) => (
          <>
            {/* Section header */}
            <div className="flex items-center justify-between mt-[-4px]">
              <span className="text-left text-sm font-bold whitespace-pre-line pl-2 border-l-4 border-[#00B887]">
                Section
              </span>
              <button
                type="button"
                onClick={() => add(makeBlog(fields.length))}
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
        )}
      </Form.List>

      {/* Submit Button */}
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={isPendingUpdateBlog || !productId}
          className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors"
        >
          {isPendingUpdateBlog ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Form>
  );
};

export default BlogsForm;
