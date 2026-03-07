import useColor from '@/core/hooks/use-color';
import { scientificFormatter } from '@/core/utils/formatter.utils';
import { ChartConfiguration } from 'chart.js';
import { useMemo } from 'react';

export default function useDefaultTooltip() {
  const { colorList } = useColor();

  const defaultTooltipConfig: ChartConfiguration['options']['plugins']['tooltip'] = useMemo(
    () => ({
      padding: {
        x: 12,
        y: 8,
      },
      displayColors: true,
      backgroundColor: colorList.card,
      bodyFont: {
        size: 14,
        family: 'Inter',
        weight: 500,
      },
      titleFont: {
        size: 16,
        family: 'Inter',
        weight: 600,
      },
      borderColor: colorList.border,
      borderWidth: 1,
      titleAlign: 'center',
      titleColor: colorList['text-primary'],
      bodyColor: colorList['text-primary'],
      usePointStyle: true,
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || '';
          const value = context.raw || 0;
          return `${label}: ${scientificFormatter(Number(value))}`;
        },
        labelPointStyle: () => ({
          pointStyle: 'rect',
          rotation: 0,
        }),
        labelColor: (context) => {
          const color = context.dataset.borderColor as string;
          return {
            borderColor: color,
            backgroundColor: color,
          };
        },
      },
    }),
    [colorList],
  );

  return defaultTooltipConfig;
}
