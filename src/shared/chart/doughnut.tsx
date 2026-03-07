import useColor from '@/core/hooks/use-color';
import { ChartProps } from '@/shared/chart/utils/types';
import { ArcElement, Chart, ChartConfiguration, Legend, Plugin, Tooltip } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import useCenterText from './hooks/use-center-text';
import usePieLabel from './hooks/use-pie-label';

Chart.register(ArcElement, Tooltip, Legend);

const defaultDatasetsConfig = {
  data: [],
  backgroundColor: [],
  borderColor: [],
  borderWidth: 0,
  hoverOffset: 8,
};

const DoughnutChart = ({ labels, datasets }: ChartProps) => {
  const centerText = useCenterText();
  const pieLabel = usePieLabel();
  const { colorList } = useColor();
  const [dataChart, setDataChart] = useState<ChartConfiguration<'doughnut'>['data']>({
    labels,
    datasets: [defaultDatasetsConfig],
  });
  // @ts-ignore
  const chartOptions: ChartConfiguration<'doughnut'>['options'] = useMemo(() => {
    return {
      borderRadius: 12,
      cutout: '70%',
      layout: {
        padding: { top: 32, left: 0, right: 0, bottom: 0 },
      },
      spacing: 8,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            useBorderRadius: true,
            padding: 40,
            font: {
              family: 'Inter',
              size: 16,
              weight: 500,
            },
            color: '#747577',
            boxHeight: 18,
            boxWidth: 18,
            borderRadius: 9,
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
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }, [colorList]);
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
      })) as ChartConfiguration<'doughnut'>['data']['datasets'],
    });
  }, [datasets, labels]);
  return (
    <div className="w-full h-full">
      <Doughnut data={dataChart} options={chartOptions} plugins={[pieLabel, centerText]} />
    </div>
  );
};

export default DoughnutChart;
