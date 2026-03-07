import { Plugin } from 'chart.js';

export const pieLabel: Plugin = {
  id: 'pie-labels-line',
  afterDraw(chart) {
    if (!chart) return;
    const { ctx, chartArea } = chart;

    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);

      meta.data.forEach((datapoint, index) => {
        const label = chart.data.labels?.[index] as string;
        const value = dataset.data[index] as number;

        if (!value || value === 0) return;

        const { x, y } = datapoint.tooltipPosition(true);
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        // Hitung sudut slice
        const angle = Math.atan2(y - centerY, x - centerX);

        // Tentukan titik garis luar (radius lebih besar dari slice)
        // @ts-ignore
        const lineRadius = datapoint.outerRadius + 20;
        const xLine = centerX + Math.cos(angle) * lineRadius;
        const yLine = centerY + Math.sin(angle) * lineRadius;

        // Tambahan garis horizontal ke luar
        const extraLine = 30 * (xLine >= centerX ? 1 : -1);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xLine, yLine);
        ctx.lineTo(xLine + extraLine, yLine);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = (dataset.borderColor as string[])[index] || '#999';
        ctx.stroke();

        // Label
        ctx.textAlign = xLine >= centerX ? 'left' : 'right';
        ctx.font = '14px Inter';
        ctx.fillStyle = '#747577';
        ctx.fillText(label, xLine + extraLine, yLine - 5);

        ctx.font = 'bold 14px Inter';
        ctx.fillStyle = '#4C4E67';
        ctx.fillText(value.toString(), xLine + extraLine, yLine + 12);
      });
    });
  },
};

export const centerText: Plugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { width, height, ctx } = chart;
    const data = chart.data.datasets[0].data as number[];
    const total = data.reduce((a, b) => a + b, 0);

    ctx.save();
    ctx.font = '18px inter';
    ctx.fillStyle = '#747577';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Total', width / 2, height / 2 - 20);

    ctx.font = 'bold 36px inter';
    ctx.fillStyle = '#4C4E67';
    ctx.fillText(total.toString(), width / 2, height / 2 + 10);
    ctx.restore();
  },
};

export const pieCenterText: Plugin = {
  id: 'pieCenterText',
  afterDraw(chart) {
    const { width, height, ctx } = chart;
    const data = chart.data.datasets[0].data as number[];
    const total = data.reduce((a, b) => a + b, 0);

    ctx.save();
    ctx.font = 'bold 36px inter';
    ctx.fillStyle = '#fefefe';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), width / 2, height / 2 - 20);
    ctx.restore();
  },
};

export const progressBar: Plugin = {
  id: 'progressBar',
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      data,
      chartArea: { left, right, width, height },
      scales: { y },
    } = chart;

    ctx.save();
    let fontSizeLabel;
    const barHeight = (height / y.ticks.length) * 0.3 * 0.9;
    if (barHeight < 8) {
      fontSizeLabel = 10;
    } else if (barHeight < 12) {
      fontSizeLabel = 14;
    } else if (barHeight < 24) {
      fontSizeLabel = 18;
    } else {
      fontSizeLabel = 24;
    }
    data.datasets[0].data.forEach((dataPoint, index: number) => {
      ctx.font = `${fontSizeLabel}px Inter`;
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      ctx.fillText(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data.labels[index] as string,
        left,
        y.getPixelForValue(index) - fontSizeLabel,
      );

      ctx.font = `${fontSizeLabel}px Inter`;
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      ctx.fillText(String(dataPoint), right, y.getPixelForValue(index) - fontSizeLabel);

      ctx.beginPath();
      ctx.fillStyle = '#1B1C22';
      ctx.fillRect(left, y.getPixelForValue(index) - barHeight / 2, width, barHeight);
    });
  },
};

// setup for animation delay
let delayed: boolean;

export const animation = {
  onComplete: () => {
    delayed = true;
  },

  delay: (context) => {
    let delay = 0;
    if (context.type === 'data' && context.mode === 'default' && !delayed) {
      delay = context.dataIndex * 300 + context.datasetIndex * 300;
    }
    return delay;
  },
};
