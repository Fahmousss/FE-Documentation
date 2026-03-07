import useColor from '@/core/hooks/use-color';
import { SignalRProvider, useSignalR } from '@/core/hooks/use-signal-r';
import { getGradient } from '@/core/utils/charts';
import { formatNumber } from '@/core/utils/formatter.utils';
import CardEID from '@/shared/card';
import CardHeader from '@/shared/card/header';
import { CardHeaderProps } from '@/shared/card/types';
import BarChart from '@/shared/chart/bar';
import BoxPlotChart from '@/shared/chart/box-plot-chart';
import BubbleChart from '@/shared/chart/bubble';
import DoughnutChart from '@/shared/chart/doughnut';
import usePieLabel from '@/shared/chart/hooks/use-pie-label';
import LineChart from '@/shared/chart/line';
import PieChart from '@/shared/chart/pie';
import ProductionCycleTime from '@/shared/chart/production-cycle-time';
import RadialChart from '@/shared/chart/radial';
import ScatterChart from '@/shared/chart/scatter';
import { radialChartDatasets } from '@/shared/chart/utils/constant';
import { scientificFormatterCallback } from '@/shared/chart/utils/formatter';
import { pieCenterText } from '@/shared/chart/utils/plugins';
import CustomDatePicker from '@/shared/date-picker/custom-date-picker';
import CustomRangePicker from '@/shared/date-picker/custom-range-picker';
import { PRESETS_RANGE } from '@/shared/date-picker/presets-range';
import Label from '@/shared/header/label';
import CustomSelect from '@/shared/select/custom-select';
import { HubConnectionState } from '@microsoft/signalr';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DATA_SALES = [50, 54, 60, 70, 67, 55, 80, 77, 63, 60, 66, 78];
const DATA_REVENUE = [40, 44, 48, 56, 53, 45, 64, 61, 50, 48, 52, 62];

const DECIMAL_1 = [
  0.00000019, 0.00000031, 0.00000012, 0.00000045, 0.00000066, 0.00000053, 0.00000037, 0.00000072,
  0.00000081, 0.00000064, 0.0000005, 0.00000078,
];

const DECIMAL_2 = [
  0.00000032, 0.00000056, 0.00000025, 0.00000088, 0.0000001, 0.00000047, 0.00000063, 0.00000029,
  0.00000091, 0.00000015, 0.00000054, 0.00000072,
];

const DATASET_A = [
  { x: 100, y: 200, r: 20 },
  { x: 150, y: 100, r: 30 },
  { x: 250, y: 150, r: 25 },
];

const DATASET_B = [
  { x: 50, y: 250, r: 20 },
  { x: 120, y: 300, r: 15 },
  { x: 220, y: 350, r: 25 },
];

const Test = () => {
  const [select, setSelect] = useState<string>('line');
  const { addListener, connectionState, invokeEvent, removeListener } = useSignalR();
  useEffect(() => {
    const argumentsData = {
      viewName: select,
      range: select === 'line' ? 20 : 1,
    };
    if (connectionState === HubConnectionState.Connected) {
      invokeEvent('StreamDummyData', JSON.stringify(argumentsData) as never);
    }
  }, [connectionState, select]);

  useEffect(() => {
    const handleStreamData = (data: string) => {
      const realTimeData = JSON.parse(data);
      console.log(realTimeData);
    };

    // Tambahkan listener untuk event "StreamData"
    addListener('DummyResult', handleStreamData);

    return () => {
      // Hapus listener saat komponen di-unmount
      removeListener('DummyResult');
    };
  }, []);
  return (
    <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)]">
      <div className="w-full flex items-center justify-between pb-0">
        <Label title="Radial Chart" subTitle="This is a radial chart" />
        <CardHeader
          select={{
            display: true,
            value: select,
            handler: (value) => setSelect(value),
            options: [
              {
                label: 'Line',
                value: 'line',
              },
              {
                label: 'Bar',
                value: 'bar',
              },
              {
                label: 'Pie',
                value: 'pie',
              },
            ],
          }}
        />
      </div>
    </CardEID>
  );
};

// Fungsi bantu untuk menambah variasi alami
function generateClusterData(centerX: number, centerY: number, count: number, spread: number) {
  return Array.from({ length: count }, () => ({
    x: centerX + (Math.random() - 0.5) * spread,
    y: centerY + (Math.random() - 0.5) * spread,
  }));
}

