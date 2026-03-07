// function for get gradient color
export function getGradient(context, colors: string[]) {
  const chart = context.chart;
  const { ctx, chartArea } = chart;
  if (!chartArea) {
    return;
  }

  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  colors.forEach((color, index) => {
    const offset = index / (colors.length - 1);
    gradient.addColorStop(offset, color);
  });

  return gradient;
}

export function getColorChart(type: string): string {
  if (type === 'maintenance') return '#DC3545';
  if (type === 'energy') return '#33A02C';
  if (type === 'air') return '#F1BE42';
  return '#615E83';
}
