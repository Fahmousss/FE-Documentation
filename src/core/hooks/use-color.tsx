import { COLOR_THEME, colorTheme } from '@/pages/layout/utils/constant';
import { useAppSelector } from '../store/hooks';

export default function useColor() {
  const { theme } = useAppSelector((state) => state.applicationTheme);
  const selectedTheme = colorTheme.find((item) => item.name === theme);

  return {
    name: COLOR_THEME[theme],
    color: selectedTheme?.color,
    colorList: selectedTheme?.colorList,
  };
}
