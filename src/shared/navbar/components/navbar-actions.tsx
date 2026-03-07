import { cn } from '@/core/utils/class.utils';
// import DarkModeSwitch from '@/shared/dark-mode-switch';
// import NavbarNotification from './navbar-notification';
// import NavbarProfile from './navbar-profile';
import NavbarTime from './navbar-time';

const NavbarActions = () => {
  return (
    <div className={cn('min-w-fit flex justify-start items-center gap-6 mr-6')}>
      <NavbarTime />
      {/* <NavbarNotification />
      <NavbarProfile /> */}
      {/* <DarkModeSwitch /> */}
    </div>
  );
};

export default NavbarActions;
