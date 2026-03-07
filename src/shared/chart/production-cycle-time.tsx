import LineChart from '@/shared/chart/line';
import Label from '@/shared/header/label';
import { useMemo, useState } from 'react';

interface DataRealtimeCycleTime {
  Labels: string[];
  Values: number[];
}

export const PRODUCTION_CYCLE_TIME_DATA = {
  labels: Array.from({ length: 50 }, (_, i) => {
    const hour = 7 + Math.floor(i / 6);
    const minute = (i % 6) * 10;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }),
  datasets: [
    {
      label: 'Cycle Time',
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 800) + 50),
      borderColor: '#10B981',
      backgroundColor: '#10B981',
    },
  ],
  modelChanges: [
    { position: 8, model: 'K2FA', idealCT: 100 },
    { position: 25, model: 'HK1A1', idealCT: 120 },
    { position: 42, model: 'HKV21', idealCT: 110 },
  ],
  threshold: 6,
};

// Format date helpers
const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const formatDateLabel = (dateStr: string) => {
  // "2025-10-30 11:29:36.696" -> "30 Okt 11:29:36"
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = MONTH_NAMES_SHORT[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day} ${month} ${hours}:${minutes}:${seconds}`;
};

const getMonthRange = (labels: string[]) => {
  if (!labels || labels.length === 0) return '';

  const firstDate = new Date(labels[0]);
  const lastDate = new Date(labels[labels.length - 1]);

  const firstMonth = MONTH_NAMES_SHORT[firstDate.getMonth()];
  const lastMonth = MONTH_NAMES_SHORT[lastDate.getMonth()];

  if (firstMonth === lastMonth) {
    return ` (${firstMonth})`;
  }
  return ` (${firstMonth} - ${lastMonth})`;
};

const ProductionCycleTime = () => {
  const [dataCycleTime, setDataCycleTime] = useState<DataRealtimeCycleTime>({
    Labels: [],
    Values: [],
  });

  // Format labels for chart
  const formattedLabels = useMemo(() => {
    if (dataCycleTime?.Labels?.length) {
      return dataCycleTime.Labels.map(formatDateLabel);
    }
    return PRODUCTION_CYCLE_TIME_DATA.labels;
  }, [dataCycleTime]);

  // Generate title with month range
  const chartTitle = useMemo(() => {
    const monthRange = getMonthRange(dataCycleTime?.Labels);
    return `Production Cycle Time${monthRange}`;
  }, [dataCycleTime]);

  const datasetsWithFill = useMemo(() => {
    return PRODUCTION_CYCLE_TIME_DATA.datasets.map((dataset) => ({
      ...dataset,
      fill: true,
      backgroundColor: 'rgba(1, 183, 99, 0.3)',
      borderColor: '#01B763',
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      tension: 0.4,
    }));
  }, []);

  // Generate dynamic annotations for thresholds and model labels
  const chartOptions = useMemo(() => {
    const annotations: Record<string, any> = {};

    const maxDataValue = dataCycleTime?.Values?.length
      ? Math.max(...dataCycleTime?.Values)
      : Math.max(...PRODUCTION_CYCLE_TIME_DATA?.datasets[0]?.data);

    const dynamicMax = Math.ceil((maxDataValue * 1.1) / 100);

    // Add initial threshold (before first model)
    if (PRODUCTION_CYCLE_TIME_DATA.modelChanges.length > 0) {
      const firstModel = PRODUCTION_CYCLE_TIME_DATA.modelChanges[0];
      annotations['threshold0'] = {
        type: 'line' as const,
        scaleID: 'y',
        value: firstModel.idealCT,
        xMin: 0,
        xMax: firstModel.position,
        borderColor: '#EF4444',
        borderWidth: 2,
      };
    }

    // Generate threshold and label for each model segment
    PRODUCTION_CYCLE_TIME_DATA.modelChanges.forEach((change, index) => {
      const isLastModel = index === PRODUCTION_CYCLE_TIME_DATA.modelChanges.length - 1;
      const segmentStart = change.position;
      const segmentEnd = isLastModel
        ? formattedLabels.length - 1
        : PRODUCTION_CYCLE_TIME_DATA.modelChanges[index + 1].position;

      // Threshold line for this model segment
      annotations[`threshold${index + 1}`] = {
        type: 'line' as const,
        scaleID: 'y',
        value: change.idealCT,
        xMin: segmentStart,
        xMax: segmentEnd,
        borderColor: '#EF4444',
        borderWidth: 2,
      };

      // Model label at center of segment
      const labelXPosition = segmentStart + (segmentEnd - segmentStart) / 2;
      const labelYPosition = change.idealCT + dynamicMax * 0.05;

      annotations[`model${index + 1}`] = {
        type: 'label' as const,
        xValue: labelXPosition,
        yValue: labelYPosition,
        content: change.model,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 4,
        padding: 6,
        font: {
          size: 11,
          weight: 'bold' as const,
          family: 'Inter',
        },
        color: '#1F2937',
      };
    });

    return {
      plugins: {
        datalabels: {
          display: false,
        },
        legend: {
          display: false,
        },
        annotation: {
          annotations,
          clip: false,
        },
        tooltip: {
          callbacks: {
            title: function (context: any) {
              // Show formatted date in tooltip
              const index = context[0].dataIndex;
              if (dataCycleTime?.Labels?.[index]) {
                return formatDateLabel(dataCycleTime.Labels[index]);
              }
              return context[0].label;
            },
            label: function (context: any) {
              return `Cycle Time: ${context.parsed.y} sec`;
            },
          },
        },
      },
      scales: {
        y: {
          max: dynamicMax,
          min: 0,
          beginAtZero: true,
          ticks: {
            stepSize: Math.ceil(dynamicMax / 5),
            callback: function (value: any) {
              return value + ' s';
            },
          },
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            autoSkip: true,
            maxTicksLimit: 10,
            font: {
              size: 10,
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
      },
    };
  }, [dataCycleTime, formattedLabels]);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <Label title={chartTitle} />
      </div>

      {/* Chart */}
      <div className="h-full">
        <LineChart
          labels={formattedLabels}
          datasets={
            dataCycleTime?.Values?.length
              ? [
                  {
                    label: 'Cycle Time',
                    data: dataCycleTime.Values,
                    fill: true,
                    backgroundColor: 'rgba(1, 183, 99, 0.3)',
                    borderColor: '#01B763',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    tension: 0.4,
                  },
                ]
              : datasetsWithFill
          }
          threshold={undefined}
          options={chartOptions as any}
        />
      </div>
    </>
  );
};

export default ProductionCycleTime;
