import useColor from '@/core/hooks/use-color';
import { scientificFormatter } from '@/core/utils/formatter.utils';
import { deepMerge } from '@/core/utils/global.utils';
import {
  BarElement,
  CategoryScale,
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
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  dataLabelPlugin,
  annotationPlugin,
);

const defaultDatasetsConfig = {
  data: [],
  label: 'Dataset',
  borderRadius: 4,
  backgroundColor: '#2798FF',
};

const BarChart = forwardRef<ChartJSOrUndefined, ChartProps>(
  ({ datasets, labels, threshold, thresholdColor, options, plugins }, ref) => {
    const { colorList } = useColor();
    const defaultTooltipConfig = useDefaultTooltip();
    const [dataChart, setDataChart] = useState<ChartConfiguration['data']>({
      labels,
      datasets: [defaultDatasetsConfig],
    });

    useEffect(() => {
      if (!datasets || datasets.length === 0) {
        setDataChart({
          labels: [],
          datasets: [],
        });
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
    console.log('labels', labels);

    console.log('dataChart', dataChart);

    const baseChartOptions = useMemo<ChartConfiguration['options']>(
      () => ({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
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
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 16,
                weight: 500,
                family: 'Inter',
              },
              color: colorList['text-secondary'] ?? '#4C4E67',
              // callback(tickValue, index, ticks) {
              //   if (typeof tickValue === 'string') return tickValue;
              //   return scientificFormatter(Number(tickValue));
              // },
            },
            grid: {
              color: colorList.border ?? '#D0D1DD',
              lineWidth: 2,
            },
            position: 'left',
            title: {
              text: '',
              color: colorList['text-secondary'] ?? '#4C4E67',
              padding: 0,
              font: {
                size: 16,
                weight: 500,
                family: 'Inter',
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 16,
                weight: 500,
                family: 'Inter',
              },
              color: colorList['text-secondary'] ?? '#4C4E67',
              callback: (value: string | number) => {
                console.log('value x', value);
                return value;
              },
            },
            grid: {
              color: 'transparent',
              display: false,
            },
          },
        },
        // CRITICAL: Set interaction mode for proper hover detection
        interaction: {
          intersect: false,
          mode: 'index',
        },
        hover: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          hoverHighlightPlugin: {
            enabled: true,
          },
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
              enabled: true,
              mode: 'x',
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
              mode: 'x',
            },
          },
          datalabels: {
            font: {
              size: 12,
              family: 'Inter',
              weight: 600,
            },
            color: colorList['text-primary'] ?? '#1B1C22',
            anchor: 'end',
            align: 'top',
            offset(context) {
              const chart = context.chart;
              const { top } = chart.chartArea;
              return -(chart.scales.y.getPixelForValue(chart.scales.y.max) - top + 3);
            },
            formatter: (value) => {
              return scientificFormatter(value);
            },
          },
          tooltip: {
            ...defaultTooltipConfig,
            backgroundColor(ctx, options) {
              return 'rgba(255, 255, 255, 0.95)';
            }, // putih transparan
          },
          annotation: {
            annotations: [
              {
                id: 'plan',
                type: 'line' as const,
                scaleID: 'y',
                value: threshold,
                borderColor: thresholdColor ?? '#F04438',
                borderWidth: 1,
                label: { content: 'Plan' },
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
      const temp: Plugin[] = [zoomPlugin];
      if (plugins) {
        temp.push(...plugins);
      }
      return temp;
    }, [plugins]);

    return (
      <div className="w-full h-full">
        <Chart
          ref={ref}
          type="bar"
          options={mergedChartOptions}
          data={dataChart}
          plugins={chartPlugins}
        />
      </div>
    );
  },
);

export default BarChart;
