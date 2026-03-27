import useUploadFile from '@/core/hooks/use-upload-file';
import { ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';

// Ensure URL is always absolute (CDN may return URLs without protocol)
const toAbsoluteUrl = (url: string): string =>
  url.startsWith('http') ? url : `https://${url}`;

// ─── Types ───────────────────────────────────────────────
interface UploadImageProps {
  value?: string; // URL (dari Form.Item)
  onChange?: (value: string) => void; // dipanggil Form.Item otomatis
  label?: string; // "Upload Foto" / "Upload Foto Hero"
  description?: string; // "(Max image foto 1 mb)"
  maxSizeMb?: number; // default 1
  compact?: boolean; // mode kecil untuk grid creator
}

// ─── Component ───────────────────────────────────────────
const UploadImage = ({
  value,
  onChange,
  label = 'Upload Foto',
  description = '(Max image foto 1 mb)',
  maxSizeMb = 1,
  compact = false,
}: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(value ? toAbsoluteUrl(value) : undefined);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const { uploadFile, isUploading, deleteFileCDN } = useUploadFile();

  // ── Handle file pilihan ──────────────────────────────
  const processFile = async (file: File) => {
    setError('');

    // validasi tipe
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.');
      return;
    }

    // validasi ukuran
    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Ukuran file maksimal ${maxSizeMb} MB.`);
      return;
    }

    // upload ke CDN
    try {
      const response = await uploadFile(file);
      const imageUrl = toAbsoluteUrl(response.data.file_url);
      setPreview(imageUrl);
      onChange?.(imageUrl);
    } catch {
      setError('Gagal mengupload gambar. Silakan coba lagi.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset input biar bisa upload file yang sama lagi
    e.target.value = '';
  };

  // ── Drag & drop ──────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // ── Remove ───────────────────────────────────────────
  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (preview) {
      const nameFile = preview.split('/').pop();
      if (nameFile) {
        await deleteFileCDN(nameFile);
      }
    }

    setPreview(undefined);
    setError('');
    onChange?.('');
  };

  // ── Style berdasar mode ───────────────────────────────
  const containerClass = compact ? 'w-[120px] h-[100px]' : 'w-full h-[160px]';

  return (
    <div className="flex flex-col gap-1">
      {/* Input hidden */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload area */}
      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
                    relative flex flex-col items-center justify-center
                    border-2 border-dashed rounded-md cursor-pointer
                    transition-colors duration-150 overflow-hidden
                    ${containerClass}
                    ${
                      isDragging
                        ? 'border-[#22b07d] bg-green-50'
                        : 'border-gray-300 bg-white hover:border-[#22b07d] hover:bg-green-50'
                    }
                    ${isUploading ? 'cursor-wait opacity-70' : ''}
                `}
      >
        {isUploading ? (
          /* ── Loading state ── */
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-[#22b07d] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-400">Uploading...</span>
          </div>
        ) : preview ? (
          /* ── Preview gambar ── */
          <>
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            {/* Overlay         `remove */}
            <button
              type="button"
              onClick={handleRemove}
              className="
                                absolute top-1 right-1
                                w-5 h-5 rounded-full
                                bg-white border border-red-400 text-red-400
                                text-xs flex items-center justify-center
                                hover:bg-red-50 transition-colors
                            "
            >
              ×
            </button>
          </>
        ) : (
          /* ── Placeholder ── */
          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#22b07d] flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-[#22b07d]" />
            </div>
            {!compact && (
              <>
                <span className="text-sm text-gray-500 mt-1">{label}</span>
                <span className="text-xs text-gray-400">{description}</span>
              </>
            )}
            {compact && (
              <>
                <span className="text-[10px] text-gray-500 leading-tight">{label}</span>
                <span className="text-[9px] text-gray-400 leading-tight">{description}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default UploadImage;
