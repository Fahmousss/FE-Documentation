import useColor from '@/core/hooks/use-color';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/navbar';
import Sidebar from '../../shared/sidebar';
import LayoutContentEID from './components/layout-content';
import LayoutFloatButton from './components/layout-float-button';
import LayoutFooterEID from './components/layout-footer';

function Layout() {
  const navigate = useNavigate();
  const { colorList } = useColor();

  useEffect(() => {
    //  delete comment this line to enable authentication check
    // if (!Cookies.get(ACCESS_TOKEN)) {
    //   navigate('/login');
    // }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (colorList) {
      root.style.setProperty('--scrollbar-thumb', colorList.border);
      root.style.setProperty('--scrollbar-track', colorList.secondary);
      root.style.setProperty('--scrollbar-thumb-hover', colorList.border);
      // root.style.setProperty('--background', colorList.border);
      root.style.setProperty('--scrollbar-width', '0.5px');
    }
  }, [colorList]);

  return (
    <div className=" min-h-screen bg-gray-100 flex flex-col">
      <Sidebar />
      <Navbar />

      <main className="flex-1">
        <LayoutContentEID />
      </main>

      <LayoutFooterEID />
    </div>

  );
}

export default Layout;
