import IconBell from '@/assets/icons/bell.svg';
import { Popover } from 'antd';
import Notification from './notification/notification';

const NavbarNotification = () => {
  return (
    <Popover placement="bottomRight" trigger={'click'} arrow={false} content={<Notification />}>
      <img className="hover:cursor-pointer" src={IconBell} />
    </Popover>
  );
};

export default NavbarNotification;
