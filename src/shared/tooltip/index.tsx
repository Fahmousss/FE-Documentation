import { Tooltip } from 'antd';
import { ReactNode } from 'react';

interface ToolTipEIDProps {
  children: ReactNode;
  title: string;
  placement:
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight';
}

const TooltipEID = ({ children, title, placement }: ToolTipEIDProps) => {
  return (
    <Tooltip placement={placement} title={title}>
      {children}
    </Tooltip>
  );
};

export default TooltipEID;
