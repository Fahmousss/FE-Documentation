import { useMessageContext } from '@/core/hooks/use-message-context';
import { UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';

export default function useUploadFile() {
  const { openMessage } = useMessageContext();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileUpload, setFileUpload] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.size && info.file.size > 3000000) {
      return;
    }
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      file.status = 'done';
      return file;
    });

    setFileList(newFileList);
  };

  const handleRemove = (file: UploadFile) => {
    const index = fileUpload.indexOf(file);
    const newFileList = fileUpload.slice();
    newFileList.splice(index, 1);
    setFileUpload(newFileList);
  };

  const handleBeforeUpload = (file: RcFile) => {
    if (file.size > 3000000) {
      openMessage({
        title: 'Error',
        message: 'File size should be less than 3 MB',
        mode: 'danger',
      });
      return false;
    }
    setFileUpload((pre) => [...pre, file]);

    return false;
  };

  return {
    fileList,
    fileUpload,
    handleChange,
    handleRemove,
    handleBeforeUpload,
  };
}
