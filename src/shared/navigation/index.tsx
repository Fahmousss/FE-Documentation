import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FAKER_NAVIGATION } from './constant';

const NavigationEID = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const activeIndex = FAKER_NAVIGATION.findIndex(
      (item) =>
        currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path)),
    );

    if (activeIndex !== -1 && navRef.current) {
      const navItems = navRef.current.querySelectorAll('.nav-item');
      if (navItems[activeIndex]) {
        const activeItem = navItems[activeIndex];
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        // Calculate relative position
        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
          opacity: 1,
        });
      }
    }
  }, [currentPath]);

  return (
    <div
      ref={navRef}
      className="flex gap-1 bg-green-700 px-3.5 py-2.5 rounded-full relative overflow-hidden"
    >
      {/* Active background indicator */}
      <div
        className="absolute h-8 bg-green-600 rounded-full transition-all duration-500 ease-in-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
        }}
      />

      {FAKER_NAVIGATION?.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <Link
            to={item.path}
            className={`nav-item px-4 text-white text-base py-2 rounded-full text-center justify-center flex gap-1.5 items-center transition-colors duration-200 hover:text-white relative z-10`}
            key={`navigation-${index}`}
          >
            <IconComponent mode={'white'} width={16} height={16} />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationEID;
