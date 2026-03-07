import { AlertProps } from '@/shared/alert/types';
import { MessageArgsProps } from 'antd';

export interface OpenMessageConfig
  extends Omit<MessageArgsProps, 'content' | 'type' | 'className' | 'style'>,
    Pick<AlertProps, 'action' | 'mode' | 'title' | 'message'> {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
}
