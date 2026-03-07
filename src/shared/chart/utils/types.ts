import { GaugeRealTimeData } from '@/core/models/realtime-data.types';
import { ChartConfiguration, Plugin } from 'chart.js';

export interface ChartProps {
  labels: string[];
  threshold?: number;
  thresholdColor?: string;
  datasets?: ChartConfiguration['data']['datasets'];
  options?: ChartConfiguration['options'];
  plugins?: Plugin[];
}

export type LegendType = { name: string; color: string };

export interface PieChartProps extends Omit<ChartProps, 'threshold' | 'thresholdColor'> {}

export interface DataChart {
  dataChart: GaugeRealTimeData;
  className?: string;
}

export interface IRealtimeDashboard {
  value: number;
  target: number;
  limited: number;
  maximum: number;
  unit: string;
}

export interface DataChart {
  dataChart: GaugeRealTimeData;
  className?: string;
}
