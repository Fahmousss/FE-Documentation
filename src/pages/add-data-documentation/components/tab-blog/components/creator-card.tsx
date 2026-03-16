import FormLabel from '@/shared/form/label';
import UploadImage from '@/shared/upload-image';
import { Form, Input } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';

interface CreatorCardProps {
  field: FormListFieldData;
  showDelete: boolean;
  onDelete: () => void;
  // namePath matches [blogFieldIndex, 'creators', creatorFieldIndex]
  namePath: (string | number)[];
}

const CreatorCard = ({ field, showDelete, onDelete, namePath }: CreatorCardProps) => {
  return (
    <div className="relative flex flex-col gap-2 border border-dashed border-gray-300 rounded-md p-3">
      {/* Delete button — melayang di pojok kanan atas */}
      {showDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white border-2 border-red-400 text-red-400 text-sm flex items-center justify-center hover:bg-red-50 z-10 leading-none"
        >
          ×
        </button>
      )}

      {/* Upload foto creator */}
      <div className="w-full [&_input[type='file']]:hidden">
        <Form.Item name={[field.name, 'photoUrl']} noStyle shouldUpdate={true}>
          <UploadImage
            label="Upload Foto"
            description="(Max image foto 1 mb)"
          />
        </Form.Item>
      </div>

      {/* Creator name */}
      <div className="w-full">
        <FormLabel label="Name" />
        <Form.Item name={[field.name, 'name']} noStyle shouldUpdate={true}>
          <Input placeholder="Input title" size="small" className="mt-1 w-full" />
        </Form.Item>
      </div>
    </div>
  );
};

export default CreatorCard;
