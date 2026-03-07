import { ModalHeaderProps } from './types';

const ModalHeader = ({ title, subtitle, icon }: ModalHeaderProps) => {
  return (
    <div className="flex items-center gap-1 pb-2 border-b border-b-grey-200">
      {icon && <img src={icon} width={24} height={24} />}

      <div className="flex flex-col justify-center">
        <h5 className="text-lg font-bold text-grey-500">{title}</h5>
        <p className="font-normal text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default ModalHeader;
