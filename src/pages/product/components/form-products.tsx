import FormLabel from "@/shared/form/label";
import { Form, Input } from "antd";

const FormProducts = () => {
  return (
    <>
      {/* ✅ Wajib ada hidden id seperti di User page */}
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>

      <Form.Item
        name="name"
        label={<FormLabel label="Product Name" />}
        rules={[{ required: true, message: 'Product name is required' }]}
      >
        <Input placeholder="Input Name" size="large" />
      </Form.Item>
    </>
  );
};

export default FormProducts;