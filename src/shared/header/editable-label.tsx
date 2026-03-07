import IconSetting from '@/assets/icons/setting.svg';
import useModal from '@/core/hooks/use-modal';
import { cn } from '@/core/utils/class.utils';
import { Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import FormLabel from '../form/label';
import { ModalEID } from '../modal';
import { EditableLabelProps } from './types';

const EditableLabel = ({ subTitle, titleKey, className }: EditableLabelProps) => {
  const { open, openModal, closeModal } = useModal();

  const [title, setTitle] = useState<string>();
  const [inputTitle, setInputTitle] = useState('');

  const okHandler = () => {
    localStorage.setItem(titleKey, inputTitle);
    setTitle(inputTitle);
    closeModal();
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  useEffect(() => {
    const labelTitle = localStorage.getItem(titleKey);
    if (!labelTitle) {
      localStorage.setItem(titleKey, 'List Data');
      setTitle('List Data');
    } else {
      setTitle(labelTitle);
      setInputTitle(labelTitle);
    }
  }, []);

  return (
    <>
      <div className={cn('w-full flex flex-col gap-1', className)}>
        <div className="flex items-center gap-1">
          <h5 className="text-2xl font-bold">{title}</h5>
          <img
            className="hover:cursor-pointer"
            src={IconSetting}
            alt="IconSetting"
            onClick={openModal}
          />
        </div>
        <p className="text-md">{subTitle}</p>
      </div>
      <ModalEID width={700} open={open} onCancel={closeModal} onOk={okHandler}>
        <ModalEID.Header title="Settings Table Title" subtitle="Manage title of table" />
        <ModalEID.Body>
          <FormLabel label="Title" />
          <Input size="large" type="text" value={inputTitle} onChange={inputHandler} />
        </ModalEID.Body>
        <ModalEID.Footer />
      </ModalEID>
    </>
  );
};

export default EditableLabel;
