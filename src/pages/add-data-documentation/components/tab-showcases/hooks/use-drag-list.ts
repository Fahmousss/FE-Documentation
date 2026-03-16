import { useRef } from 'react';

export function useDragList(onMove: (from: number, to: number) => void) {
  const dragIdx = useRef<number | null>(null);

  const onDragStart = (i: number) => {
    dragIdx.current = i;
  };

  const onDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === i) return;
    onMove(dragIdx.current, i);
    dragIdx.current = i;
  };

  const onDragEnd = () => {
    dragIdx.current = null;
  };

  return { onDragStart, onDragOver, onDragEnd };
}
