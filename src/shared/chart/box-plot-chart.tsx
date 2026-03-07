import useColor from '@/core/hooks/use-color';
import { scientificFormatter } from '@/core/utils/formatter.utils';
import { deepMerge } from '@/core/utils/global.utils';
import { BoxAndWiskers, BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import {
  CategoryScale,
  ChartConfiguration,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Plugin,
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
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BoxPlotController,
  BoxAndWiskers,
  zoomPlugin,
  dataLabelPlugin,
  annotationPlugin,
);

const defaultDatasetsConfig = {
  data: [],
  itemRadius: 2,
  borderWidth: 1,
  label: 'Dataset',
  borderColor: '#2798FF',
  outlierColor: '#999999',
  backgroundColor: '#2798FF55',
};

const BoxPlotChart = forwardRef<ChartJSOrUndefined, ChartProps>(
  ({ datasets, labels, threshold, thresholdColor, options, plugins }, ref) => {
    const { colorList } = useColor();
    const defaultTooltipConfig = useDefaultTooltip();

    const [dataChart, setDataChart] = useState<ChartConfiguration['data']>({
      labels,
      datasets: [defaultDatasetsConfig],
    });

    useEffect(() => {
      if (!datasets || datasets.length === 0) {
        setDataChart({ labels: [], datasets: [] });
        return;
      }

      setDataChart({
        labels,
        datasets: datasets.map((data) => ({
          ...defaultDatasetsConfig,
          ...data,
        })),
      });
    }, [datasets, labels]);

    const baseChartOptions = useMemo<ChartConfiguration['options']>(
      () => ({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 0,
        },
        animation: {
          duration: 300,
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: colorList['text-secondary'] ?? '#4C4E67',
              font: { family: 'Inter', size: 14, weight: 500 },
            },
            grid: {
              color: colorList.border ?? '#D0D1DD',
            },
          },
          x: {
            ticks: {
              color: colorList['text-secondary'] ?? '#4C4E67',
              font: { family: 'Inter', size: 14, weight: 500 },
            },
            grid: { display: false },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              useBorderRadius: true,
              boxHeight: 14,
              boxWidth: 14,
              font: {
                family: 'Inter',
                size: 14,
                weight: 500,
              },
            },
          },
          tooltip: {
            ...defaultTooltipConfig,
            displayColors: false,
            callbacks: {
              title: (ctx) => `${ctx[0].label}`,
              label: (ctx: any) => {
                const v = ctx.raw;
                if (!v) return [];

                let min: number, q1: number, median: number, q3: number, max: number;

                if (Array.isArray(v)) {
                  [min, q1, median, q3, max] = v;
                } else if (typeof v === 'object') {
                  ({ min, q1, median, q3, max } = v);
                } else {
                  return [];
                }

                return [
                  `Minimum: ${min}`,
                  `Maximum: ${max}`,
                  `Median: ${median}`,
                  `Q1: ${q1}`,
                  `Q3: ${q3}`,
                ];
              },
            },
          },
          datalabels: {
            display: false, // umumnya boxplot tidak pakai datalabel
          },
          annotation: {
            annotations: threshold
              ? [
                  {
                    id: 'threshold-line',
                    type: 'line' as const,
                    scaleID: 'y',
                    value: threshold,
                    borderColor: thresholdColor ?? '#F04438',
                    borderWidth: 1,
                    label: {
                      display: true,
                      content: 'Threshold',
                      position: 'end',
                    },
                  },
                ]
              : [],
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              drag: { enabled: true },
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: 'x',
            },
          },
        },
      }),
      [colorList, threshold, thresholdColor],
    );

    const mergedChartOptions = useMemo(
      () => deepMerge(baseChartOptions, options ?? {}),
      [options, baseChartOptions],
    );

    const chartPlugins = useMemo(() => {
      const temp: Plugin[] = [zoomPlugin];
      if (plugins) temp.push(...plugins);
      return temp;
    }, [plugins]);

    return (
      <div className="w-full h-full">
        <Chart
          ref={ref}
          type="boxplot"
          data={dataChart}
          options={mergedChartOptions}
          plugins={chartPlugins}
        />
      </div>
    );
  },
);

export default BoxPlotChart;
