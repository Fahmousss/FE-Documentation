import { PieChartProps } from './utils/types';

export const pieProps: PieChartProps = {
  labels: ['OK', 'NG', 'MED'],
};

export const radialChartDatasets = [
  {
    label: 'Plan 1',
    data: [85, 15],
    backgroundColor: ['#1C6CB5', '#F2F2F7'],
    borderColor: '#F2F2F7',
    borderWidth: 3,
    circumference: 360,
    cutout: '60%', // diameter dalam
    radius: '100%',
  },
  {
    label: 'Plan 2',
    data: [92, 8],
    backgroundColor: ['#238AE8', '#F2F2F7'],
    borderColor: '#F2F2F7',
    borderWidth: 3,
    circumference: 360,
    cutout: '60%',
    radius: '96%', // lebih kecil → muncul ring di dalam
  },
  {
    label: 'Plan 3',
    data: [84, 16],
    backgroundColor: ['#52ADFF', '#F2F2F7'],
    borderColor: '#F2F2F7',
    borderWidth: 3,
    circumference: 360,
    cutout: '60%',
    radius: '92%',
  },
  {
    label: 'Plan 3',
    data: [78, 22],
    backgroundColor: ['#9CD0FF', '#F2F2F7'],
    borderColor: '#F2F2F7',
    borderWidth: 3,
    circumference: 360,
    cutout: '60%',
    radius: '88%',
  },
];
