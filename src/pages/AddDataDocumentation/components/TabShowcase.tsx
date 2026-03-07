import { Form, Input, Select, DatePicker } from "antd";   
import { useState } from "react";
import FormLabel from "@/shared/form/label";
import RichTextEditor from "@/shared/RichTextEditor/RichTextEditor";
import UploadImage from "./UploadImage/UploadImage";

interface TabShowcaseProps {
    id?: string;
}

/**
 * Tab Showcase
 * Struktur: Product Name → Detail Showcase tabs → Upload Foto → Date → Title → Description → Content
 */
const TabShowcase = ({ id }: TabShowcaseProps) => {
    const [form] = Form.useForm();
    const [activeShowcase, setActiveShowcase] = useState(0);

    const showcaseTabs = ["Showcase 1", "Showcase 2", "Showcase 3"];

    const onFinish = (values: unknown) => {
        console.log("TabShowcase submit:", values, "id:", id);
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} className="flex flex-col gap-4">
            {/* Product Name */}
            <Form.Item
                name="product_name"
                label={<FormLabel label="Product Name" />}
                rules={[{ required: true, message: "Product Name is required" }]}
            >
                <Select placeholder="Select product name" />
            </Form.Item>

            {/* Detail Showcase label */}
            <div className="border-l-4 border-[#22b07d] pl-2">
                <span className="text-sm font-medium">Detail Showcase</span>
            </div>

            {/* Showcase tabs */}
            <div className="flex gap-2 flex-wrap">
                {showcaseTabs.map((tab, i) => (
                    <span
                        key={i}
                        onClick={() => setActiveShowcase(i)}
                        className={`px-3 py-1 rounded-full text-xs cursor-pointer border transition-colors
                            ${activeShowcase === i
                                ? "bg-[#22b07d] text-white border-[#22b07d]"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                    >
                        {tab} {activeShowcase === i && "×"}
                    </span>
                ))}
                <span className="px-2 py-1 text-gray-400 cursor-pointer text-sm">+</span>
            </div>

            {/* Upload Foto */}
            <Form.Item name={["showcases", activeShowcase, "photo"]}>
                <UploadImage
                    label="Upload Foto"
                    description="(Max image foto 1 mb)"
                />
            </Form.Item>

            {/* Date */}
            <Form.Item
                name={["showcases", activeShowcase, "date"]}
                label={<FormLabel label="Date" />}
            >
                <DatePicker className="w-full" placeholder="dd-mm-yyyy" format="DD-MM-YYYY" />
            </Form.Item>

            {/* Title */}
            <Form.Item
                name={["showcases", activeShowcase, "title"]}
                label={<FormLabel label="Title" />}
            >
                <Input placeholder="Input Title" />
            </Form.Item>

            {/* Description */}
            <Form.Item
                name={["showcases", activeShowcase, "description"]}
                label={<FormLabel label="Description" />}
            >
                <Input.TextArea rows={3} placeholder="Write text here ..." />
            </Form.Item>

            {/* Content */}
            <Form.Item
                name={["showcases", activeShowcase, "content"]}
                label={<FormLabel label="Content" />}
            >
                <RichTextEditor />
            </Form.Item>
        </Form>
    );
};

export default TabShowcase;