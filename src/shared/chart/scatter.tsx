import useColor from '@/core/hooks/use-color';
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

// 🧩 Register semua komponen yang diperlukan untuk scatter chart
ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  zoomPlugin,
  dataLabelPlugin,
  annotationPlugin,
);

const defaultDatasetConfig = {
  label: 'Dataset',
  data: [],
  backgroundColor: '#2798FF',
  pointRadius: 6,
  pointHoverRadius: 8,
};

interface ScatterChartProps extends Omit<ChartProps, 'labels'> {}
const ScatterChart = forwardRef<ChartJSOrUndefined, ScatterChartProps>(
  ({ datasets, options, plugins }, ref) => {
    const { colorList } = useColor();
    const defaultTooltipConfig = useDefaultTooltip();

    const [dataChart, setDataChart] = useState<ChartConfiguration['data']>({
      datasets: [defaultDatasetConfig],
    });

    useEffect(() => {
      if (!datasets || datasets.length === 0) {
        setDataChart({ datasets: [] });
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
        backgroundColor: 'transparent',
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            grid: {
              color: colorList.border ?? '#D0D1DD',
            },
            ticks: {
              color: colorList['text-secondary'] ?? '#4C4E67',
            },
          },
          y: {
            grid: {
              color: colorList.border ?? '#D0D1DD',
            },
            ticks: {
              color: colorList['text-secondary'] ?? '#4C4E67',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              useBorderRadius: true,
              font: {
                family: 'Inter',
                size: 16,
                weight: 500,
              },
              boxHeight: 16,
              boxWidth: 16,
              // @ts-ignore
              generateLabels: (chart) => {
                const {
                  data: { datasets },
                } = chart;

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
          tooltip: {
            ...defaultTooltipConfig,
            callbacks: {
              label: (ctx) => {
                const { x, y } = ctx.raw as { x: number; y: number };
                return `x: ${x}, y: ${y}`;
              },
            },
          },
          datalabels: {
            display: false,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              drag: {
                enabled: true,
              },
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
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
          type="scatter"
          options={mergedChartOptions}
          data={dataChart}
          plugins={chartPlugins}
        />
      </div>
    );
  },
);

export default ScatterChart;
