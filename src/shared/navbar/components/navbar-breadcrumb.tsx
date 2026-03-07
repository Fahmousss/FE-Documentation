import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/core/utils/class.utils";
import { useAppSelector } from "@/core/store/hooks";
import useColor from '@/core/hooks/use-color';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface NavbarBreadcrumbProps {
  items: BreadcrumbItem[];
  icon?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

const NavbarBreadcrumb = ({
  items,
  icon,
  rightContent,
  className,
}: NavbarBreadcrumbProps) => {
  const { show } = useAppSelector((state) => state.sidebar);
  const { showNavbar } = useAppSelector((state) => state.navbar);
  const { colorList } = useColor();

  return (
    <div
      style={{
        backgroundColor: colorList.nav.bg,
        borderBottomWidth: 1,
        borderBottomColor: colorList.nav.border,
      }}
      className={cn(
        "fixed z-[1000] flex justify-between items-center",
        "px-5 pb-4 pt-[15px] mt-[-14px] h-[4.4pc] ",
        "transition-all duration-500",
        show ? "ml-[15%] w-[85%]" : "ml-0 w-full",
        showNavbar ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* LEFT SIDE */}
      <div className={cn("flex items-center gap-3 text-sm", className)}>
        {icon && <div className="text-gray-400">{icon}</div>}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center">
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast
                      ? "text-green-600 font-medium"
                      : "text-gray-500"
                  )}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="mx-2 text-gray-400">›</span>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      {rightContent && (
        <div className="flex items-center gap-2">
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default NavbarBreadcrumb;