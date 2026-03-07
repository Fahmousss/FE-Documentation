import NavbarActions from '@/shared/navbar/components/navbar-actions';
import NavbarBrand from '@/shared/navbar/components/navbar-brand';
import NavbarWrapper from '@/shared/navbar/components/navbar-wrapper';
import NavbarBreadcrumb from './components/navbar-breadcrumb';

const LayoutNavbar = () => {
  return (
    <NavbarWrapper>
      <NavbarBrand />
      <NavbarActions /> 
    </NavbarWrapper>
  );
};

export default LayoutNavbar;
