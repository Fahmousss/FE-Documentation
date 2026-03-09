import { Input, Select, DatePicker } from "antd";
import { useState, useRef } from "react";
import FormLabel from "@/shared/form/label";
import RichTextEditor from "@/shared/RichTextEditor/RichTextEditor";
import { GripVertical } from "lucide-react";
import UploadImage from "./UploadImage/UploadImage";
import useShowcasesMutation from "@/pages/documentation/hooks/use-showcases-mutation";
import { IShowcaseItem, IShowcaseRequest } from "@/pages/documentation/utils/model";

interface TabShowcaseProps {
    id?: string;
}

// ─── Helpers ──────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const makeShowcase = (i: number): IShowcaseItem => ({
    id: uid(),
    name: `Showcase ${i + 1}`,
    photo: null,
    date: null,
    title: "",
    description: "",
    content: "",
    sortOrder: i,
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

// ─── Card Section ─────────────────────────────────────────
interface CardSectionProps {
    children: React.ReactNode;
    className?: string;
}

const CardSection = ({ children, className = "" }: CardSectionProps) => (
    <div className={`border border-gray-200 rounded-md p-4 bg-white ${className}`}>
        {children}
    </div>
);

// ─── Main TabShowcase ─────────────────────────────────────
const TabShowcase = ({ id }: TabShowcaseProps) => {
    const [productId, setProductId] = useState<string | undefined>();
    const [showcases, setShowcases] = useState<IShowcaseItem[]>([makeShowcase(0)]);
    const [activeShowcaseId, setActiveShowcaseId] = useState(showcases[0].id);

    const {
        createShowcase,
        isPendingCreateShowcase,
        updateShowcase,
        isPendingUpdateShowcase,
    } = useShowcasesMutation();

    const { onDragStart, onDragOver, onDragEnd } = useDrag(showcases, setShowcases);

    const activeShowcase = showcases.find(s => s.id === activeShowcaseId) ?? showcases[0];

    const updateActiveShowcase = (patch: Partial<IShowcaseItem>) => {
        setShowcases(prev =>
            prev.map(s => s.id === activeShowcaseId ? { ...s, ...patch } : s)
        );
    };

    const addShowcase = () => {
        const newItem = makeShowcase(showcases.length);
        setShowcases(prev => [...prev, newItem]);
        setActiveShowcaseId(newItem.id);
    };

    const deleteShowcase = (showcaseId: string) => {
        if (showcases.length <= 1) return;
        const next = showcases.filter(s => s.id !== showcaseId);
        setShowcases(next);
        if (activeShowcaseId === showcaseId) setActiveShowcaseId(next[0].id);
    };

    const reorderShowcases = (reordered: PillItem[]) => {
        const map = Object.fromEntries(showcases.map(s => [s.id, s]));
        setShowcases(reordered.map(r => map[r.id]));
    };

    const handleSubmit = async () => {
        if (!productId) return;

        // Map IShowcaseItem → IShowcaseRequestItem
        // Field lokal (name, photo, date) tidak dikirim ke API
        const body: IShowcaseRequest = {
            product_id: productId,
            items: showcases.map((s) => ({
                id: s.id,
                title: s.title,
                description: s.description,
                mediaUrl: "", // TODO: upload s.photo terlebih dahulu lalu isi URL-nya di sini
                content: s.content,
                sortOrder: s.sortOrder,
            })),
        };

        if (id) {
            await updateShowcase({ body, id });
        } else {
            await createShowcase(body);
        }
    };

    const isPending = isPendingCreateShowcase || isPendingUpdateShowcase;

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

            {/* Showcase header */}
            <div className="flex items-center justify-between mt-[-4px]">
                <span className="text-left text-sm font-bold whitespace-pre-line pl-2 border-l-4 border-[#00B887]">
                    Detail Showcase
                </span>
            </div>

            {/* Showcase Pill Tabs */}
            <div className="flex flex-col gap-3 mt-[-8px]">
                <PillTabs
                    items={showcases}
                    activeId={activeShowcaseId}
                    onSelect={setActiveShowcaseId}
                    onAdd={addShowcase}
                    onDelete={deleteShowcase}
                    onDragReorder={reorderShowcases}
                />

                <CardSection className="rounded-t-none mt-[-12px]">
                    {/* Upload Foto — native input hidden via wrapper */}
                    <div className="mb-4">
                        <div className="[&_input[type='file']]:hidden">
                            <UploadImage
                                value={activeShowcase.photo}
                                onChange={(file) => updateActiveShowcase({ photo: file })}
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="mb-4">
                        <FormLabel label="Date" />
                        <DatePicker
                            className="w-full mt-1"
                            placeholder="dd-mm-yyyy"
                            format="DD-MM-YYYY"
                            value={activeShowcase.date}
                            onChange={(date) => updateActiveShowcase({ date })}
                        />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <FormLabel label="Title" />
                        <Input
                            placeholder="Input Title"
                            className="w-full mt-1"
                            value={activeShowcase.title}
                            onChange={e => updateActiveShowcase({ title: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <FormLabel label="Description" />
                        <Input.TextArea
                            rows={3}
                            placeholder="Write text here ..."
                            className="w-full mt-1"
                            value={activeShowcase.description}
                            onChange={e => updateActiveShowcase({ description: e.target.value })}
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <FormLabel label="Content" />
                        <div className="mt-1 max-h-[500px] overflow-none">
                            <RichTextEditor
                                key={activeShowcaseId}
                                value={activeShowcase.content}
                                onChange={(content) => updateActiveShowcase({ content })}
                            />
                        </div>
                    </div>
                </CardSection>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPending || !productId}
                    className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors"
                >
                    {isPending ? "Saving..." : id ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default TabShowcase;