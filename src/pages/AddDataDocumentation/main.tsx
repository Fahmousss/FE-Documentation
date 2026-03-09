import BreadCrumbEID from "@/shared/breadcrumb";
import ButtonEID from "@/shared/button";
import CardEID from "@/shared/card";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText, Edit3, PlusCircle } from "lucide-react";
import { useState } from "react";
import TabDocs from "./components/TabDocs";
import TabShowcase from "./components/TabShowcase";
import TabPreferences from "./components/TabPreferences";
import TabBlog from "./components/TabBlog";
import CardSection from "./components/CardSection";

// ─── Types ───────────────────────────────────────────────
type TabKey = "docs" | "showcase" | "preferences" | "blog";

const TABS: { key: TabKey; label: string }[] = [
    { key: "docs", label: "Docs" },
    { key: "showcase", label: "Showcase" },
    { key: "preferences", label: "Preferences" },
    { key: "blog", label: "Blog" },
];

// ─── Component ───────────────────────────────────────────
const AddDataDocumentation = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const id: string | undefined = state?.id;   // ada id = mode edit
    const isEdit = Boolean(id);

    const pageLabel = isEdit ? "Edit Documentation" : "Add New Documentation";

    const [activeTab, setActiveTab] = useState<TabKey>("docs");

    // handler submit per-tab bisa dikembangkan lebih lanjut
    const handleCancel = () => navigate("/Documentation");

    const handleSave = () => {
        // TODO: trigger form submit sesuai activeTab
        console.log("save tab:", activeTab, "id:", id);
    };

    return (
        <div className="w-full mi-h-fit">
            {/* ── Breadcrumb ── */}
            <div className="flex w-full fixed z-50">
                <BreadCrumbEID
                    icon={isEdit ? Edit3 : PlusCircle}
                    className="w-full bg-white px-8 mt-[-16px] h-[4.3pc] ml-[-16px] text-lg"
                    items={[
                        { label: "Documentation", path: "/documentation", icon: FileText },
                        { label: pageLabel, path: "#" },
                    ]}
                />
            </div >

            {/* ── Card utama ── */}
            <CardSection className="mt-[70px] ">
                {/* Header */}
                <div className="mb-4">
                    <p className="text-xl font-bold">{pageLabel}</p>
                    <p className="text-sm text-gray-400">Data table information</p>
                </div>

                {/* ── Tab Navigation ── */}
                <div className="flex border-b border-gray-200 mb-6 justify-around">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                                    px-6 py-3 text-sm w-full font-medium transition-colors duration-150
                                    ${activeTab === tab.key
                                    ? "border-b-2 border-[#22b07d] text-[#22b07d] transition-all"
                                    : "text-gray-500 hover:text-gray-700"
                                }
                                `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                <div>
                    {activeTab === "docs" && <TabDocs id={id} />}
                    {activeTab === "showcase" && <TabShowcase id={id} />}
                    {activeTab === "preferences" && <TabPreferences id={id} />}
                    {activeTab === "blog" && <TabBlog id={id} />}
                </div>
            </CardSection>
        </div >
    );
};

export default AddDataDocumentation;