import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FileSpreadsheet } from 'lucide-react';
import { ButtonExcel } from './button-excel';

const meta = {
  title: 'Shared/ButtonExcel',
  component: ButtonExcel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonExcel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// DOWNLOAD STORIES
// ============================================

export const DownloadBasic: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/data',
    onDownloadStart: fn(() => console.log('Download started')),
    onDownloadSuccess: fn((filename) => console.log('Downloaded:', filename)),
    onDownloadError: fn((error) => console.error('Error:', error)),
  },
};

export const DownloadCustomLabel: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/data',
    label: 'Download Report',
    onDownloadSuccess: fn(),
  },
};

export const DownloadCustomIcon: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/data',
    label: 'Export Data',
    icon: <FileSpreadsheet size={16} strokeWidth={1.75} />,
    onDownloadSuccess: fn(),
  },
};

export const DownloadWithCustomFilename: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/sales',
    customFilename: 'sales_report.xlsx',
    label: 'Download Sales Report',
    onDownloadSuccess: fn(),
  },
};

export const DownloadWithTimestamp: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/data',
    addTimestamp: true,
    label: 'Export with Timestamp',
    onDownloadSuccess: fn(),
  },
};

export const DownloadWithoutTimestamp: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/data',
    addTimestamp: false,
    label: 'Export without Timestamp',
    onDownloadSuccess: fn(),
  },
};

export const DownloadWithCustomHeaders: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/protected',
    headers: {
      Authorization: 'Bearer token123',
      'X-Custom-Header': 'custom-value',
    },
    label: 'Download with Auth',
    onDownloadSuccess: fn(),
  },
};

export const DownloadWithCustomClassName: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/data',
    className: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-600',
    label: 'Custom Styled Download',
    onDownloadSuccess: fn(),
  },
};

export const DownloadWithCallbacks: Story = {
  args: {
    variant: 'download',
    endpoint: '/api/export/data',
    label: 'Download with Logs',
    onDownloadStart: fn(() => {
      console.log('✅ Download started');
      alert('Download started!');
    }),
    onDownloadSuccess: fn((filename) => {
      console.log('✅ Downloaded successfully:', filename);
      alert(`Successfully downloaded: ${filename}`);
    }),
    onDownloadError: fn((error) => {
      console.error('❌ Download failed:', error);
      alert('Download failed! Check console for details.');
    }),
  },
};

// ============================================
// UPLOAD STORIES
// ============================================

export const UploadBasic: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/data',
    onUploadStart: fn((file) => console.log('Uploading:', file.name)),
    onUploadSuccess: fn((response, file) => console.log('Uploaded:', file.name, response)),
    onUploadError: fn((error, file) => console.error('Error:', error)),
    onUploadFinished: fn(() => console.log('Upload process finished')),
  },
};

export const UploadCustomLabel: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/data',
    label: 'Import Data',
    onUploadFinished: fn(),
  },
};

export const UploadCustomIcon: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/data',
    label: 'Import Excel',
    icon: <FileSpreadsheet size={16} strokeWidth={1.75} />,
    onUploadFinished: fn(),
  },
};

export const UploadCustomAccept: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/data',
    accept: '.xlsx,.xls,.csv',
    label: 'Upload Excel/CSV',
    onUploadFinished: fn(),
  },
};

export const UploadCustomFieldName: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/data',
    fileFieldName: 'excel_file',
    label: 'Upload (custom field)',
    onUploadFinished: fn(),
  },
};

export const UploadWithAdditionalData: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/products',
    additionalData: {
      category: 'electronics',
      batch_id: '2024-001',
      user_id: 123,
    },
    label: 'Upload with Extra Data',
    onUploadFinished: fn(),
  },
};

export const UploadMultipleFiles: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/bulk',
    maxCount: 5,
    label: 'Upload Multiple (max 5)',
    onUploadFinished: fn(),
  },
};

export const UploadWithCustomHeaders: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/protected',
    headers: {
      Authorization: 'Bearer token123',
      'X-User-ID': '12345',
    },
    label: 'Upload with Auth',
    onUploadFinished: fn(),
  },
};

export const UploadWithCustomClassName: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/data',
    className: 'bg-purple-500 hover:bg-purple-600 text-white border-purple-600',
    label: 'Custom Styled Upload',
    onUploadFinished: fn(),
  },
};

