import useColor from '@/core/hooks/use-color';
import useModal from '@/core/hooks/use-modal';
// import IconPlus from '@/shared/icons/plus';
import InputSearch from '@/shared/form/input-search';
import Logo from '@/shared/icon/logo';
import { ChangeEvent } from 'react';
import { useSidebarContext } from '../hooks/use-sidebar-context';
import ModalSection from './sidebar-section/modal-section';

const SidebarHeader = () => {
  const { openModal, open, closeModal } = useModal();
  const { colorList } = useColor();
  // const { search, setSearch } = useSidebarContext();
  // const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };
  return (
    <>
      <div
        className="w-full flex items-center p-4"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colorList.nav.border,
        }}
      >
        <Logo mode={'default'} className="w-14 h-[39px]" />
      </div>
      {/* <div
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: colorList.nav.border,
          borderBottomColor: colorList.nav.border,
        }}
        className="w-full flex justify-between items-center p-4"
      >
        <InputSearch
          searchHandler={searchHandler}
          value={search}
          size="small"
          className="w-full rounded-lg"
        />
        <IconPlus
          mode={'white'}
          onClick={openModal}
          className="cursor-pointer size-6 bg-transparent border-none"
        />
      </div> */}
      <ModalSection closeModal={closeModal} open={open} />
    </>
  );
};

export default SidebarHeader;
