import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setShowNavbar } from '@/core/store/slice/navbar.slice';
import { setShowSidebar } from '@/core/store/slice/sidebar.slice';
import CloseNavbar from '@/shared/icon/close-navbar';
import CloseIcon from '@/shared/icon/close-navbar';
import OpenNavbar from '@/shared/icon/open-navbar';
import Paint from '@/shared/icon/paint';
import SettingIcon from '@/shared/icon/setting';
import { Drawer, FloatButton as FloatButtonAntd, Tooltip } from 'antd';
import { useMemo, useState } from 'react';
import { colorTheme } from '../utils/constant';
import ColorTheme from './color-theme';

const FloatButtonEid = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.sidebar);
  const { showNavbar } = useAppSelector((state) => state.navbar);
  const [openFloatButton, setOpenFloatButton] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const onCloseNavigation = () => {
    dispatch(setShowNavbar(false));
    dispatch(setShowSidebar(false));
  };

  const onOpenNavigation = () => {
    dispatch(setShowNavbar(true));
    dispatch(setShowSidebar(true));
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleFloatButton = () => {
    setOpenFloatButton((o) => !o);
  };

  const floatButton = useMemo(() => {
    if (showNavbar && isOpen) {
      return (
        <FloatButtonAntd
          onClick={onCloseNavigation}
          type="primary"
          icon={
            <Tooltip title="Close Navigation" placement="left">
              <CloseNavbar width={20} height={20} />
            </Tooltip>
          }
        />
      );
    } else {
      return (
        <FloatButtonAntd
          onClick={onOpenNavigation}
          type="primary"
          icon={
            <Tooltip title="Open Navigation" placement="left">
              <OpenNavbar width={20} height={20} />
            </Tooltip>
          }
        />
      );
    }
  }, [showNavbar, isOpen]);
  return (
    <>
      <FloatButtonAntd.Group
        open={openFloatButton}
        className="z-[9999]"
        trigger="click"
        type="primary"
        style={{ bottom: 8 }}
        onClick={handleFloatButton}
        icon={
          <Tooltip title="Setting" placement="left">
            <SettingIcon width={20} height={20} />
          </Tooltip>
        }
        closeIcon={
          <Tooltip title="Close" placement="left">
            <CloseIcon width={20} height={20} />
          </Tooltip>
        }
      >
        {floatButton}
        <FloatButtonAntd
          onClick={handleOpenDrawer}
          type="primary"
          icon={
            <Tooltip title="Theme" placement="left">
              <Paint width={20} height={20} />
            </Tooltip>
          }
        />
      </FloatButtonAntd.Group>
      <Drawer
        title={<p className="text-2xl">Application Theme</p>}
        placement={'right'}
        closable={false}
        onClose={handleCloseDrawer}
        open={openDrawer}
      >
        <div className="flex flex-col gap-4">
          <p className="text:md">Please choose your favorite theme:</p>
          <div className="flex flex-wrap items-center gap-4">
            {colorTheme.map((item) => (
              <ColorTheme key={`color-theme-${item.name}`} {...item} />
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FloatButtonEid;
