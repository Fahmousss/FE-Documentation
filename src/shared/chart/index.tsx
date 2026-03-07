import { Select } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import CircleMinus from '../icon/circle-minus';
import CirclePlus from '../icon/circle-plus';
import BarChart from './bar';
import LineChart from './line';
import PieChart from './pie';
import { pieProps } from './utils/constant';

const ResponsiveChart: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  const chartRef = useRef<ChartJSOrUndefined>(null);

  const handleChartTypeChange = (type: 'line' | 'bar' | 'pie') => {
    setChartType(type);
  };

  const handleZoomIn = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.zoom(1.2);
    }
  };

  const handleZoomOut = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.zoom(0.8);
    }
  };

  const children = useMemo(() => {
    const components = {
      bar: <BarChart ref={chartRef} labels={[]} datasets={[]} />,
      line: <LineChart ref={chartRef} labels={[]} datasets={[]} />,
      pie: <PieChart labels={pieProps.labels} datasets={[]} />,
    };

    return components[chartType] || null;
  }, [chartType]);

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <div className=" w-full flex justify-between">
        <div className="flex items-center gap-1">
          <CirclePlus role="button" onClick={handleZoomIn} />
          <CircleMinus role="button" onClick={handleZoomOut} />
        </div>
        <Select
          value={chartType}
          size="small"
          className="noDrag"
          onChange={handleChartTypeChange}
          options={[
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
          ]}
        />
      </div>
      {children}
    </div>
  );
};

export default ResponsiveChart;
