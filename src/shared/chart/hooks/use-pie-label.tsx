import useColor from '@/core/hooks/use-color';
import { Plugin } from 'chart.js';
import { useMemo } from 'react';

export default function usePieLabel(): Plugin {
  const { colorList } = useColor();
  const pieLabel: Plugin = useMemo(
    () => ({
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
            ctx.strokeStyle =
              (dataset.borderColor as string[])[index] || colorList['text-secondary'];
            ctx.stroke();

            // Label
            ctx.textAlign = xLine >= centerX ? 'left' : 'right';
            ctx.font = '14px Inter';
            ctx.fillStyle = colorList.placeholder;
            ctx.fillText(label, xLine + extraLine, yLine - 5);

            ctx.font = 'bold 14px Inter';
            ctx.fillStyle = colorList['text-secondary'];
            ctx.fillText(value.toString(), xLine + extraLine, yLine + 12);
          });
        });
      },
    }),
    [colorList],
  );
  return pieLabel;
}
