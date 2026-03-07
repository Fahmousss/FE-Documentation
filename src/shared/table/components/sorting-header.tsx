import IconAsc from "@/Assets/icons/asc.svg";
import { cn } from "@/core/utils/class.utils";
import Typography from '@/shared/typography';
import { useState } from "react";
import { SortingHeader } from "../utils/models";

const SortingHeader = ({ label, onClick }: SortingHeader) => {
  const [isAsc, setIsAsc] = useState(false);

  const clickHandler = () => {
    onClick?.();
    setIsAsc((prev) => !prev);
  };
  
  return (
    <div
      className="hover:cursor-pointer items-center w-full flex gap-1.5"
      onClick={clickHandler}
    >
      <Typography.H6 className='font-semibold'>{label}</Typography.H6>
      <img
        src={IconAsc}
        alt="icon-asc"
        className={cn(
          "size-3.5 transition-all duration-300 ease-in-out",
          {
            "rotate-180": isAsc,
          }
        )}
      />
    </div>
  );
};

export default SortingHeader;
