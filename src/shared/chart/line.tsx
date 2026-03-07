import useColor from '@/core/hooks/use-color';
import { scientificFormatter } from '@/core/utils/formatter.utils';
import { deepMerge } from '@/core/utils/global.utils';
import {
  CategoryScale,
  ChartConfiguration,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
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
import { scientificFormatterCallback } from './utils/formatter';
import { ChartProps } from './utils/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin,
  dataLabelPlugin,
);

const defaultDatasetsConfig = {
  label: 'Dataset',
  borderColor: '#2798FF',
  backgroundColor: '#2798FF',
  tension: 0.4,
  borderRadius: 4,
  borderWidth: 2,
  pointBorderWidth: 4,
  pointRadius: 6,
  fill: false,
  showLine: true,
};

const LineChart = forwardRef<ChartJSOrUndefined, ChartProps>(
  ({ labels, threshold, datasets, options, plugins }, ref) => {
    const { colorList } = useColor();
    const defaultTooltipConfig = useDefaultTooltip();
    const [dataChart, setDataChart] = useState<ChartConfiguration['data']>({
      labels,
      datasets: [
        {
          ...defaultDatasetsConfig,
          data: [],
        },
      ],
    });

    useEffect(() => {
      if (!datasets || datasets.length === 0) {
        setDataChart(() => ({
          labels: [],
          datasets,
        }));
        return;
      }

      setDataChart({
        labels,
        datasets: datasets.map((data) => ({
          ...defaultDatasetsConfig,
          ...data,
        })),
      });
    }, [datasets]);

    const baseChartOptions = useMemo<ChartConfiguration['options']>(
      () => ({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 16,
            left: 0,
            right: 0,
            bottom: 0,
          },
        },
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 16,
                weight: 500,
                family: 'Inter',
              },
              padding: 6,
              color: colorList['text-secondary'] ?? '#4C4E67',
              callback: scientificFormatterCallback,
            },
            grid: {
              color: colorList.border ?? '#D0D1DD',
            },
            position: 'left',
          },
          x: {
            ticks: {
              font: {
                size: 16,
                weight: 500,
                family: 'Inter',
              },
              padding: 6,
              color: colorList['text-secondary'] ?? '#4C4E67',
            },
            grid: {
              display: false,
            },
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
                  fillStyle: item.borderColor,
                  strokeStyle: 'transparent',
                  borderRadius: 9,
                  fontColor: colorList['text-secondary'] ?? '#4C4E67',
                }));
              },
            },
          },
          zoom: {
            pan: {
              enabled: false,
              mode: 'x',
            },
            zoom: {
              drag: {
                enabled: false,
              },
              wheel: {
                enabled: false,
              },
              pinch: {
                enabled: false,
              },
              mode: 'x', // Zoom in the x direction
            },
          },
          tooltip: defaultTooltipConfig,
          datalabels: {
            font: {
              size: 12,
              family: 'Inter',
              weight: 600,
            },
            color: colorList['text-primary'] ?? '#1B1C22',
            align: 'top',
            offset(context) {
              const chart = context.chart;
              const { top } = chart.chartArea;
              return -(chart.scales.y.getPixelForValue(chart.scales.y.max) - top - 5);
            },
            formatter: (value) => {
              return scientificFormatter(value);
            },
          },
          annotation: {
            annotations: [
              {
                id: 'plan',
                type: 'line' as const,
                scaleID: 'y',
                value: threshold,
                borderColor: '#F04438',
                borderWidth: 2,
                label: {
                  content: 'Plan',
                },
              },
            ],
          },
        },
      }),
      [colorList],
    );

    const mergedChartOptions = useMemo(() => {
      return deepMerge(baseChartOptions, options ?? {});
    }, [options, baseChartOptions]);

    const chartPlugins = useMemo(() => {
      const temp: Plugin[] = [zoomPlugin, annotationPlugin];
      if (plugins) {
        temp.push(...plugins);
      }
      return temp;
    }, [plugins]);

    return (
      <div className="w-full h-full">
        <Chart
          ref={ref}
          type="line"
          options={mergedChartOptions}
          data={dataChart}
          plugins={chartPlugins}
        />
      </div>
    );
  },
);

export default LineChart;
