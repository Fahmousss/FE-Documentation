import { Input, Select } from "antd";
import ButtonDelete from "@/shared/button/components/button-delete";
import { useState, useRef } from "react";
import FormLabel from "@/shared/form/label";
import RichTextEditor from "@/shared/RichTextEditor/RichTextEditor";
import { GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import CardSection from "./CardSection"; 
import { IDocumentationMenu, IDocumentationRequest, IDocumentationSection, IDocumentationSubmenu } from "@/pages/documentation/utils/model";
import useDocumentationsMutation from "@/pages/documentation/hooks/use-documentations-mutation";

interface TabDocsProps {
    id?: string;
}

// ─── Helpers ─────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const makeSubmenu = (i: number): IDocumentationSubmenu => ({
    id: uid(), name: `Submenu ${i + 1}`, content: "", sortOrder: i,
});

const makeMenu = (i: number): IDocumentationMenu => ({
    id: uid(), name: `Menu ${i + 1}`, sortOrder: i,
    submenus: [makeSubmenu(0), makeSubmenu(1), makeSubmenu(2)],
});

const makeSection = (i: number): IDocumentationSection => ({
    id: uid(), name: "", sortOrder: i,
    menus: [makeMenu(0), makeMenu(1), makeMenu(2)],
});

// ─── Draggable hook ──────────────────────────────────────
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
    section: IDocumentationSection;
    index: number;
    showDelete: boolean;
    dragHandleProps: {
        draggable: boolean;
        onDragStart: () => void;
        onDragOver: (e: React.DragEvent) => void;
        onDragEnd: () => void;
    };
    onChange: (updated: IDocumentationSection) => void;
    onDelete: () => void;
}

