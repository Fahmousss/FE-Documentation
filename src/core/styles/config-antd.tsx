import { ConfigProvider, theme } from 'antd';
import { ReactNode } from 'react';
import useColor from '../hooks/use-color';

const { defaultAlgorithm } = theme;

export default function ConfigProviderAntd({ children }: { children: ReactNode }) {
  const { colorList } = useColor();

  return (
    <ConfigProvider
      componentSize="middle"
      theme={{
        token: {
          fontFamily: 'Inter',
          colorPrimary: colorList.primary,
          colorError: colorList.danger,
        },
        algorithm: defaultAlgorithm,
        components: {
          Input: {
            activeBg: colorList.form.bg,
            colorBgContainer: colorList.form.bg,
            activeBorderColor: colorList.form.border,
            hoverBorderColor: colorList.form.border,
            colorBorder: colorList.form.border,
            colorBgContainerDisabled: colorList.form.bg,
            addonBg: colorList.form.bg,
            fontSize: 12,
            colorTextPlaceholder: colorList.form.fontPlaceholder,
            colorText: colorList.form.value,
            colorIcon: colorList.form.fontPlaceholder,
          },
          Select: {
            optionActiveBg: colorList.form.bg,
            colorBgElevated: colorList.form.bg,
            colorBgContainer: colorList.form.bg,
            multipleItemBorderColor: colorList.primary,
            optionSelectedBg: colorList.accent,
            optionSelectedColor: colorList.form.value,
            optionPadding: 12,
            colorBorder: colorList.form.border,
            activeBorderColor: colorList.form.border,
            hoverBorderColor: colorList.form.border,
            colorBgContainerDisabled: colorList.form.disabled,
            fontSize: 12,
            fontSizeSM: 6,
            optionFontSize: 10,
            colorText: colorList.form.value,
            colorIcon: colorList.form.fontPlaceholder,
          },
          InputNumber: {
            activeBg: colorList.form.bg,
            colorBgContainer: colorList.form.bg,
            activeBorderColor: colorList.form.border,
            hoverBorderColor: colorList.form.border,
            colorBorder: colorList.form.border,
            colorBgContainerDisabled: colorList.form.bg,
            fontSize: 12,
            colorText: colorList.form.value,
            colorIcon: colorList.form.fontPlaceholder,
          },
          DatePicker: {
            colorBgContainer: colorList.component,
            activeBorderColor: colorList.border,
            hoverBorderColor: colorList.border,
            colorBorder: colorList.border,
            colorBgContainerDisabled: colorList.card,
            fontSize: 12,
            colorBgElevated: colorList.form.bg,
            colorIcon: colorList['text-primary'],
            colorIconHover: colorList['text-secondary'],
            colorText: colorList.form.value,
            colorTextBase: colorList.form.value,
            colorTextHeading: colorList.form.value,
            colorTextLabel: colorList['text-secondary'],
            colorTextPlaceholder: colorList.form.fontPlaceholder,
            colorTextDisabled: colorList.form.fontDisabled,
            colorBorderBg: colorList.form.border,
            colorBorderSecondary: colorList.form.border,
            colorBgBase: colorList.form.bg,
            cellActiveWithRangeBg: colorList.accent,
          },
          Message: {
            contentPadding: 0,
            borderRadius: 12
          },
          FloatButton: {
            colorFillContent: colorList.card,
          },
          Calendar: {
            colorBgContainer: colorList.form.bg,
            fontSize: 12,
            colorTextHeading: colorList.form.value,
          },
          Modal: {
            contentBg: colorList.card,
          },
          Checkbox: {
            colorBorder: colorList.form.border,
          },
          Form: {
            itemMarginBottom: 0,
            inlineItemMarginBottom: 0,
            verticalLabelMargin: 0,
            verticalLabelPadding: 2,
          },
          Popover: {
            padding: 0,
            colorBgElevated: colorList.card,
          },
          Rate: {
            starBg: colorList.form.fontPlaceholder,
          },
          Slider: {
            railBg: colorList.form.fontPlaceholder,
            railHoverBg: colorList.form.border,
          },
          Switch: {
            colorTextQuaternary: colorList.form.fontPlaceholder,
            colorTextTertiary: colorList.form.border,
          },
          Radio: {
            colorText: colorList.form.value,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
