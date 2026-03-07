import { OpenMessageConfig } from '@/core/models/use-message.types';
import AlertEID from '@/shared/alert';
import { message } from 'antd';
import { useRef } from 'react';

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const keySelf = useRef(Date.now()).current;
  const onClose = () => {
    messageApi.destroy(keySelf);
  };

  const getPositionStyles = (position: OpenMessageConfig['position'] = 'top-right') => {
    const positions = {
      'top-left': {
        top: '16px',
        left: '16px',
        transform: 'none',
      },
      'top-center': {
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      'top-right': {
        top: '16px',
        right: '16px',
        transform: 'none',
      },
      'bottom-left': {
        bottom: '16px',
        left: '16px',
        transform: 'none',
      },
      'bottom-center': {
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      'bottom-right': {
        bottom: '16px',
        right: '16px',
        transform: 'none',
      },
    };

    return positions[position];
  };

  const openMessage = ({
    mode,
    action,
    message,
    title,
    key = keySelf,
    position = 'top-center',
    ...config
  }: OpenMessageConfig) => {
    const positionStyles = getPositionStyles(position);

    messageApi.open({
      ...config,
      key,
      content: (
        <AlertEID mode={mode} action={action} title={title} message={message} onClose={onClose} />
      ),
    });
  };

  const closeMessage = (key: string) => {
    messageApi.destroy(key);
  };

  return {
    contextHolder,
    openMessage,
    closeMessage,
  };
};

export default useMessage;
