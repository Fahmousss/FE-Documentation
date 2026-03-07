import { Form, Input, Select } from "antd"; 
import ButtonDelete from "@/shared/button/components/button-delete"; 
import { useState } from "react";
import FormLabel from "@/shared/form/label";
import RichTextEditor from "@/shared/RichTextEditor/RichTextEditor";


interface TabPreferencesProps {
    id?: string;
}

/**
 * Tab Preferences
 * Struktur: Product Name → Section (accordion) → Section Name → Submenu tabs → Menu input → Content
 * Mirip Docs tapi tanpa level Menu (langsung submenu)
 */
const TabPreferences = ({ id }: TabPreferencesProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: unknown) => {
        console.log("TabPreferences submit:", values, "id:", id);
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
                                <PrefSectionItem
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

// ─── Preferences Section Item ──────────────────────────────
interface PrefSectionItemProps {
    field: { key: number; name: number };
    sectionIndex: number;
    onRemove: () => void;
    showRemove: boolean;
}

const PrefSectionItem = ({ field, sectionIndex, onRemove, showRemove }: PrefSectionItemProps) => {
    const [collapsed, setCollapsed]           = useState(false);
    const [activeSubmenuTab, setActiveSubmenuTab] = useState(0);

    const submenuTabs = ["Submenu 1", "Submenu 2", "Submenu 3"];

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
                    {/* Section Name */}
                    <Form.Item
                        name={[field.name, "section_name"]}
                        label={<FormLabel label="Section Name" />}
                    >
                        <Input placeholder="Input section" />
                    </Form.Item>

                    {/* Submenu tabs */}
                    <div className="flex gap-2 flex-wrap">
                        {submenuTabs.map((tab, i) => (
                            <span
                                key={i}
                                onClick={() => setActiveSubmenuTab(i)}
                                className={`px-3 py-1 rounded-full text-xs cursor-pointer border transition-colors
                                    ${activeSubmenuTab === i
                                        ? "bg-[#22b07d] text-white border-[#22b07d]"
                                        : "bg-white text-gray-600 border-gray-300"
                                    }`}
                            >
                                {tab} {activeSubmenuTab === i && "×"}
                            </span>
                        ))}
                        <span className="px-2 py-1 text-gray-400 cursor-pointer text-sm">+</span>
                    </div>

                    {/* Menu input */}
                    <Form.Item name={[field.name, "menu"]} label={<FormLabel label="Menu" />}>
                        <Input placeholder="Input menu" />
                    </Form.Item>

                    {/* Content */}
                    <Form.Item name={[field.name, "content"]} label={<FormLabel label="Content" />}>
                        <RichTextEditor />
                    </Form.Item>
                </div>
            )}
        </div>
    );
};

export default TabPreferences;