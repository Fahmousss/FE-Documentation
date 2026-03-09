import { Input, Select } from "antd";
import ButtonDelete from "@/shared/button/components/button-delete";
import { useState, useRef } from "react";
import FormLabel from "@/shared/form/label";
import RichTextEditor from "@/shared/RichTextEditor/RichTextEditor";
import { GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import CardSection from "./CardSection";
import {
    IPreferencesItem,
    IPreferencesSection,
    IPreferencesRequest,
} from "@/pages/documentation/utils/model";
import usePreferencesMutation from "@/pages/documentation/hooks/use-preferences-mutation";
// import usePreferencesMutation from "@/pages/documentation/hooks/use-preferences-mutation";

interface TabPreferencesProps {
    id?: string;
}

// ─── Helpers ──────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const makeItem = (i: number): IPreferencesItem => ({
    id: uid(), name: `Item ${i + 1}`, content: "", sortOrder: i,
});

const makeSection = (i: number): IPreferencesSection => ({
    id: uid(), name: "", sortOrder: i,
    items: [makeItem(0), makeItem(1), makeItem(2)],
});

// ─── Draggable hook ───────────────────────────────────────
function useDrag<T>(
    items: T[],
    setItems: React.Dispatch<React.SetStateAction<T[]>>
) {
    const dragIdx = useRef<number | null>(null);
    const onDragStart = (i: number) => { dragIdx.current = i; };
    const onDragOver = (e: React.DragEvent, i: number) => {
        e.preventDefault();
        if (dragIdx.current === null || dragIdx.current === i) return;
        const next = [...items];
        const [moved] = next.splice(dragIdx.current, 1);
        next.splice(i, 0, moved);
        dragIdx.current = i;
        setItems(next);
    };
    const onDragEnd = () => { dragIdx.current = null; };
    return { onDragStart, onDragOver, onDragEnd };
}

// ─── Pill Tabs ────────────────────────────────────────────
interface PillItem { id: string; name: string; }
interface PillTabsProps {
    items: PillItem[];
    activeId: string;
    onSelect: (id: string) => void;
    onAdd: () => void;
    onDelete: (id: string) => void;
    onDragReorder: (newItems: PillItem[]) => void;
}

const PillTabs = ({ items, activeId, onSelect, onAdd, onDelete, onDragReorder }: PillTabsProps) => {
    const { onDragStart, onDragOver, onDragEnd } = useDrag(items, onDragReorder as any);
    return (
        <div className="flex flex-wrap items-center mt-2">
            {items.map((item, i) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => onDragStart(i)}
                    onDragOver={(e) => onDragOver(e, i)}
                    onDragEnd={onDragEnd}
                    onClick={() => onSelect(item.id)}
                    className={`
                        flex items-center gap-1.5 px-4 py-1.5 rounded-t-lg text-sm cursor-pointer border transition-all select-none
                        ${activeId === item.id
                            ? "bg-white text-[#01B763] border-[#01B763] shadow-sm"
                            : "bg-white text-[#D0D1DD] border-[#D0D1DD] font-semibold hover:border-gray-300 hover:bg-gray-50"
                        }
                    `}
                >
                    <GripVertical size={14} className="opacity-40" />
                    <span className="font-medium">{item.name}</span>
                    <span
                        className={`ml-1 text-lg font-light leading-none hover:opacity-70 px-1
                        ${activeId === item.id ? "text-[#01B763]" : "text-[#D0D1DD]"}`}
                        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    >
                        ×
                    </span>
                </div>
            ))}
            <button
                type="button"
                onClick={onAdd}
                className="w-8 h-8 rounded-t-lg bg-white text-[#D0D1DD] flex items-center border-2 justify-center text-lg leading-none hover:text-[#01B763] hover:border-[#01B763] transition-colors shadow-sm"
            >
                +
            </button>
        </div>
    );
};

// ─── Section Block ────────────────────────────────────────
interface SectionBlockProps {
    section: IPreferencesSection;
    index: number;
    showDelete: boolean;
    dragHandleProps: {
        draggable: boolean;
        onDragStart: () => void;
        onDragOver: (e: React.DragEvent) => void;
        onDragEnd: () => void;
    };
    onChange: (updated: IPreferencesSection) => void;
    onDelete: () => void;
}

