/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import {
  deleteLayout,
  DisplayType,
  LayoutEID,
  restoreLayout,
  setLayout,
} from '@/core/store/slice/layout.slice';
import CardEID from '@/shared/card';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import CardGridEID from './components/card-grid';
import WidgetList from './components/widget-list';

const GridLayoutEID = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.layout);

  const selectedList = list.find((item) => item.name === id)!;

  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef<GridLayout>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number>(0);

  const idList = selectedList?.id;
  const layout = selectedList?.layout ?? [];
  const hiddenLayout = selectedList?.hiddenLayout ?? [];

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.clientWidth);
        setCardHeight(cardRef.current.clientHeight);
      }
    };

    const observer = new ResizeObserver(updateWidth);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    updateWidth();

    return () => {
      observer.disconnect();
    };
  }, []);

  const height = useMemo(() => {
    return Math.floor(cardHeight / 13 - 2);
  }, [cardHeight]);

  const deleteHandler = (key: string) => {
    dispatch(deleteLayout({ idList, idLayout: key }));
  };

  const widgetHandler = (key: string) => {
    dispatch(restoreLayout({ idList, idLayout: key }));
  };

  const onLayoutChange = (newLayout: LayoutEID[]) => {
    const updatedLayout = newLayout.map((item) => {
      const existingLayout = layout.find((l) => l.i === item.i);
      return {
        ...item,
        title: existingLayout?.title || '',
        subtitle: existingLayout?.subtitle || '',
        display: existingLayout?.display || ('' as DisplayType),
      };
    });
    dispatch(setLayout({ idList, layout: updatedLayout }));
  };

  return (
    <>
      <CardEID ref={cardRef} className="p-0 bg-transparent gap-0 border-none">
        {/* @ts-expect-error */}
        <GridLayout
          ref={ref}
          className="layout"
          autoSize
          layout={layout}
          onLayoutChange={onLayoutChange}
          cols={12}
          margin={[6, 6]}
          rowHeight={height || 45}
          width={cardWidth || 1500}
          draggableCancel=".noDrag"
          resizeHandles={['e', 's', 'n', 'ne', 'nw', 'se', 'sw', 'w']}
        >
          {layout.map((item) => (
            <div className="border border-grey-300 rounded-md" key={item.i}>
              <CardGridEID deleteHandler={() => deleteHandler(item.i)} item={item} />
            </div>
          ))}
        </GridLayout>
      </CardEID>
      {hiddenLayout.length > 0 && <WidgetList items={hiddenLayout} widgetHandler={widgetHandler} />}
    </>
  );
};

export default GridLayoutEID;
