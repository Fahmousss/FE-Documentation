import { Form, Input, Select, DatePicker } from "antd"; 
import ButtonDelete from "@/shared/button/components/button-delete";
import { useState } from "react";
import FormLabel from "@/shared/form/label";
import RichTextEditor from "@/shared/RichTextEditor/RichTextEditor";
import UploadImage from "./UploadImage/UploadImage";

interface TabBlogProps {
    id?: string;
}

/**
 * Tab Blog
 * Struktur: Product Name → Section (accordion) → Upload Foto Hero → Date → Title → Description
 *           → Add Creator (grid upload foto + name) → Content
 */
const TabBlog = ({ id }: TabBlogProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: unknown) => {
        console.log("TabBlog submit:", values, "id:", id);
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

            {/* Section */}
            <div className="border border-gray-200 rounded-md">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-t-md">
                    <span className="font-medium text-sm">Section</span>
                    <button
                        type="button"
                        className="w-6 h-6 rounded bg-[#22b07d] text-white flex items-center justify-center text-lg leading-none"
                    >
                        +
                    </button>
                </div>

                <Form.List name="sections">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.length === 0 && add()}
                            {fields.map((field, sectionIndex) => (
                                <BlogSectionItem
                                    key={field.key}
                                    field={field}
                                    sectionIndex={sectionIndex}
                                    onRemove={() => remove(field.name)}
                                    showRemove={fields.length > 1}
                                />
                            ))}
                        </>
                    )}
                </Form.List>
            </div>
        </Form>
    );
};

// ─── Blog Section Item ────────────────────────────────────
interface BlogSectionItemProps {
    field: { key: number; name: number };
    sectionIndex: number;
    onRemove: () => void;
    showRemove: boolean;
}

const BlogSectionItem = ({ field, sectionIndex, onRemove, showRemove }: BlogSectionItemProps) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="border-t border-gray-200">
            <div
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-50"
                onClick={() => setCollapsed(!collapsed)}
            >
                <span className="text-sm font-medium">
                    {collapsed ? "▶" : "▼"} Section {sectionIndex + 1}
                </span>
                {showRemove && (
                    <ButtonDelete
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    />
                )}
            </div>

            {!collapsed && (
                <div className="px-4 pb-4 flex flex-col gap-3">
                    {/* Upload Foto Hero */}
                    <Form.Item name={[field.name, "hero_photo"]}>
                        <UploadImage
                            label="Upload Foto Hero"
                            description="(Max image foto 1 mb)"
                        />
                    </Form.Item>

                    {/* Date */}
                    <Form.Item
                        name={[field.name, "date"]}
                        label={<FormLabel label="Date" />}
                    >
                        <DatePicker className="w-full" placeholder="dd-mm-yyyy" format="DD-MM-YYYY" />
                    </Form.Item>

                    {/* Title */}
                    <Form.Item
                        name={[field.name, "title"]}
                        label={<FormLabel label="Title" />}
                    >
                        <Input placeholder="Input Title" />
                    </Form.Item>

                    {/* Description */}
                    <Form.Item
                        name={[field.name, "description"]}
                        label={<FormLabel label="Description" />}
                    >
                        <Input.TextArea rows={3} placeholder="Write text here ..." />
                    </Form.Item>

                    {/* Add Creator */}
                    <div className="border border-gray-200 rounded-md">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-t-md border-l-4 border-[#22b07d]">
                            <span className="text-sm font-medium">Add Creator</span>
                            <button
                                type="button"
                                className="w-6 h-6 rounded bg-[#22b07d] text-white flex items-center justify-center text-lg leading-none"
                            >
                                +
                            </button>
                        </div>

                        <Form.List name={[field.name, "creators"]}>
                            {(creatorFields, { add: addCreator, remove: removeCreator }) => (
                                <div className="p-4 flex flex-wrap gap-4">
                                    {creatorFields.map((creatorField) => (
                                        <div key={creatorField.key} className="relative flex flex-col items-center gap-2 w-[120px]">
                                            {/* Remove creator */}
                                            <button
                                                type="button"
                                                onClick={() => removeCreator(creatorField.name)}
                                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-red-400 text-red-400 text-xs flex items-center justify-center hover:bg-red-50 z-10"
                                            >
                                                ×
                                            </button>

                                            {/* Upload foto creator */}
                                            <Form.Item
                                                name={[creatorField.name, "photo"]}
                                                className="mb-0"
                                            >
                                                <UploadImage
                                                    label="Upload Foto"
                                                    description="(Max image foto 1 mb)"
                                                    compact
                                                />
                                            </Form.Item>

                                            {/* Name */}
                                            <Form.Item
                                                name={[creatorField.name, "name"]}
                                                label={<FormLabel label="Name" />}
                                                className="mb-0 w-full"
                                            >
                                                <Input placeholder="Input title" size="small" />
                                            </Form.Item>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Form.List>
                    </div>

                    {/* Content */}
                    <Form.Item
                        name={[field.name, "content"]}
                        label={<FormLabel label="Content" />}
                    >
                        <RichTextEditor />
                    </Form.Item>
                </div>
            )}
        </div>
    );
};

export default TabBlog;