export const UploadWithCallbacks: Story = {
  args: {
    variant: 'upload',
    endpoint: '/api/import/data',
    label: 'Upload with Logs',
    onUploadStart: fn((file) => {
      console.log('✅ Upload started:', file.name);
      alert(`Starting upload: ${file.name}`);
    }),
    onUploadSuccess: fn((response, file) => {
      console.log('✅ Upload success:', file.name, response);
      alert(`Successfully uploaded: ${file.name}`);
    }),
    onUploadError: fn((error, file) => {
      console.error('❌ Upload failed:', file.name, error);
      alert(`Upload failed: ${file.name}`);
    }),
    onUploadFinished: fn(() => {
      console.log('✅ Upload process finished');
      alert('Upload process completed!');
    }),
  },
};

// ============================================
// COMBINED EXAMPLES
// ============================================

export const BothButtons: Story = {
  args: {
    variant: 'upload', // default variant for Storybook typing, not directly used
    endpoint: '/api/import/data', // default endpoint
    label: 'Import', // default label
  },
  render: () => (
    <div className="flex gap-4">
      <ButtonExcel
        variant="upload"
        endpoint="/api/import/data"
        label="Import"
        onUploadSuccess={fn((res, file) => alert(`Uploaded: ${file.name}`))}
        onUploadFinished={fn()}
      />
      <ButtonExcel
        variant="download"
        endpoint="/api/export/data"
        label="Export"
        onDownloadSuccess={fn((filename) => alert(`Downloaded: ${filename}`))}
      />
    </div>
  ),
};

export const CompleteWorkflow: Story = {
  args: {
    variant: 'upload', // not directly used but required by Storybook typing
    endpoint: '/api/import/sales', // for upload
    label: 'Import Sales Data',
  },
  render: () => {
    const handleUpload = (response: any, file: File) => {
      console.log('Upload response:', response);
      alert(
        `✅ File "${file.name}" uploaded successfully!\n\nResponse: ${JSON.stringify(response, null, 2)}`,
      );
    };

    const handleDownload = (filename: string) => {
      console.log('Downloaded:', filename);
      alert(`✅ File "${filename}" downloaded successfully!`);
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">Complete Excel Workflow</h3>
          <p className="text-sm text-gray-600">Upload and Download Excel files</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <ButtonExcel
              variant="upload"
              endpoint="/api/import/sales"
              label="Import Sales Data"
              accept=".xlsx,.xls"
              additionalData={{ department: 'sales', year: 2024 }}
              onUploadSuccess={handleUpload}
              onUploadFinished={() => console.log('Upload finished')}
            />
            <span className="text-sm text-gray-500">→ Upload your sales data</span>
          </div>

          <div className="flex items-center gap-3">
            <ButtonExcel
              variant="download"
              endpoint="/api/export/sales"
              label="Export Sales Report"
              customFilename="sales_report.xlsx"
              addTimestamp={true}
              onDownloadSuccess={handleDownload}
            />
            <span className="text-sm text-gray-500">→ Download processed report</span>
          </div>
        </div>
      </div>
    );
  },
};

export const WithErrorHandling: Story = {
  args: {
    variant: "download",
    endpoint: "/api/export/data",
    label: "Download (with error handling)",
  },
  render: () => {
    const handleError = (error: any, type: 'upload' | 'download') => {
      console.error(`${type} error:`, error);

      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      alert(`❌ ${type.charAt(0).toUpperCase() + type.slice(1)} failed!\n\nError: ${errorMessage}`);
    };

    return (
      <div className="flex gap-4">
        <ButtonExcel
          variant="upload"
          endpoint="/api/import/data"
          label="Upload (with error handling)"
          onUploadError={(error, file) => handleError(error, 'upload')}
          onUploadFinished={fn()}
        />
        <ButtonExcel
          variant="download"
          endpoint="/api/export/data"
          label="Download (with error handling)"
          onDownloadError={(error) => handleError(error, 'download')}
        />
      </div>
    );
  },
};

export const CustomStylingShowcase: Story = {
  args: {
    variant: "download",
    endpoint: "/api/export/data",
    label: "Default Style"
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <ButtonExcel {...args} />

      <ButtonExcel
        variant="download"
        endpoint="/api/export/data"
        label="Blue Theme"
        className="bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
      />

      <ButtonExcel
        variant="download"
        endpoint="/api/export/data"
        label="Red Theme"
        className="bg-red-500 hover:bg-red-600 text-white border-red-600"
      />

      <ButtonExcel
        variant="download"
        endpoint="/api/export/data"
        label="Dark Theme"
        className="bg-gray-800 hover:bg-gray-900 text-white border-gray-700"
      />
    </div>
  ),
};
