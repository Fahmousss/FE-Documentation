import useColor from '@/core/hooks/use-color';
import useUploadFile from '@/core/hooks/use-upload-file';
import { normFile } from '@/core/utils/download.utils';
import CardEID from '@/shared/card';
import FormLabel from '@/shared/form/label';
import Label from '@/shared/header/label';
import {
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Upload,
} from 'antd';

const InputPage = () => {
  const { colorList } = useColor();
  const { fileList, handleBeforeUpload, handleRemove, handleChange } = useUploadFile();
  return (
    <CardEID>
      <Label title="Input Section" subTitle="Example input variants" />
      <Form colon={false} layout="vertical" className="flex items-center gap-8">
        <div className="w-1/3 flex flex-col gap-4 h-full">
          <Form.Item label={<FormLabel label="Input" />}>
            <Input />
          </Form.Item>
          <Form.Item label={<FormLabel label="Input Password" />}>
            <Input.Password />
          </Form.Item>
          <Form.Item label={<FormLabel label="Input Text Area" />}>
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item label={<FormLabel label="Input Number" />}>
            <InputNumber type="number" className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Select" />}>
            <Select
              className="w-full"
              options={[
                {
                  label: 'Value 1',
                  value: '1',
                },
                {
                  label: 'Value 2',
                  value: '2',
                },
                {
                  label: 'Value 3',
                  value: '3',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name={'file_path'}
            label={<FormLabel label={`Document Attachment`} />}
            valuePropName={'filelist'}
            getValueFromEvent={normFile}
          >
            <Upload
              className="flex flex-col"
              accept=".jpg, .pdf"
              beforeUpload={handleBeforeUpload}
              onChange={handleChange}
              onRemove={handleRemove}
              fileList={fileList}
            >
              <Form.Item className="m-0" name={''}>
                <Input
                  addonBefore={<div className="w-full flex items-center">Choose File</div>}
                  className="w-full"
                  value={''}
                  readOnly
                />
              </Form.Item>
              <span style={{ color: colorList['text-secondary'] }} className="text-sm">
                File must be less than 3MB (.pdf or .jpg)
              </span>
            </Upload>
          </Form.Item>
        </div>
        <div className="w-1/3 flex flex-col gap-4 h-full">
          <Form.Item label={<FormLabel label="Date Picker" />}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Time Picker" />}>
            <DatePicker.TimePicker className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Date Picker With Time" />}>
            <DatePicker showTime className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Week Picker" />}>
            <DatePicker.WeekPicker className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Month Picker" />}>
            <DatePicker.MonthPicker className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Quarter Picker" />}>
            <DatePicker.QuarterPicker className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Year Picker" />}>
            <DatePicker.YearPicker className="w-full" />
          </Form.Item>
          <Form.Item label={<FormLabel label="Range Picker" />}>
            <DatePicker.RangePicker className="w-full" />
          </Form.Item>
        </div>
        <div className="w-1/3 flex flex-col gap-4 h-full">
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 6 }}
            layout="horizontal"
            label={<FormLabel label="Checkbox" />}
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 6 }}
            layout="horizontal"
            label={<FormLabel label="Radio" />}
          >
            <Radio.Group>
              <Radio value={'all'}>All</Radio>
              <Radio value={'day'}>Day</Radio>
              <Radio value={'night'}>Night</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 6 }}
            layout="horizontal"
            label={<FormLabel label="Switch" />}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 6 }}
            layout="horizontal"
            label={<FormLabel label="Color Picker" />}
          >
            <ColorPicker />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 6 }}
            layout="horizontal"
            label={<FormLabel label="Slider" />}
          >
            <Slider />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 6 }}
            layout="horizontal"
            label={<FormLabel label="Rating" />}
          >
            <Rate />
          </Form.Item>
        </div>
      </Form>
    </CardEID>
  );
};

export default InputPage;
