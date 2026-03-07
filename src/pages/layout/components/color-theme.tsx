import { useRefetchContext } from '@/core/hooks/use-refetch-context';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setTheme } from '@/core/store/slice/dark-mode.slice';
import { setApplicationTheme } from '@/core/store/slice/theme.slice';
import Check from '@/shared/icon/check';
import { Tooltip } from 'antd';
import useApplicationThemeMutation, {
  IBodyApplicationTheme,
} from '../hooks/use-application-theme-mutation';
import { COLOR_THEME } from '../utils/constant';
import { ColorThemeProps } from '../utils/model';

const ColorTheme = ({ color, name }: ColorThemeProps) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.applicationTheme);
  const isSelected = theme === name;
  console.log(name);
  console.log(theme);
  const onClickHandler = () => {
    if (isSelected) return;
    dispatch(
      setApplicationTheme({
        id: 'id',
        theme: name,
      }),
    );
  };
  return (
    <Tooltip title={COLOR_THEME[name]} placement="bottom">
      <div
        onClick={onClickHandler}
        style={{ backgroundColor: color }}
        className={`flex items-center justify-center w-10 h-10 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-300`}
      >
        {isSelected ? <Check className="text-md text-white" /> : null}
      </div>
    </Tooltip>
  );
};

export default ColorTheme;