const SectionBlock = ({ section, index, showDelete, dragHandleProps, onChange, onDelete }: SectionBlockProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(section.menus[0]?.id ?? "");
    const [activeSubmenuId, setActiveSubmenuId] = useState(section.menus[0]?.submenus[0]?.id ?? "");

    const activeMenu = section.menus.find(m => m.id === activeMenuId) ?? section.menus[0];
    const activeSubmenu = activeMenu?.submenus.find(s => s.id === activeSubmenuId) ?? activeMenu?.submenus[0];

    const updateSectionName = (name: string) => onChange({ ...section, name });

    const addMenu = () => {
        const newMenu = makeMenu(section.menus.length);
        onChange({ ...section, menus: [...section.menus, newMenu] });
        setActiveMenuId(newMenu.id);
        setActiveSubmenuId(newMenu.submenus[0].id);
    };

    const deleteMenu = (menuId: string) => {
        if (section.menus.length <= 1) return;
        const menus = section.menus.filter(m => m.id !== menuId);
        onChange({ ...section, menus });
        if (activeMenuId === menuId) {
            setActiveMenuId(menus[0].id);
            setActiveSubmenuId(menus[0].submenus[0]?.id ?? "");
        }
    };

    const reorderMenus = (reordered: PillItem[]) => {
        const menuMap = Object.fromEntries(section.menus.map(m => [m.id, m]));
        onChange({ ...section, menus: reordered.map(r => menuMap[r.id]) });
    };

    const updateMenuName = (name: string) => {
        onChange({ ...section, menus: section.menus.map(m => m.id === activeMenuId ? { ...m, name } : m) });
    };

    const addSubmenu = () => {
        const newSub = makeSubmenu(activeMenu.submenus.length);
        onChange({
            ...section,
            menus: section.menus.map(m =>
                m.id === activeMenuId ? { ...m, submenus: [...m.submenus, newSub] } : m
            ),
        });
        setActiveSubmenuId(newSub.id);
    };

    const deleteSubmenu = (subId: string) => {
        if (activeMenu.submenus.length <= 1) return;
        const subs = activeMenu.submenus.filter(s => s.id !== subId);
        onChange({
            ...section,
            menus: section.menus.map(m => m.id === activeMenuId ? { ...m, submenus: subs } : m),
        });
        if (activeSubmenuId === subId) setActiveSubmenuId(subs[0].id);
    };

    const reorderSubmenus = (reordered: PillItem[]) => {
        const subMap = Object.fromEntries(activeMenu.submenus.map(s => [s.id, s]));
        onChange({
            ...section,
            menus: section.menus.map(m =>
                m.id === activeMenuId ? { ...m, submenus: reordered.map(r => subMap[r.id]) } : m
            ),
        });
    };

    const updateSubmenuName = (name: string) => {
        onChange({
            ...section,
            menus: section.menus.map(m =>
                m.id === activeMenuId
                    ? { ...m, submenus: m.submenus.map(s => s.id === activeSubmenuId ? { ...s, name } : s) }
                    : m
            ),
        });
    };

    const updateContent = (content: string) => {
        onChange({
            ...section,
            menus: section.menus.map(m =>
                m.id === activeMenuId
                    ? { ...m, submenus: m.submenus.map(s => s.id === activeSubmenuId ? { ...s, content } : s) }
                    : m
            ),
        });
    };

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
            {/* Accordion Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100 select-none">
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
                    <span className="text-sm font-medium">Section {index + 1}</span>
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
                <div className="px-4 pb-4 pt-3 flex flex-col gap-4">
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

                    {/* Menu Pills */}
                    <PillTabs
                        items={section.menus}
                        activeId={activeMenuId}
                        onSelect={(id) => {
                            setActiveMenuId(id);
                            const m = section.menus.find(m => m.id === id);
                            setActiveSubmenuId(m?.submenus[0]?.id ?? "");
                        }}
                        onAdd={addMenu}
                        onDelete={deleteMenu}
                        onDragReorder={reorderMenus}
                    />
                    <CardSection className="mt-[-16px] rounded-none">
                        {/* Menu Name */}
                        <div>
                            <FormLabel label="Menu" />
                            <Input
                                placeholder="Input menu"
                                value={activeMenu?.name ?? ""}
                                onChange={e => updateMenuName(e.target.value)}
                                className="w-full mt-1"
                            />
                        </div>

                        {/* Submenu Pills */}
                        <PillTabs
                            items={activeMenu?.submenus ?? []}
                            activeId={activeSubmenuId}
                            onSelect={setActiveSubmenuId}
                            onAdd={addSubmenu}
                            onDelete={deleteSubmenu}
                            onDragReorder={reorderSubmenus}
                        />
                        <CardSection className="rounded-none">
                            {/* Submenu Name */}
                            <div>
                                <FormLabel label="Submenu" />
                                <Input
                                    placeholder="Input submenu"
                                    value={activeSubmenu?.name ?? ""}
                                    onChange={e => updateSubmenuName(e.target.value)}
                                    className="w-full mt-1"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <FormLabel label="Content" />
                                <div className="mt-1 max-h-[500px] overflow-auto">
                                    <RichTextEditor
                                        key={activeSubmenuId}
                                        value={activeSubmenu?.content ?? ""}
                                        onChange={updateContent}
                                    />
                                </div>
                            </div>
                        </CardSection>
                    </CardSection>
                </div>
            )}
        </div>
    );
};

// ─── Main TabDocs ─────────────────────────────────────────
const TabDocs = ({ id }: TabDocsProps) => {
    const [productId, setProductId] = useState<string | undefined>();
    const [sections, setSections] = useState<IDocumentationSection[]>([makeSection(0)]);

    const {
        createDocumentations,
        isPendingCreateDocumetations,
        updateDocumetations,
        isPendingUpdateDocumetations,
    } = useDocumentationsMutation();

    const { onDragStart, onDragOver, onDragEnd } = useDrag(sections, setSections);

    const handleSubmit = async () => {
        if (!productId) return;

        const body: IDocumentationRequest = {
            product_id: productId,
            sections,
        };

        if (id) {
            await updateDocumetations({ body, id });
        } else {
            await createDocumentations(body);
        }
    };

    const isPending = isPendingCreateDocumetations || isPendingUpdateDocumetations;

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
                <span className="font-bold text-sm">Section</span>
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
                    disabled={isPending || !productId}
                    className="px-6 py-2 rounded bg-[#01B763] text-white text-sm font-semibold hover:bg-[#05b965de] transition-colors  "
                >
                    {isPending ? "Saving..." : id ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default TabDocs;