const SectionBlock = ({ section, index, showDelete, dragHandleProps, onChange, onDelete }: SectionBlockProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeItemId, setActiveItemId] = useState(section.items[0]?.id ?? "");

    const activeItem = section.items.find(s => s.id === activeItemId) ?? section.items[0];

    const updateSectionName = (name: string) => onChange({ ...section, name });

    const addItem = () => {
        const newItem = makeItem(section.items.length);
        onChange({ ...section, items: [...section.items, newItem] });
        setActiveItemId(newItem.id);
    };

    const deleteItem = (itemId: string) => {
        if (section.items.length <= 1) return;
        const items = section.items.filter(s => s.id !== itemId);
        onChange({ ...section, items });
        if (activeItemId === itemId) setActiveItemId(items[0].id);
    };

    const reorderItems = (reordered: PillItem[]) => {
        const itemMap = Object.fromEntries(section.items.map(s => [s.id, s]));
        onChange({ ...section, items: reordered.map(r => itemMap[r.id]) });
    };

    const updateItemName = (name: string) => {
        onChange({
            ...section,
            items: section.items.map(s => s.id === activeItemId ? { ...s, name } : s),
        });
    };

    const updateContent = (content: string) => {
        onChange({
            ...section,
            items: section.items.map(s => s.id === activeItemId ? { ...s, content } : s),
        });
    };

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
            {/* Accordion Header */}
            <div className="flex items-center justify-between px-2 py-2 bg-secondary/10 border-gray-200 select-none">
                <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
                    <div
                        {...dragHandleProps}
                        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <GripVertical size={16} />
                    </div>
                    {collapsed
                        ? <ChevronDown size={14} className="text-gray-500" />
                        : <ChevronUp size={14} className="text-gray-500" />
                    }
                    <span className="text-md font-bold">
                        {section.name ? section.name : `Section ${index + 1}`}
                    </span>
                </div>
                {showDelete && (
                    <ButtonDelete
                        type="button"
                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); onDelete(); }}
                    />
                )}
            </div>

            {/* Accordion Body */}
            {!collapsed && (
                <div className="p-6 flex flex-col gap-4">
                    {/* Section Name */}
                    <div>
                        <FormLabel label="Section Name" />
                        <Input
                            placeholder="Input section"
                            value={section.name}
                            onChange={e => updateSectionName(e.target.value)}
                            className="w-full mt-1"
                        />
                    </div>

                    {/* Item Pills */}
                    <PillTabs
                        items={section.items}
                        activeId={activeItemId}
                        onSelect={setActiveItemId}
                        onAdd={addItem}
                        onDelete={deleteItem}
                        onDragReorder={reorderItems}
                    />
                    <CardSection className="mt-[-16px] rounded-t-none">
                        {/* Item Name → dikirim sebagai itemName */}
                        <div className="mb-4">
                            <FormLabel label="Item Name" />
                            <Input
                                placeholder="Input item name"
                                value={activeItem?.name ?? ""}
                                onChange={e => updateItemName(e.target.value)}
                                className="w-full mt-1"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <FormLabel label="Content" />
                            <div className="mt-1 max-h-[500px] overflow-none">
                                <RichTextEditor
                                    key={activeItemId}
                                    value={activeItem?.content ?? ""}
                                    onChange={updateContent}
                                />
                            </div>
                        </div>
                    </CardSection>
                </div>
            )}
        </div>
    );
};

// ─── Main TabPreferences ──────────────────────────────────
const TabPreferences = ({ id }: TabPreferencesProps) => {
    const [productId, setProductId] = useState<string | undefined>();
    const [sections, setSections] = useState<IPreferencesSection[]>([makeSection(0)]);

    const {
        updatePreferences,
        isPendingUpdatePreferences,
    } = usePreferencesMutation();

    const { onDragStart, onDragOver, onDragEnd } = useDrag(sections, setSections);

    const handleSubmit = async () => {
        if (!productId) return;

        // Map IPreferencesSection → IPreferencesRequestSection
        const body: IPreferencesRequest = {
            sections: sections.map((sec) => ({
                id: sec.id,
                name: sec.name,
                sortOrder: sec.sortOrder,
                items: sec.items.map((item) => ({
                    id: item.id,
                    itemName: item.name, // field lokal "name" → API "itemName"
                    content: item.content,
                    sortOrder: item.sortOrder,
                })),
            })),
        };

        // Preferences menggunakan PUT dengan productId di URL
        await updatePreferences({ body, productId });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Product Name */}
            <div>
                <FormLabel label="Product Name" className="ml-[0px]" />
                <Select
                    placeholder="Select product name"
                    style={{ width: "100%" }}
                    className="mt-1"
                    value={productId}
                    onChange={setProductId}
                />
            </div>

            {/* Section header */}
            <div className="flex items-center justify-between mt-[-4px]">
                <span className="text-left text-sm font-bold whitespace-pre-line pl-2 border-l-4 border-[#00B887]">
                    Section
                </span>
                <button
                    type="button"
                    onClick={() => setSections(prev => [...prev, makeSection(prev.length)])}
                    className="w-6 h-6 rounded bg-[#01B763] text-white flex items-center justify-center text-lg leading-none hover:bg-[#1a9068] transition-colors"
                >
                    +
                </button>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-3 mt-[-8px]">
                {sections.map((section, idx) => (
                    <SectionBlock
                        key={section.id}
                        section={section}
                        index={idx}
                        showDelete={sections.length > 1}
                        dragHandleProps={{
                            draggable: true,
                            onDragStart: () => onDragStart(idx),
                            onDragOver: (e) => onDragOver(e, idx),
                            onDragEnd,
                        }}
                        onChange={(updated) =>
                            setSections(prev => prev.map((s, i) => i === idx ? updated : s))
                        }
                        onDelete={() =>
                            setSections(prev => prev.filter((_, i) => i !== idx))
                        }
                    />
                ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPendingUpdatePreferences || !productId}
                    className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors"
                >
                    {isPendingUpdatePreferences ? "Saving..." : id ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default TabPreferences;