const SCATTER_DATA = [
  {
    label: 'Urban Area Sensors',
    backgroundColor: '#2798FF',
    data: [...generateClusterData(30, 40, 50, 10), ...generateClusterData(60, 65, 30, 8)],
  },
  {
    label: 'Rural Area Sensors',
    backgroundColor: '#FFC30F',
    data: [...generateClusterData(15, 20, 40, 12), ...generateClusterData(45, 25, 40, 15)],
  },
  {
    label: 'Industrial Area Sensors',
    backgroundColor: '#34C582',
    data: [...generateClusterData(70, 80, 50, 10), ...generateClusterData(85, 60, 30, 12)],
  },
  {
    label: 'Coastal Sensors',
    backgroundColor: '#FF5A5F',
    data: [...generateClusterData(10, 70, 40, 15), ...generateClusterData(25, 85, 35, 10)],
  },
];

const SubPage = () => {
  const { colorList } = useColor();
  const exportHandler = () => {};
  const filterHandler = () => {};
  const zoomInHandler = () => {};
  const zoomOutHandler = () => {};
  const fullScreenHandler = () => {};
  const handleDateRangeChange = () => {};
  const pieLabel = usePieLabel();

  const options: CardHeaderProps = {
    zoomOut: {
      display: true,
      handler: zoomOutHandler,
    },
    zoomIn: {
      display: true,
      handler: zoomInHandler,
    },
    fullScreen: {
      display: true,
      handler: fullScreenHandler,
    },
    filter: {
      display: true,
      handler: filterHandler,
    },
    export: {
      display: true,
      handler: exportHandler,
    },
    rangePicker: {
      display: true,
      withType: true,
      type: 'day',
      withPresets: true,
      handler: handleDateRangeChange,
    },
    datePicker: {
      display: true,
      dateType: 'month',
      formatDate: 'MMM YYYY',
    },
    select: {
      display: true,
    },
  };

  return (
    <div className="flex flex-wrap h-full gap-3 rounded-md overflow-auto">
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Scatter Chart" subTitle="This is a scatter chart" />
          <CardHeader {...options} />
        </div>
        <ScatterChart datasets={SCATTER_DATA} />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Bubble Chart" subTitle="This is a bubble chart" />
          <CardHeader {...options} />
        </div>
        <BubbleChart
          datasets={[
            {
              label: 'Kota A',
              data: DATASET_A,
              backgroundColor: '#2798FF',
              borderColor: '#2798FF',
            },
            {
              label: 'Kota B',
              data: DATASET_B,
              backgroundColor: '#FFC30F',
              borderColor: '#FFC30F',
            },
          ]}
          options={{
            scales: {
              x: { title: { text: 'Temperature (°C)', display: true } },
              y: { title: { text: 'Humidity (%)', display: true } },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Vertical Box Plat Chart" subTitle="This is a vertical box plat chart" />
          <CardHeader {...options} />
        </div>
        <BoxPlotChart
          labels={['Product 1', 'Product 2', 'Product 3', 'Product 4']}
          datasets={[
            {
              label: 'Revenue',
              data: [
                { min: 3, q1: 5, median: 7, q3: 8, max: 10 },
                { min: 2, q1: 4, median: 6, q3: 8, max: 12 },
                { min: 1, q1: 3, median: 5, q3: 7, max: 9 },
                { min: 4, q1: 5, median: 6, q3: 8, max: 10 },
              ],
              backgroundColor: '#34C58255',
              borderColor: '#34C582',
            },
          ]}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Horizontal Box Plat Chart" subTitle="This is a horizontal box plat chart" />
          <CardHeader {...options} />
        </div>
        <BoxPlotChart
          labels={['Product 1', 'Product 2', 'Product 3', 'Product 4']}
          datasets={[
            {
              label: 'Revenue',
              data: [
                { min: 3, q1: 5, median: 7, q3: 8, max: 10 },
                { min: 2, q1: 4, median: 6, q3: 8, max: 12 },
                { min: 1, q1: 3, median: 5, q3: 7, max: 9 },
                { min: 4, q1: 5, median: 6, q3: 8, max: 10 },
              ],
              backgroundColor: '#34C58255',
              borderColor: '#34C582',
            },
          ]}
          options={{
            indexAxis: 'y' as const,
            interaction: {
              axis: 'y', // penting! kalau tidak dia default ke 'x'
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Line Chart" subTitle="This is a line chart" />
          <CardHeader {...options} />
        </div>
        <LineChart
          labels={MONTH}
          datasets={[
            {
              label: 'Sales',
              data: DECIMAL_1,
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
              pointBackgroundColor: '#2798FF',
              pointBorderColor: '#2798FF40',
            },
            {
              label: 'Revenue',
              data: DECIMAL_2,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
              pointBackgroundColor: '#34C582',
              pointBorderColor: '#34C58240',
            },
          ]}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Line Area Chart" subTitle="This is a line area chart" />
          <CardHeader {...options} />
        </div>
        <LineChart
          labels={MONTH}
          datasets={[
            {
              label: 'Revenue',
              data: DATA_REVENUE,
              borderColor: '#34C582',
              backgroundColor(context) {
                return getGradient(context, ['#34C582', '#34C58240']);
              },
              pointBackgroundColor: 'transparent',
              pointBorderColor: 'transparent',
              fill: true,
            },
            {
              label: 'Sales',
              data: DATA_SALES,
              borderColor: '#2798FF',
              backgroundColor(context) {
                return getGradient(context, ['#2798FF', '#2798FF40']);
              },
              pointBackgroundColor: 'transparent',
              pointBorderColor: 'transparent',
              fill: true,
            },
          ]}
          options={{
            scales: {
              y: {
                max: 100,
              },
            },
            plugins: {
              datalabels: {
                display: false,
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Line Strepped Chart" subTitle="This is a line strepped chart" />
          <CardHeader {...options} />
        </div>
        <LineChart
          labels={MONTH}
          datasets={[
            {
              label: 'Sales',
              data: DATA_SALES,
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
              pointBackgroundColor: 'transparent',
              pointBorderColor: 'transparent',
            },
            {
              label: 'Revenue',
              data: DATA_REVENUE,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
              pointBackgroundColor: 'transparent',
              pointBorderColor: 'transparent',
              borderDash: [6, 4],
            },
          ]}
          options={{
            scales: {
              y: {
                max: 100,
              },
            },
            plugins: {
              datalabels: {
                display: false,
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between">
          <Label title="Stepped Chart" subTitle="This is a stepped chart" />
          <CardHeader {...options} />
        </div>
        <LineChart
          labels={MONTH}
          datasets={[
            {
              label: 'Sales',
              data: DATA_SALES,
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
              pointBackgroundColor: '#2798FF',
              pointBorderColor: '#2798FF40',
              stepped: true,
            },
            {
              label: 'Revenue',
              data: DATA_REVENUE,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
              pointBackgroundColor: '#34C582',
              pointBorderColor: '#34C58240',
              stepped: true,
            },
          ]}
          options={{
            scales: {
              y: {
                max: 100,
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Pareto Chart" subTitle="This is a pareto chart" />
          <CardHeader {...options} />
        </div>
        <BarChart
          labels={MONTH}
          datasets={[
            {
              label: 'Sales',
              data: DATA_SALES,
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
              type: 'line',
              yAxisID: 'y1',
            },
            {
              label: 'Revenue',
              data: DATA_REVENUE,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
            },
          ]}
          options={{
            scales: {
              y: {
                max: 100,
                title: {
                  display: true,
                  text: 'Sales',
                },
              },
              y1: {
                position: 'right',
                min: 0,
                max: 100,
                ticks: {
                  font: {
                    size: 16,
                    weight: 500,
                    family: 'Inter',
                  },
                  padding: 6,
                  color: colorList['text-secondary'],
                  callback: (tickValue: number) => {
                    return `${tickValue}`;
                  },
                },
                grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                title: {
                  display: true,
                  text: 'Revenue',
                  color: colorList['text-secondary'],
                  font: {
                    family: 'Inter',
                    size: 16,
                    weight: 500,
                  },
                },
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Y Bar Chart" subTitle="This is a bar chart" />
          <CardHeader {...options} />
        </div>
        <BarChart
          labels={MONTH}
          datasets={[
            {
              label: 'Sales',
              data: [0, 0.00032919040000000966, 0.00016293119999999183, 0, 0, 0, 0, 0],
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
            },
            {
              label: 'Revenue',
              data: DECIMAL_2,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
            },
          ]}
          options={{
            scales: {
              y: {
                ticks: {
                  callback: scientificFormatterCallback,
                },
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="X Bar Chart" subTitle="This is a bar chart" />
          <CardHeader {...options} />
        </div>
        <BarChart
          labels={MONTH}
          datasets={[
            {
              label: 'Sales',
              data: DATA_SALES,
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
            },
            {
              label: 'Revenue',
              data: DATA_REVENUE,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
            },
          ]}
          options={{
            indexAxis: 'y',
            interaction: {
              axis: 'y', // penting! kalau tidak dia default ke 'x'
            },
            plugins: {
              datalabels: {
                anchor: 'end', // label nempel di ujung bar
                align: 'right', // geser ke kanan bar
                offset(context) {
                  const chart = context.chart;
                  const { right } = chart.chartArea;
                  // ambil pixel max dari sumbu X (karena horizontal → nilai ada di axis X)
                  return right - chart.scales.x.getPixelForValue(chart.scales.x.max) + 3;
                },
                formatter: (value) => {
                  return value;
                },
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Stacked Y Bar Chart" subTitle="This is a bar chart" />
          <CardHeader {...options} />
        </div>
        <BarChart
          labels={MONTH}
          datasets={[
            {
              label: 'Revenue',
              data: DATA_REVENUE,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
            },
            {
              label: 'Sales',
              data: DATA_SALES,
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
            },
          ]}
          options={{
            scales: {
              x: {
                stacked: true,
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Stacked X Bar Chart" subTitle="This is a bar chart" />
          <CardHeader {...options} />
        </div>
        <BarChart
          labels={MONTH}
          datasets={[
            {
              label: 'Revenue',
              data: DATA_REVENUE,
              borderColor: '#34C582',
              backgroundColor: '#34C582',
            },
            {
              label: 'Sales',
              data: DATA_SALES,
              borderColor: '#2798FF',
              backgroundColor: '#2798FF',
            },
          ]}
          options={{
            indexAxis: 'y',
            interaction: {
              axis: 'y', // penting! kalau tidak dia default ke 'x'
            },
            scales: {
              y: {
                stacked: true,
              },
            },
            plugins: {
              datalabels: {
                anchor: 'end', // label nempel di ujung bar
                align: 'right', // geser ke kanan bar
                offset(context) {
                  const chart = context.chart;
                  const { right } = chart.chartArea;
                  // ambil pixel max dari sumbu X (karena horizontal → nilai ada di axis X)
                  return right - chart.scales.x.getPixelForValue(chart.scales.x.max) + 3;
                },
                formatter: (value) => {
                  return value;
                },
              },
            },
          }}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Pie Chart" subTitle="This is a pie chart" />
          <CardHeader {...options} />
        </div>
        <PieChart
          labels={['Sales', 'Revenue', 'Profit']}
          datasets={[
            {
              data: [15, 65, 30],
              backgroundColor: ['#2798FF', '#34C582', '#FFCE56'],
              borderColor: ['#2798FF', '#34C582', '#FFCE56'],
            },
          ]}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Pie Line Chart" subTitle="This is a pie line chart" />
          <CardHeader {...options} />
        </div>
        <PieChart
          labels={['Sales', 'Revenue', 'Profit']}
          datasets={[
            {
              data: [15, 65, 30],
              backgroundColor: ['#2798FF', '#34C582', '#FFCE56'],
              borderColor: ['#2798FF', '#34C582', '#FFCE56'],
            },
          ]}
          options={{
            layout: {
              padding: {
                top: 16,
              },
            },
            plugins: {
              legend: {
                labels: {
                  padding: 40,
                },
              },
              datalabels: {
                display: false,
              },
            },
          }}
          plugins={[pieCenterText, pieLabel]}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Pie Desc Chart" subTitle="This is a pie desc chart" />
          <CardHeader {...options} />
        </div>
        <PieChart
          labels={['Sales', 'Revenue', 'Profit']}
          datasets={[
            {
              data: [15, 65, 30],
              backgroundColor: ['#2798FF', '#34C582', '#FFCE56'],
              borderColor: ['#2798FF', '#34C582', '#FFCE56'],
              offset: 30,
            },
          ]}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] pb-0">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Doughnut Chart" subTitle="This is a doughnut chart" />
          <CardHeader {...options} />
        </div>
        <DoughnutChart
          labels={['Sales', 'Revenue', 'Profit']}
          datasets={[
            {
              data: [15, 65, 30],
              borderColor: ['#2798FF', '#34C582', '#FFCE56'],
              backgroundColor: ['#2798FF', '#34C582', '#FFCE56'],
            },
          ]}
        />
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)]">
        <div className="w-full flex items-center justify-between pb-0">
          <Label title="Radial Chart" subTitle="This is a radial chart" />
          <CardHeader {...options} />
        </div>
        <RadialChart
          datasets={radialChartDatasets}
          labels={['Plan 1', 'Plan 2', 'Plan 3', 'Plan 4']}
        />
      </CardEID>
      <SignalRProvider>
        <Test />
      </SignalRProvider>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)] ">
        <div className="w-40 px-3 py-2 border border-[#D0D1DD] rounded-lg flex flex-col gap-1.5">
          {/* label */}
          <p className="text-center font-Inter font-semibold text-md text-[#24262B]">
            03 May 2025{' '}
          </p>
          {/* dataset */}
          <div className="py-1 border-t border-t-[#D0D1DD] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              {/* data label */}
              <div className="flex items-center gap-1.5">
                <div className="size-3 border border-blue-100 bg-blue-500 rounded-[1px]" />
                <p className="font-Inter font-normal text-base text-[#24262B]">Actual</p>
              </div>
              {/* data */}
              <p className="font-Inter font-semibold text-base text-[#24262B]">
                {formatNumber(90_000)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="size-3 border border-red-100 bg-red-500 rounded-[1px]" />
                <p className="font-Inter font-normal text-base text-[#24262B]">Max</p>
              </div>
              <p className="font-Inter font-semibold text-base text-[#24262B]">
                {formatNumber(10_000)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="size-3 border border-yellow-100 bg-yellow-500 rounded-[1px]" />
                <p className="font-Inter font-normal text-base text-[#24262B]">Warning</p>
              </div>
              <p className="font-Inter font-semibold text-base text-[#24262B]">
                {formatNumber(45_000)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="size-3 border border-green-100 bg-green-500 rounded-[1px]" />
                <p className="font-Inter font-normal text-base text-[#24262B]">Normal</p>
              </div>
              <p className="font-Inter font-semibold text-base text-[#24262B]">
                {formatNumber(30_000)}
              </p>
            </div>
          </div>
        </div>
      </CardEID>
      <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)]">
        <ProductionCycleTime />
      </CardEID>
      <CustomDatePickerTest />
      <CustomRangePickerTest />
      <CustomSelectTest />
    </div>
  );
};

export default SubPage;

const CustomDatePickerTest = () => {
  const [date, setDate] = useState<Dayjs>();
  const onChange = (date: Dayjs) => {
    setDate(date);
  };
  return (
    <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)]">
      <div className="w-full flex items-center justify-between pb-0">
        <Label title="Custom Date Picker" />
      </div>
      <CustomDatePicker value={date} onChange={onChange} />
    </CardEID>
  );
};
const CustomSelectTest = () => {
  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState([
    {
      label: 'Prabowo Subianto',
      value: 'Prabowo Subianto',
    },
    {
      label: 'Joko Widodo',
      value: 'Joko Widodo',
    },
    {
      label: 'Gibran Rakabuming Raka',
      value: 'Gibran Rakabuming Raka',
    },
    { label: 'Kaesang Pangarep', value: 'Kaesang Pangarep' },
  ]);
  const handleAdd = (name: string) => {
    if (name.length < 1) return;
    setOptions((options) => [...options, { label: name, value: name }]);
  };
  return (
    <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)]">
      <div className="w-full flex items-center justify-between pb-0">
        <Label title="Custom Select" />
      </div>
      <CustomSelect
        value={value}
        options={options}
        handleAdd={handleAdd}
        placeholder="Choose your character"
      />
    </CardEID>
  );
};
const CustomRangePickerTest = () => {
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();
  const onChange = ([start, end]: [Dayjs, Dayjs]) => {
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <CardEID className="w-[calc(50%-6px)] h-[calc(50%-6px)]">
      <div className="w-full flex items-center justify-between pb-0">
        <Label title="Custom Range Picker" />
      </div>
      <CustomRangePicker presets={PRESETS_RANGE} value={[startDate, endDate]} onChange={onChange} />
    </CardEID>
  );
};
