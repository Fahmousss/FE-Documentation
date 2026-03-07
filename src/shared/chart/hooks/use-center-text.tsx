import useColor from '@/core/hooks/use-color';
import { Plugin } from 'chart.js';
import { useMemo } from 'react';

export default function useCenterText(): Plugin {
  const { colorList } = useColor();
  const centerText: Plugin = useMemo(
    () => ({
      id: 'centerText',
      afterDraw(chart) {
        const { width, height, ctx } = chart;
        const data = chart.data.datasets[0].data as number[];
        const total = data.reduce((a, b) => a + b, 0);

        ctx.save();
        ctx.font = '18px inter';
        ctx.fillStyle = colorList.placeholder;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Total', width / 2, height / 2 - 20);

        ctx.font = 'bold 36px inter';
        ctx.fillStyle = colorList['text-secondary'];
        ctx.fillText(total.toString(), width / 2, height / 2 + 10);
        ctx.restore();
      },
    }),
    [colorList],
  );
  return centerText;
}
