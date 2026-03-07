import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { deepMerge } from '@/core/utils/global.utils';
import { ArcElement, ChartConfiguration, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { PieChartProps } from './utils/types';

ChartJS.register(Legend, Tooltip, ArcElement);
const defaultDatasetsConfig = {
  data: [],
  backgroundColor: [],
  borderColor: '#fefefe',
  hoverOffset: 8,
};

const PieChart = forwardRef<ChartJSOrUndefined, PieChartProps>(
  ({ labels, datasets, options, plugins = [] }, ref) => {
    const { colorList } = useColor();
    const [dataChart, setDataChart] = useState<ChartConfiguration['data']>({
      labels: labels,
      datasets: [defaultDatasetsConfig],
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
        animation: {
          duration: 1000,
        },
        layout: {
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
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
              color: colorList['text-secondary'] ?? '#4C4E67',
              boxHeight: 16,
              boxWidth: 16,
              borderRadius: 2,
              // @ts-ignore
              generateLabels: (chart) => {
                const {
                  data: { labels, datasets },
                } = chart;

                return datasets?.[0]?.data?.map((_, index) => ({
                  text: labels[index],
                  textAlign: 'center',
                  fillStyle: datasets[0].borderColor[index],
                  strokeStyle: 'transparent',
                  borderRadius: 9,
                  fontColor: colorList['text-secondary'] ?? '#4C4E67',
                }));
              },
            },
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: true,
            align: 'center',
            font: {
              size: 12,
              weight: 600,
              family: 'Inter',
            },
            color: '#FFF',
            formatter: function (value) {
              return value + '%';
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
      const temp = [ChartDataLabels];
      if (plugins) {
        temp.push(...plugins);
      }
      return temp;
    }, [plugins]);

    return (
      <div className={cn(`w-full h-full`)}>
        <Chart
          ref={ref}
          type="pie"
          plugins={chartPlugins}
          data={dataChart}
          options={mergedChartOptions}
        />
      </div>
    );
  },
);

export default PieChart;
