import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// ─── Types ───────────────────────────────────────────────
interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    height?: string;
}

// ─── Toolbar config (sesuai screenshot) ──────────────────
const TOOLBAR_OPTIONS = [
    [{ font: [] }],
    [{ header: [1, 2, 3, false] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean'],
];

// ─── Component ───────────────────────────────────────────
const RichTextEditor = ({
    value,
    onChange,
    placeholder = 'Write text here...',
    height = '200px',
}: RichTextEditorProps) => {
    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value ?? ''}
                onChange={onChange}
                placeholder={placeholder}
                modules={{ toolbar: TOOLBAR_OPTIONS }}
                style={{ height, marginBottom: '42px', color:'Background' }} // marginBottom buat ruang toolbar bawah
            />

            {/* Override style biar konsisten sama antd */}
            <style>{`
                .rich-text-editor .ql-container {
                    border-radius: 0 0 6px 6px;
                    border-color: #d9d9d9;
                    font-family: inherit;
                    font-size: 14px;
                }
                .rich-text-editor .ql-toolbar {
                    border-radius: 6px 6px 0 0;
                    border-color: #d9d9d9;
                    background: #fafafa;
                }
                .rich-text-editor .ql-container:hover,
                .rich-text-editor .ql-toolbar:hover {
                    border-color: #22b07d;
                }
                .rich-text-editor .ql-editor:focus {
                    outline: none;
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: #bfbfbf;
                    font-style: normal;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;