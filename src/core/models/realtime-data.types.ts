export interface RealtimeData {
  upper_limit: number | null;
  lower_limit: number | null;
  minimum: number | null;
  medium: number | null;
  maximum: number | null;
  warning: number | null;
  unit_trashelod: string | null;
  co2: number[];
  unit_co2: string;
  labels: string[];
  detail_sources: DetailSource[];
  Shape: string;
}

export interface DetailSource {
  source_value: string;
  color: string;
  values: number[];
  Value: number;
}

export interface RealtimeDataSummary {
  data: DataChartSummary | null;
}

interface DataChartSummary {
  upper_limit: number | null;
  minimum: number | null;
  maximum: number | null;
  medium: number | null;
  lower_limit: number | null;
  date_time: string[] | null;
  parameters: Parameter[] | null;
  value?: number[] | null;
}

interface Parameter {
  parameter_name: string | null;
  data: number[] | null;
  color: string | null;
  date: string[] | null;
}

// interface RootObject {
//   upper_limit: null;
//   lower_limit: null;
//   minimum: null;
//   medium: null;
//   maximum: null;
//   warning: null;
//   unit_trashelod: null;
//   labels: string[];
//   colors: string[];
//   percentages: number[];
//   Shape: string;
// }

export interface PercentageRealTimeData {
  upper_limit: number | null;
  lower_limit: number | null;
  minimum: number | null;
  medium: number | null;
  maximum: number | null;
  warning: number | null;
  unit_trashelod: string | null;
  labels: string[];
  colors: string[];
  percentages: number[];
  Shape: string;
}

export interface GaugeRealTimeData {
  upper_limit: number | null;
  lower_limit: number | null;
  minimum: number | null;
  medium: number | null;
  maximum: number | null;
  warning: number | null;
  unit_trashelod: string | null;
  value: number;
  Shape: string;
}

export interface IArgumentStreamData {
  componentId: string;
  aggregate: string;
  range: number;
  startDate: string;
  endDate: string;
  typeFilter: string;
  typeResult: string;
  shape: string;
  formula: boolean;
  rangeFrequency?: number;
  configurations: StreamDataConfiguration[];
}

export interface StreamDataConfiguration {
  sourceId: string;
  sourceName: string;
  sourceValue: string;
  color: string;
}

export interface TopFiveRealTime {
  data: TopFiveRealTimeData | null;
}

export interface TopFiveRealTimeData {
  upper_limit: number | null;
  minimum: number | null;
  maximum: number | null;
  lower_limit: number | null;
  medium: number | null;
  warning: number | null;
  labels: string[];
  parameters: number[];
}

export interface TopNoneRealtime {
  data: TopNoneRealtimeData | null;
}

export interface TopNoneRealtimeData {
  value: string;
  co2: string;
  label: string;
  date: string;
}

export interface SummaryRealtime {
  data: SummaryRealtimeData | null;
}

export interface SummaryRealtimeData {
  component_id: string;
  label: string;
  value: string;
  average_value: string;
}

export interface TooltipRealTimeData {
  Location: string;
  data: DataTooltipRealTimeData[];
}

export interface DiagramRealTimeData {
  Name: string;
  Value: string;
}

export interface DataTooltipRealTimeData {
  ParameterName: string;
  Value: string;
  Color: string;
}
