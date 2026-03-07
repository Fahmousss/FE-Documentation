import useColor from '@/core/hooks/use-color';
import { scientificFormatter } from '@/core/utils/formatter.utils';
import { deepMerge } from '@/core/utils/global.utils';
import {
  ChartConfiguration,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Plugin,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import dataLabelPlugin from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import useDefaultTooltip from './hooks/use-default-tooltip';
import { ChartProps } from './utils/types';

ChartJS.register(
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  dataLabelPlugin,
  annotationPlugin,
);

const defaultDatasetConfig = {
  label: 'Dataset',
  data: [], // [{x, y, r}]
  backgroundColor: '#2798FF',
  borderColor: '#2798FF',
  borderWidth: 1,
};

interface BubbleChartProps extends Omit<ChartProps, 'labels'> {}

const BubbleChart = forwardRef<ChartJSOrUndefined, BubbleChartProps>(
  ({ datasets, threshold, thresholdColor, options, plugins }, ref) => {
    const { colorList } = useColor();
    const defaultTooltipConfig = useDefaultTooltip();

    const [dataChart, setDataChart] = useState<ChartConfiguration['data']>({
      datasets: [defaultDatasetConfig],
    });

    useEffect(() => {
      if (!datasets || datasets.length === 0) {
        setDataChart({ labels: [], datasets: [] });
        return;
      }

      setDataChart({
        datasets: datasets.map((data) => ({
          ...defaultDatasetConfig,
          ...data,
        })),
      });
    }, [datasets]);

    const baseChartOptions = useMemo<ChartConfiguration['options']>(
      () => ({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 0, left: 0, right: 0, bottom: 0 },
        },
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        font: {
          family: 'Inter',
          size: 16,
          weight: 500,
        },
        animation: {
          duration: 300,
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'X Axis',
              color: colorList['text-secondary'] ?? '#4C4E67',
              font: { size: 16, weight: 500, family: 'Inter' },
            },
            ticks: {
              color: colorList['text-secondary'] ?? '#4C4E67',
              callback(value) {
                return scientificFormatter(Number(value));
              },
            },
            grid: {
              color: colorList.border ?? '#D0D1DD',
              lineWidth: 1.5,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Y Axis',
              color: colorList['text-secondary'] ?? '#4C4E67',
              font: { size: 16, weight: 500, family: 'Inter' },
            },
            ticks: {
              color: colorList['text-secondary'] ?? '#4C4E67',
              callback(value) {
                return scientificFormatter(Number(value));
              },
            },
            grid: {
              color: colorList.border ?? '#D0D1DD',
              lineWidth: 1.5,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              useBorderRadius: true,
              font: { family: 'Inter', size: 16, weight: 500 },
              boxHeight: 16,
              boxWidth: 16,
              // @ts-ignore
              generateLabels: (chart) => {
                const { datasets } = chart.data;
                return datasets?.map((item) => ({
                  text: item.label,
                  textAlign: 'center',
                  fillStyle: item.backgroundColor,
                  strokeStyle: 'transparent',
                  borderRadius: 9,
                  fontColor: colorList['text-secondary'] ?? '#4C4E67',
                }));
              },
            },
          },
          datalabels: {
            display: false,
            font: { size: 10, weight: 600, family: 'Inter' },
            color: colorList['text-primary'] ?? '#1B1C22',
            formatter: (value) => `(${value.x}, ${value.y})`,
            anchor: 'center',
            align: 'center',
          },
          tooltip: {
            ...defaultTooltipConfig,
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                const { x, y, r } = context.raw;
                return ` ${label}: x: ${x}, y: ${y}, r: ${r}`;
              },
            },
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: colorList['text-primary'] ?? '#1B1C22',
            bodyColor: colorList['text-primary'] ?? '#1B1C22',
          },
          zoom: {
            pan: { enabled: true, mode: 'xy' },
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              drag: { enabled: true },
              mode: 'xy',
            },
          },
          annotation: threshold
            ? {
                annotations: [
                  {
                    id: 'threshold',
                    type: 'line' as const,
                    scaleID: 'y',
                    value: threshold,
                    borderColor: thresholdColor ?? '#F04438',
                    borderWidth: 1.5,
                    label: {
                      enabled: true,
                      content: 'Threshold',
                      position: 'start',
                    },
                  },
                ],
              }
            : undefined,
        },
      }),
      [colorList],
    );

    const mergedChartOptions = useMemo(() => {
      return deepMerge(baseChartOptions, options ?? {});
    }, [options, baseChartOptions]);

    const chartPlugins = useMemo(() => {
      const temp: Plugin[] = [zoomPlugin];
      if (plugins) temp.push(...plugins);
      return temp;
    }, [plugins]);

    return (
      <div className="w-full h-full">
        <Chart
          ref={ref}
          type="bubble"
          data={dataChart}
          options={mergedChartOptions}
          plugins={chartPlugins}
        />
      </div>
    );
  },
);

export default BubbleChart;
