import useColor from '@/core/hooks/use-color';

const PageLoader = () => {
  const { colorList } = useColor();
  return (
    <div
      style={{ backgroundColor: colorList.bg }}
      className="fixed inset-0 z-[9999] bg-opacity-10 flex items-center justify-center"
    >
      <svg viewBox="0 0 100 100" className="size-20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,15 90,85 10,85"
          stroke={colorList.primary}
          strokeWidth="4"
          strokeDasharray="180"
          strokeDashoffset="0"
          className="animate-draw"
        />
      </svg>
    </div>
  );
};

export default PageLoader;
