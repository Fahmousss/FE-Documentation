import { useSignalR } from '@/core/hooks/use-signal-r';
import { GaugeRealTimeData } from '@/core/models/realtime-data.types';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import LoaderEID from '../loader/main';
import GaugeChart from './chart-gauge';

const Gauge = () => {
  const { addListener, removeListener } = useSignalR();
  const [realTimeData, setRealTimeData] = useState<GaugeRealTimeData>();

  useEffect(() => {
    const handleStreamData = (data: string) => {
      const realTimeData: GaugeRealTimeData = JSON.parse(data);
      setRealTimeData(realTimeData);
    };

    addListener('detailResult', handleStreamData);

    return () => {
      removeListener('detailResult');
    };
  }, []);

  if (!realTimeData) {
    return <LoaderEID style='loader'/>;
  }

  return (
    <div className="w-full h-full grid grid-cols-2 flex-wrap gap-2">
      <div className="col-span-1">
        <GaugeChart dataChart={realTimeData} />
      </div>
      <div className="w-full flex col-span-1 justify-center items-center">
        <div className="w-fit flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full aspect-square w-3 bg-[#4CAF50]" />
            <Typography.Text className="text-md">
              Minimum : {realTimeData?.minimum ?? 0}
            </Typography.Text>
          </div>
          {/* <div className="flex items-center gap-2">
            <div className="rounded-full aspect-square w-3 bg-[#FBC02D]" />
            <Typography.Text className="text-md">
              Limited : {realTimeData?.medium ?? 0}
            </Typography.Text>
          </div> */}
          <div className="flex items-center gap-2">
            <div className="rounded-full aspect-square w-3 bg-[#EF5B53]" />
            <Typography.Text className="text-md">
              Maximum : {realTimeData?.maximum ?? 0}
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gauge;
