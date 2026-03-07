import useDarkMode from '@/core/hooks/use-dark-mode';
import { useAppDispatch } from '@/core/store/hooks';
import { setTheme } from '@/core/store/slice/dark-mode.slice';
import { useEffect, useState } from 'react';

const DarkModeSwitch = () => {
  const dispatch = useAppDispatch();
  const { colorTheme } = useDarkMode();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(colorTheme === 'dark');
  }, [colorTheme]);

  const toggleDarkMode = () => {
    setIsChecked(!isChecked);
    dispatch(setTheme(colorTheme));
    localStorage.setItem('theme', colorTheme);
  };

  return (
    <label className="inline-flex items-center cursor-pointer bg-transparent">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div className="relative w-14 h-8 bg-green-500 dark:bg-grey-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:duration-300 after:bg-[url('@/assets/icons/sun.svg')] dark:after:bg-[url('@/assets/icons/moon.svg')] after:bg-no-repeat after:bg-cover dark:after:bg-grey-400 dark:border-gray-600"></div>
    </label>
  );
};

export default DarkModeSwitch;
