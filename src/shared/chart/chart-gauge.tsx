import useDarkMode from '@/core/hooks/use-dark-mode';
import { Gauge } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import { DataChart, IRealtimeDashboard } from './utils/types';

const GaugeChart = ({ dataChart, className }: DataChart) => {
  const { colorTheme } = useDarkMode();
  const [data, setData] = useState<IRealtimeDashboard>();

  useEffect(() => {
    if (dataChart) {
      setData({
        maximum: dataChart?.maximum || 0,
        limited: dataChart?.medium || 0,
        target: dataChart?.minimum || 0,
        value: dataChart?.value || 0,
        unit: dataChart?.unit_trashelod || '',
      });
    }
  }, [dataChart]);

  if (!data) return null;

  return (
    <Gauge
      className={`${className}`}
      style={{
        height: '90%',
      }}
      indicator={{
        pointer: {
          style: {
            stroke:
              data?.value < data?.target
                ? '#4CAF50'
                : data?.value < data?.limited
                  ? '#FBC02D'
                  : '#EF5B53',
          },
        },
        pin: {
          style: {
            stroke:
              data?.value < data?.target
                ? '#4CAF50'
                : data?.value < data?.limited
                  ? '#FBC02D'
                  : '#EF5B53',
          },
        },
      }}
      axis={{
        label: {
          formatter: (value: never) => {
            return (Number(value) * data?.maximum).toFixed(0);
          },
          style: {
            fill: colorTheme == 'dark' ? 'black' : 'white',
            fillOpacity: 0.7,
          },
        },
      }}
      range={{
        color: ['#4CAF50', '#FBC02D', '#EF5B53'],
        ticks: [
          0,
          isNaN(data?.target / data?.maximum) ? 0 : data?.target / data?.maximum,
          isNaN(data?.limited / data?.maximum) ? 0 : data?.limited / data?.maximum,
          1,
        ],
      }}
      percent={data?.value / data?.maximum}
      statistic={{
        title: {
          formatter: () => {
            return Math.round(data.value).toString();
          },
          style: ({ percent }: { percent: number }) => {
            const { target, limited, maximum } = data;
            const value = Number(percent) * maximum;

            return {
              fontSize: '32px',
              lineHeight: 2,
              fontFamily: 'Sora',
              color: value < target ? '#4CAF50' : value < limited ? '#FBC02D' : '#EF5B53',
            };
          },
        },
        content: {
          offsetY: 12,
          formatter: () => {
            return data.unit;
          },
          style: {
            fontSize: '24px',
            lineHeight: '81px',
            fontFamily: 'Inter',
            color: colorTheme == 'dark' ? '#3D3E42' : '#FFF',
            opacity: 1,
          },
        },
      }}
      tooltip={{}}
    />
  );
};

export default GaugeChart;
