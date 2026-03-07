import useColor from '@/core/hooks/use-color';
import { deepMerge } from '@/core/utils/global.utils';
import {
  ArcElement,
  ChartData,
  ChartDataset,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Plugin,
  Tooltip,
} from 'chart.js';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { ChartProps } from './utils/types';

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultDatasetsConfig: Partial<ChartDataset<'doughnut'>> = {
  data: [],
  borderColor: '#F2F2F7',
  borderWidth: 3,
  circumference: 360,
};

const RadialChart = forwardRef<ChartJSOrUndefined<'doughnut'>, ChartProps>(
  ({ labels, datasets, options, plugins = [] }, ref) => {
    const { colorList } = useColor();
    const [dataChart, setDataChart] = useState<ChartData<'doughnut'>>({
      labels: [],
      datasets: [defaultDatasetsConfig as ChartDataset<'doughnut'>],
    });

    const baseChartOptions = useMemo<ChartOptions<'doughnut'>>(
      () => ({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: (ctx) => {
            const right = ctx.chart.width / 4;
            return {
              top: 10,
              bottom: 10,
              right,
            };
          },
        },
        plugins: {
          tooltip: { enabled: false },
          legend: {
            display: true,
            position: 'right',
            maxWidth: 300,
            labels: {
              useBorderRadius: true,
              font: {
                family: 'Inter',
                size: 16,
                weight: 500,
              },
              color: colorList['text-secondary'] ?? '#4C4E67',
              boxHeight: 16,
              boxWidth: 16,
              borderRadius: 2,
              // @ts-ignore
              generateLabels: (chart) => {
                const {
                  data: { datasets },
                } = chart;

                return datasets.map((dataset, i) => ({
                  text: [`${dataset.label ?? ''}`, `${dataset.data?.[0]}%`],
                  fillStyle:
                    (Array.isArray(dataset.backgroundColor)
                      ? dataset.backgroundColor[0]
                      : dataset.backgroundColor) || '#ccc',
                  strokeStyle: 'transparent',
                  hidden: false,
                  fontColor: colorList['text-secondary'],
                  datasetIndex: i,
                }));
              },
            },
          },
          datalabels: { display: false },
        },
      }),
      [colorList],
    );

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
        datasets: datasets.map(
          (data) =>
            ({
              ...defaultDatasetsConfig,
              ...data,
            }) as ChartDataset<'doughnut'>,
        ),
      });
    }, [datasets, labels]);

    const mergedChartOptions = useMemo(() => {
      return deepMerge(baseChartOptions, options as ChartOptions<'doughnut'>);
    }, [options, baseChartOptions]);

    const chartPlugins = useMemo<Plugin<'doughnut'>[]>(
      () => (plugins ? [...plugins] : []),
      [plugins],
    );

    return (
      <div className="w-full h-full">
        <Chart
          ref={ref}
          type="doughnut"
          data={dataChart}
          options={mergedChartOptions}
          plugins={chartPlugins}
        />
      </div>
    );
  },
);

export default RadialChart;
