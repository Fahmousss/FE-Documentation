import { Input, Select, DatePicker } from "antd";
import ButtonDelete from "@/shared/button/components/button-delete";
import { useState, useRef } from "react";
import FormLabel from "@/shared/form/label";
import RichTextEditor from "@/shared/RichTextEditor/RichTextEditor";
import { GripVertical, ChevronDown, ChevronUp, Plus } from "lucide-react";
import CardSection from "./CardSection";
import UploadImage from "./UploadImage/UploadImage";
import { IBlogItem, IBlogCreator, IBlogRequest } from "@/pages/documentation/utils/model";
import useBlogsMutation from "@/pages/documentation/hooks/use-blogs-mutation";

interface TabBlogProps {
    id?: string;
}

// ─── Helpers ──────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const makeCreator = (): IBlogCreator => ({ name: "", photoUrl: "" });

const makeBlog = (i: number): IBlogItem => ({
    id: uid(),
    name: `Section ${i + 1}`,
    title: "",
    publishDate: "",
    description: "",
    content: "",
    heroImage: null,
    creators: [makeCreator()],
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

// ─── Creator Card ─────────────────────────────────────────
interface CreatorCardProps {
    creator: IBlogCreator;
    showDelete: boolean;
    onChange: (patch: Partial<IBlogCreator>) => void;
    onDelete: () => void;
}

const CreatorCard = ({ creator, showDelete, onChange, onDelete }: CreatorCardProps) => (
    // <div className="relative flex flex-col gap-2 border border-dashed border-gray-300 rounded-md p-3 w-[306px]">
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

        {/* Upload foto creator — native input hidden */}
        <div className="w-full [&_input[type='file']]:hidden">
            <UploadImage
                label="Upload Foto"
                description="(Max image foto 1 mb)"
                value={null}
                onChange={() => {}}
            />
        </div>

        {/* Creator name */}
        <div className="w-full">
            <FormLabel label="Name" />
            <Input
                placeholder="Input title"
                size="small"
                className="mt-1"
                value={creator.name}
                onChange={e => onChange({ name: e.target.value })}
            />
        </div>
    </div>
);

// ─── Section Block ────────────────────────────────────────
interface SectionBlockProps {
    blog: IBlogItem;
    index: number;
    showDelete: boolean;
    dragHandleProps: {
        draggable: boolean;
        onDragStart: () => void;
        onDragOver: (e: React.DragEvent) => void;
        onDragEnd: () => void;
    };
    onChange: (updated: IBlogItem) => void;
    onDelete: () => void;
}

const SectionBlock = ({ blog, index, showDelete, dragHandleProps, onChange, onDelete }: SectionBlockProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const update = (patch: Partial<IBlogItem>) => onChange({ ...blog, ...patch });

    const addCreator = () => update({ creators: [...blog.creators, makeCreator()] });

    const deleteCreator = (i: number) => {
        if (blog.creators.length <= 1) return;
        update({ creators: blog.creators.filter((_, idx) => idx !== i) });
    };

    const updateCreator = (i: number, patch: Partial<IBlogCreator>) => {
        update({
            creators: blog.creators.map((c, idx) => idx === i ? { ...c, ...patch } : c),
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
                        {blog.title ? blog.title : `Section ${index + 1}`}
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
                    {/* Upload Foto Hero */}
                    <div>
                        <div className="[&_input[type='file']]:hidden">
                            <UploadImage
                                label="Upload Foto Hero"
                                description="(Max image foto 1 mb)"
                                value={blog.heroImage}
                                onChange={(file) => update({ heroImage: file })}
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <FormLabel label="Date" />
                        <DatePicker
                            className="w-full mt-1"
                            placeholder="dd-mm-yyyy"
                            format="DD-MM-YYYY"
                            onChange={(_, dateStr) =>
                                update({ publishDate: Array.isArray(dateStr) ? dateStr[0] : dateStr })
                            }
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <FormLabel label="Title" />
                        <Input
                            placeholder="Input Title"
                            className="w-full mt-1"
                            value={blog.title}
                            onChange={e => update({ title: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <FormLabel label="Description" />
                        <Input.TextArea
                            rows={3}
                            placeholder="Write text here ..."
                            className="w-full mt-1"
                            value={blog.description}
                            onChange={e => update({ description: e.target.value })}
                        />
                    </div>

                    {/* Add Creator */}
                    <div >
                        {/* Creator header */}
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm font-bold border-l-4 border-[#00B887] pl-2">
                                Add Creator
                            </span>
                            <button
                                type="button"
                                onClick={addCreator}
                                className="w-6 h-6 rounded bg-[#01B763] text-white flex items-center justify-center hover:bg-[#1a9068] transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>

                        {/* Creator cards — horizontal scroll jika overflow */}
                        {/* <div className="p-4 pt-6 border border-gray-200 rounded-md flex flex-row flex-wrap gap-6"> */}
                        <div className="p-4 pt-6 border border-gray-200 rounded-md grid grid-cols-4 gap-6">
                            {blog.creators.map((creator, i) => (
                                <CreatorCard
                                    key={i}
                                    creator={creator}
                                    showDelete={blog.creators.length > 1}
                                    onChange={(patch) => updateCreator(i, patch)}
                                    onDelete={() => deleteCreator(i)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <FormLabel label="Content" />
                        <div className="mt-1 max-h-[500px] overflow-none">
                            <RichTextEditor
                                key={blog.id}
                                value={blog.content}
                                onChange={(content) => update({ content })}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Main TabBlog ─────────────────────────────────────────
const TabBlog = ({ id }: TabBlogProps) => {
    const [productId, setProductId] = useState<string | undefined>();
    const [blogs, setBlogs] = useState<IBlogItem[]>([makeBlog(0)]);

    const { updateBlog, isPendingUpdateBlog } = useBlogsMutation();

    const { onDragStart, onDragOver, onDragEnd } = useDrag(blogs, setBlogs);

    const handleSubmit = async () => {
        if (!productId) return;

        const body: IBlogRequest = {
            sections: blogs.map((b) => ({
                id: b.id,
                title: b.title,
                publishDate: b.publishDate,
                description: b.description,
                content: b.content,
                heroImageUrl: "", // TODO: upload b.heroImage lalu isi URL-nya
                creators: b.creators.map((c) => ({
                    name: c.name,
                    photoUrl: c.photoUrl, // TODO: upload foto creator lalu isi URL-nya
                })),
                sortOrder: b.sortOrder,
            })),
        };

        await updateBlog({ body, productId });
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
                    onClick={() => setBlogs(prev => [...prev, makeBlog(prev.length)])}
                    className="w-6 h-6 rounded bg-[#01B763] text-white flex items-center justify-center text-lg leading-none hover:bg-[#1a9068] transition-colors"
                >
                    +
                </button>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-3 mt-[-8px]">
                {blogs.map((blog, idx) => (
                    <SectionBlock
                        key={blog.id}
                        blog={blog}
                        index={idx}
                        showDelete={blogs.length > 1}
                        dragHandleProps={{
                            draggable: true,
                            onDragStart: () => onDragStart(idx),
                            onDragOver: (e) => onDragOver(e, idx),
                            onDragEnd,
                        }}
                        onChange={(updated) =>
                            setBlogs(prev => prev.map((b, i) => i === idx ? updated : b))
                        }
                        onDelete={() =>
                            setBlogs(prev => prev.filter((_, i) => i !== idx))
                        }
                    />
                ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPendingUpdateBlog || !productId}
                    className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors"
                >
                    {isPendingUpdateBlog ? "Saving..." : id ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default TabBlog;