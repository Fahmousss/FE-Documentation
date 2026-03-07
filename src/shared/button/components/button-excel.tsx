import { BASE_URL } from '@/core/constant/config.constant';
import { cn } from '@/core/utils/class.utils';
import { Spin, Upload } from 'antd';
import axios from 'axios';
import { Download, LoaderCircle, Upload as UploadIcon } from 'lucide-react';
import { useState } from 'react';

interface ButtonExcelDownloadProps {
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  endpoint: string;
  customFilename?: string;
  addTimestamp?: boolean;
  headers?: Record<string, string>;
  onDownloadStart?: () => void;
  onDownloadSuccess?: (filename: string) => void;
  onDownloadError?: (error: any) => void;
}

interface ButtonExcelUploadProps {
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  endpoint: string;
  headers?: Record<string, string>;
  accept?: string;
  maxCount?: number;
  fileFieldName?: string;
  additionalData?: Record<string, any>;
  onUploadStart?: (file: File) => void;
  onUploadSuccess?: (response: any, file: File) => void;
  onUploadError?: (error: any, file: File) => void;
  onUploadFinished?: VoidFunction;
}

type ButtonExcelProps =
  | ({ variant: 'download' } & ButtonExcelDownloadProps)
  | ({ variant: 'upload' } & ButtonExcelUploadProps);

export type { ButtonExcelDownloadProps, ButtonExcelProps, ButtonExcelUploadProps };

export const ButtonExcel = (props: ButtonExcelProps) => {
  if (props.variant === 'download') {
    return <ButtonExcelDownload {...props} />;
  }
  return <ButtonExcelUpload {...props} />;
};

