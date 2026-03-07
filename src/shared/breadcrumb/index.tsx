import { cn } from '@/core/utils/class.utils';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbProps } from './types';
import { BreadcrumbItemVariants, BreadcrumbVariants } from './variants';
import { ChevronRight } from 'lucide-react';

const BreadCrumbEID = ({ className, bordered, icon: Icon, items, ...props }: BreadcrumbProps) => {
  if (items?.length === 1) {
    return (
      <div className={cn(BreadcrumbVariants({ bordered, className }))} {...props}>
        <Link
          to={items[0].path}
          className={cn(BreadcrumbItemVariants({ bordered, active: true }))}
          onClick={() => items[0].onClick?.()}
        >
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          {items[0].label}
        </Link>
      </div>
    );
  }

  return (
    <nav className={cn(BreadcrumbVariants({ bordered, className }))} {...props}>
      {items?.map((item, index) => (
        <Fragment key={`breadcrumb-${index}`}>
          <Link
            to={item.path}
            onClick={(e) => {
              if (item.disabled) e.preventDefault();
              item.onClick?.();
            }}
            className={cn(
              BreadcrumbItemVariants({
                active: index === items.length - 1,
                bordered,
              }),
              "inline-flex items-center"
            )}
          >
            {item.icon && <item.icon className="w-5 h-5 mr-1.5" />}
            {item.label}
          </Link>
          {index === items.length - 1 ? null : (
            <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export default BreadCrumbEID;