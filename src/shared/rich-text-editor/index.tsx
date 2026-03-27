import useUploadFile from '@/core/hooks/use-upload-file';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCallback, useMemo, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────
interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
}

// ─── Toolbar config (module-level so reference is always stable) ──
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

// ─── Extracts all image URLs currently embedded in the editor ───
const getEditorImageUrls = (quill: ReturnType<ReactQuill['getEditor']>): Set<string> => {
  const urls = new Set<string>();
  quill.getContents().ops?.forEach((op) => {
    if (op.insert && typeof op.insert === 'object' && 'image' in op.insert) {
      urls.add(op.insert.image as string);
    }
  });
  return urls;
};

// ─── Component ───────────────────────────────────────────
const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Write text here...',
  height = '200px',
}: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const { uploadFile, deleteFileCDN } = useUploadFile();

  // Tracks image URLs present in the editor so we can detect removals
  const trackedImageUrls = useRef<Set<string>>(new Set());

  // ── Image handler — opens file picker, uploads to CDN, inserts URL ──
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !quillRef.current) return;

      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);

      // Insert a temporary placeholder while uploading
      quill.insertText(range.index, 'Uploading image...', 'italic', true);

      try {
        const response = await uploadFile(file);
        const rawUrl = response.data.file_url;
        const imageUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;

        // Replace placeholder with the actual image
        quill.deleteText(range.index, 'Uploading image...'.length);
        quill.insertEmbed(range.index, 'image', imageUrl);
        quill.setSelection(range.index + 1, 0);

        // Track the newly inserted image
        trackedImageUrls.current.add(imageUrl);
      } catch {
        quill.deleteText(range.index, 'Uploading image...'.length);
      }
    };
  }, [uploadFile]);

  // ── Detect image deletions on every text-change ──────────────────
  // Quill has no dedicated "image removed" event, so we diff the current
  // set of embedded image URLs against the previously tracked set.
  const handleChange = useCallback(
    (content: string) => {
      onChange?.(content);

      if (!quillRef.current) return;
      const quill = quillRef.current.getEditor();
      const currentUrls = getEditorImageUrls(quill);

      // Any URL that was tracked but is no longer in the content was deleted
      trackedImageUrls.current.forEach((url) => {
        if (!currentUrls.has(url)) {
          const nameFile = url.split('/').pop();
          if (nameFile) {
            deleteFileCDN(nameFile);
          }
          trackedImageUrls.current.delete(url);
        }
      });
    },
    [onChange, deleteFileCDN],
  );

  // ── Memoize modules so the object reference stays stable across renders.
  // Passing a new object on every render causes react-quill to remount the
  // editor entirely (and disappear). The handler is registered post-init below.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: TOOLBAR_OPTIONS,
      },
    }),
    [],
  );

  // ── Register the image handler + seed initial tracked URLs after mount ──
  const handleRef = useCallback(
    (node: ReactQuill | null) => {
      (quillRef as React.MutableRefObject<ReactQuill | null>).current = node;
      if (!node) return;

      // Register image upload handler
      const toolbar = node.getEditor().getModule('toolbar') as {
        addHandler: (name: string, handler: () => void) => void;
      };
      toolbar.addHandler('image', imageHandler);

      // Seed tracked set with any images already in the initial content
      trackedImageUrls.current = getEditorImageUrls(node.getEditor());
    },
    [imageHandler],
  );

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={handleRef}
        theme="snow"
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules}
        style={{ height, marginBottom: '42px', color: 'Background' }}
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
