import { ColorThemeProps } from './model';


export enum COLOR_THEME {
  DEFAULT,
  DARK,
  ADVICS,
  BLUE,
  RED,
  YELLOW,
  GREEN,
}
interface ColorTheme extends ColorThemeProps {
  colorList: DefaultColor;
}

const LIGHT_COLOR = {
  bg: '#F2F2F7',
  component: "#F9F9FB",
  // nav: '#FFFFFF',
  nav: {
    bg: '#FFFFFF',
    fontSidebar: '#4C4E67',
    fontSidebarActive: '#01A75A',
    sidebarAccent: '#E6F8EF',
    border: '#D0D1DD',
  },
  form: {
    bg: '#F9F9FB',
    border: '#D0D1DD',
    fontTitle: '#24262B',
    fontDisabled: '#4C4E67',
    typing: '#01B763',
    value: '#24262B',
    success: '#01B763',
    error: '#F04438',
    disabled: '#E4E4EC',
    fontPlaceholder: '#A1A2B3',
  },
  card: '#FFFFFF',
  border: '#D0D1DD',
  'text-primary': '#24262B',
  'text-secondary': '#4C4E67',
  placeholder: '#A1A2B3',
  table: '#F2F2F7',
  primary: '#01B763',
  secondary: '#F2F2F7',
  accent: '#8ADEB7',
  success: '#E6F8EF',
  warning: '#FFF8E0',
  info: '#E9F5FF',
  danger: '#FEF3F2',
  orange: '#FFEED6',
  purple: '#F6F5FF',
} as const;

type DefaultColor = Record<keyof typeof LIGHT_COLOR, any>;

const DARK_COLOR = {
  bg: '#222325',
  nav: {
    bg: '#2C2D2F',
    fontSidebar: '#AEB2B7',
    fontSidebarActive: '#E6F8EF',
    sidebarAccent: '#004D2A',
    border: '#3D3E42',
  },
  form: {
    bg: '#343537',
    border: '#3D3E42',
    fontTitle: '#FAFAFA',
    fontDisabled: '#AEB2B7',
    typing: '#01B763',
    value: '#FAFAFA',
    success: '#01B763',
    error: '#F04438',
    disabled: '#45474A',
    fontPlaceholder: '#7B7E82',
  },
  card: '#2C2D2F',
  border: '#3D3E42',
  'text-primary': '#FAFAFA',
  'text-secondary': '#AEB2B7',
  placeholder: '#7B7E82',
  table: '#343537',
  primary: '#01B763',
  secondary: '#1A1E24',
  accent: '#016536',
  success: '#004D2A',
  warning: '#997300',
  info: '#195580',
  danger: '#911E1A',
  orange: '#B86E00',
  purple: '#30377D',
} as DefaultColor;

const ADVICS_COLOR = {
  bg: '#09142B',
  nav: {
    bg: '#0A1832',
    fontSidebar: '#FAFAFA',
    fontSidebarActive: '#24262B',
    sidebarAccent: '#EBB000',
    border: '#4C4E67',
  },
  form: {
    bg: '#283C57',
    border: '#2A3F5D',
    fontTitle: '#FAFAFA',
    fontDisabled: '#7B7E82',
    typing: '#FFC30F',
    value: '#FAFAFA',
    success: '#01B763',
    error: '#F04438',
    disabled: '#3C546D50',
    fontPlaceholder: '#7B7E82',
  },
  card: '#1D2B3F',
  border: '#2A3F5D',
  'text-primary': '#FAFAFA',
  'text-secondary': '#AEB2B7',
  placeholder: '#39567F',
  table: '#31496D',
  primary: '#EBB000',
  secondary: '#1A1E24',
  accent: '#CC9900',
  success: '#004D2A',
  warning: '#997300',
  info: '#195580',
  danger: '#911E1A',
  orange: '#B86E00',
  purple: '#30377D',
} as DefaultColor;

const BLUE_COLOR = {} as DefaultColor;
const RED_COLOR = {} as DefaultColor;
const YELLOW_COLOR = {} as DefaultColor;
const GREEN_COLOR = {} as DefaultColor;

export const colorTheme: ColorTheme[] = [
  {
    name: COLOR_THEME.DEFAULT,
    color: '#01B763',
    colorList: LIGHT_COLOR,
  },
  {
    name: COLOR_THEME.DARK,
    color: '#222325',
    colorList: DARK_COLOR,
  },
  {
    name: COLOR_THEME.ADVICS,
    color: '#09142B',
    colorList: ADVICS_COLOR,
  },
  // {
  //   name: COLOR_THEME.BLUE,
  //   color: '#1890ff',
  //   colorList: BLUE_COLOR,
  // },
  // {
  //   name: COLOR_THEME.RED,
  //   color: '#f5222d',
  //   colorList: RED_COLOR,
  // },
  // {
  //   name: COLOR_THEME.YELLOW,
  //   color: '#fa8c16',
  //   colorList: YELLOW_COLOR,
  // },
  // {
  //   name: COLOR_THEME.GREEN,
  //   color: '#52c41a',
  //   colorList: GREEN_COLOR,
  // },
];