import { RefetchContext } from '@/core/hooks/use-refetch-context';
import { useAppDispatch } from '@/core/store/hooks';
import { setApplicationTheme } from '@/core/store/slice/theme.slice';
import { isCurrentPageInSidebar } from '@/core/utils/global.utils';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useApplicationTheme from '../hooks/use-application-theme';
import useApplicationThemeMutation from '../hooks/use-application-theme-mutation';
import { COLOR_THEME } from '../utils/constant';
import FloatButtonEid from './float-button';

const LayoutFloatButton = () => {
  // const dispatch = useAppDispatch();
  const location = useLocation();
  const hideFloatButton = isCurrentPageInSidebar(location.pathname);
  // const { dataApplicationTheme, refetchApplicationTheme, isLoadingApplicationTheme } =
  //   useApplicationTheme();
  // const { addApplicationTheme } = useApplicationThemeMutation();

  // useEffect(() => {
  //   if (!isLoadingApplicationTheme) {
  //     if (dataApplicationTheme) {
  //       dispatch(
  //         setApplicationTheme({
  //           id: dataApplicationTheme.id,
  //           theme: COLOR_THEME[dataApplicationTheme.color as keyof typeof COLOR_THEME],
  //         }),
  //       );
  //     } else {
  //       addApplicationTheme({
  //         color: COLOR_THEME[COLOR_THEME.BLUE].toString(),
  //       }).then(() => {
  //         refetchApplicationTheme();
  //       });
  //     }
  //   }
  // }, [dataApplicationTheme, isLoadingApplicationTheme]);
  return (
    <RefetchContext.Provider value={{ refetch: () => {} }}>
      {!hideFloatButton && <FloatButtonEid />}
    </RefetchContext.Provider>
  );
};

export default LayoutFloatButton;
