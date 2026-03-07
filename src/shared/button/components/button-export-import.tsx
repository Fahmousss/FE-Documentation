import IconDownload from '@/assets/icons/download.svg';
import IconDots from '@/assets/icons/menu-dots.svg';
import IconUpload from '@/assets/icons/upload.svg';
import { cn } from '@/core/utils/class.utils';
import { Dropdown, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import ButtonEID from '..';
import { ButtonExportImportProps } from '../utils/model';

export const ButtonExportImport = ({
  isLoading,
  className,
  onExport,
  onImport,
  ...props
}: ButtonExportImportProps) => {
  const items: MenuProps['items'] = useMemo(() => {
    const exportItem: ItemType = {
      label: (
        <div onClick={onExport} className="flex gap-2.5 items-center p-2">
          <img src={IconDownload} alt="ic-download" />
          <p className="text-md">Export ( .xlsx )</p>
        </div>
      ),
      key: '0',
    };

    const importItem: ItemType = {
      label: (
        <div onClick={onImport} className="flex gap-2.5 items-center p-2">
          <img src={IconUpload} alt="ic-upload" />
          <p className="text-md">Import ( .xlsx )</p>
        </div>
      ),
      key: '1',
    };
    return [onImport ? importItem : null, onExport ? exportItem : null];
  }, [onExport, onImport]);
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <ButtonEID
        {...props}
        isLoading={isLoading}
        variant={'outline-primary'}
        className={cn('min-w-12 w-12  min-h-12', className)}
      >
        <img src={IconDots} />
      </ButtonEID>
    </Dropdown>
  );
};
