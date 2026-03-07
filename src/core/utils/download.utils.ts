import { AxiosResponse, ResponseType } from 'axios';

interface IDownloadConfig {
  headers: {
    'Content-Disposition': string;
    'Content-Type': string;
  };
  responseType: ResponseType;
}

export const downloadConfig: IDownloadConfig = {
  headers: {
    'Content-Disposition': 'attachment; filename=template.xlsx',
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  responseType: 'blob',
};

export const downloadExcel = (response: AxiosResponse, name?: string) => {
  const blob = new Blob([response.data], {
    type: 'application/octet-stream',
  });

  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = name ?? 'data.xlsx';
  link.click();

  window.URL.revokeObjectURL(blobUrl);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