const ButtonExcelDownload = ({
  className,
  label,
  icon,
  endpoint,
  customFilename,
  addTimestamp = true,
  headers = {},
  onDownloadStart,
  onDownloadSuccess,
  onDownloadError,
}: ButtonExcelDownloadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateTimestamp = (): string => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const time = `${pad(now.getHours())}.${pad(now.getMinutes())}`;
    const date = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;
    return `${time}_${date}`;
  };

  const extractFilenameFromHeaders = (contentDisposition: string): string => {
    if (!contentDisposition) {
      return 'download.xlsx';
    }

    // Try multiple patterns untuk extract filename
    // Pattern 1: filename="namafile.xlsx"
    let match = contentDisposition.match(/filename\s*=\s*"([^"]+)"/i);
    if (match && match[1]) {
      return match[1];
    }

    // Pattern 2: filename=namafile.xlsx (tanpa quotes)
    match = contentDisposition.match(/filename\s*=\s*([^;\s]+)/i);
    if (match && match[1]) {
      return match[1];
    }

    // Pattern 3: filename*=UTF-8''namafile.xlsx
    match = contentDisposition.match(/filename\*\s*=\s*UTF-8''([^;\s]+)/i);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }

    // Pattern 4: filename*=UTF-8''"namafile.xlsx"
    match = contentDisposition.match(/filename\*\s*=\s*UTF-8''"([^"]+)"/i);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }

    console.warn('Could not extract filename from Content-Disposition:', contentDisposition);
    return 'download.xlsx';
  };

  const processFilename = (originalFilename: string): string => {
    if (customFilename) {
      // Jika ada custom filename, gunakan itu
      const baseCustomName = customFilename.replace(/\.[^/.]+$/, ''); // Remove extension
      const extension = customFilename.match(/\.[^/.]+$/)?.[0] || '.xlsx';
      return addTimestamp ? `${baseCustomName}_${generateTimestamp()}${extension}` : customFilename;
    }

    // Jika tidak ada custom filename, gunakan dari backend
    // Cek apakah filename dari backend sudah mengandung timestamp pattern
    const timestampPattern = /\d{2}\.\d{2}_\d{8}/; // Pattern: 09.51_04082025
    const hasTimestamp = timestampPattern.test(originalFilename);

    if (hasTimestamp || !addTimestamp) {
      // Jika sudah ada timestamp dari backend atau tidak ingin timestamp, gunakan langsung
      return originalFilename;
    }

    // Jika belum ada timestamp dan diminta timestamp, tambahkan
    const baseName = originalFilename.replace(/\.[^/.]+$/, ''); // Remove extension
    const extension = originalFilename.match(/\.[^/.]+$/)?.[0] || '.xlsx';
    return `${baseName}_${generateTimestamp()}${extension}`;
  };

  const downloadFile = async () => {
    try {
      setIsLoading(true);
      onDownloadStart?.();

      const fullUrl = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      console.log('Downloading from:', fullUrl);

      const response = await axios({
        method: 'GET',
        url: fullUrl,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      // Extract filename from response headers
      const contentDisposition = response.headers['content-disposition'] || '';
      console.log('Content-Disposition header:', contentDisposition);

      const originalFilename = extractFilenameFromHeaders(contentDisposition);
      console.log('Extracted filename:', originalFilename);

      // Process filename berdasarkan props
      const finalFilename = processFilename(originalFilename);
      console.log('Final filename:', finalFilename);

      // Create blob and download
      const blob = new Blob([response.data], {
        type:
          response.headers['content-type'] ||
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = finalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      onDownloadSuccess?.(finalFilename);
    } catch (error) {
      console.error('Download error:', error);
      onDownloadError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={downloadFile}
      disabled={isLoading}
      className={cn(
        'bg-transparent dark:bg-green-950 border border-slate-300/80 text-slate-700 disabled:opacity-65 h-[36px] font-normal',
        'px-4 py-2 text-base text-nowrap w-fit flex items-center group gap-2 rounded-md hover:bg-slate-100/70 transition-colors',
        isLoading && 'cursor-not-allowed',
        className,
      )}
    >
      {icon ?? (
        <Download
          size={16}
          strokeWidth={1.75}
          className={cn('mb-[0.5px] group-hover:animate-bounce-download')}
        />
      )}
      {isLoading ? (
        <Spin indicator={<LoaderCircle className="h-5 w-5 animate-spin text-green-700" />} />
      ) : (
        label || 'Export'
      )}
    </button>
  );
};

const ButtonExcelUpload = ({
  className,
  label,
  icon,
  endpoint,
  headers = {},
  accept = '.xlsx',
  maxCount = 1,
  fileFieldName = 'file',
  additionalData = {},
  onUploadStart,
  onUploadSuccess,
  onUploadError,
  onUploadFinished,
}: ButtonExcelUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (options: any) => {
    const { file } = options;

    try {
      setIsUploading(true);
      onUploadStart?.(file);

      // Buat FormData
      const formData = new FormData();
      formData.append(fileFieldName, file);

      // Tambahkan data tambahan jika ada
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });

      // Debug FormData - cara yang benar untuk melihat isi FormData
      console.log('=== FormData Debug ===');
      console.log('File field name:', fileFieldName);
      console.log('File:', file.name, file.size, 'bytes');
      console.log('Additional data:', additionalData);

      // Loop through FormData entries untuk debug
      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }

      const fullUrl = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      console.log('Uploading to:', fullUrl);
      console.log('File:', file.name);

      const response = await axios.post(fullUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
      });

      console.log('Upload success:', response.data);
      onUploadSuccess?.(response.data, file);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.(error, file);
    } finally {
      setIsUploading(false);
      onUploadFinished?.();
    }
  };

  return (
    <Upload
      customRequest={handleUpload}
      showUploadList={false}
      accept={accept}
      maxCount={maxCount}
      disabled={isUploading}
    >
      <button
        disabled={isUploading}
        className={cn(
          'bg-transparent dark:bg-green-950 border border-slate-300/80 text-slate-700 disabled:opacity-65 h-[36px] font-normal',
          'px-4 py-2 text-base text-nowrap w-fit flex items-center group gap-2 rounded-md hover:bg-slate-100/70 transition-colors',
          isUploading && 'cursor-not-allowed',
          className,
        )}
      >
        {icon ?? (
          <UploadIcon
            size={16}
            strokeWidth={1.75}
            className={cn('mb-[0.5px] group-hover:animate-bounce-upload')}
          />
        )}
        {isUploading ? (
          <Spin indicator={<LoaderCircle className="h-5 w-5 animate-spin text-green-700" />} />
        ) : (
          label || 'Upload'
        )}
      </button>
    </Upload>
  );
};

export default ButtonExcel;
