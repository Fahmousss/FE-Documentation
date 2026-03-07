import { cn } from '@/core/utils/class.utils';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '../typography';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
  separator?: React.ReactNode;
}

interface CardHeaderRightProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeaderRight: React.FC<CardHeaderRightProps> = ({ children, className }) => {
  return <div className={cn('flex items-center gap-2', className)}>{children}</div>;
};

const labelMap: Record<string, string> = {
  devices: 'Device Management',
  users: 'User Management',
  tags: 'Device Tag Management',
  resource: 'Resource Management',
  monitor: 'Track & Monitoring Device Tag',
  setting: 'Setting Configuration',
  'route-tags': 'Route Tag Management',
  'special-tags': 'Special Tag Management',
  'device-detail': 'Detail Device',
  edit: 'Edit',
  create: 'Create',
  view: 'View',
  detail: 'Detail',
};

const isUuidLike = (str: string): boolean => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(str);
};

export const BreadcrumbNewEID: React.FC<BreadcrumbProps> = ({
  showBackButton = true,
  onBack = () => window.history.back(),
  className,
}) => {
  const location = useLocation();

  const items = useMemo(() => {
    const pathnames = location.pathname.split('/').filter(Boolean);
    const filteredPathnames = pathnames.filter((part) => {
      if (labelMap[part]) return true;
      if (isUuidLike(part)) return false;
      return true;
    });

    return filteredPathnames.map((part) => {
      const href = '/' + pathnames.slice(0, pathnames.indexOf(part) + 1).join('/');
      const label =
        labelMap[part] ?? part.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      return { label, href };
    });
  }, [location.pathname]);

  return (
    <div className={`flex items-center ml-[-8px] gap-1 w-fit rounded-md pr-3 -mb-0.5 ${className}`}>
      {showBackButton && (
        <>
          <div
            className="p-1.5 hover:bg-slate-100/80 text-slate-600 cursor-pointer rounded-full"
            onClick={onBack}
          >
            <ArrowLeft color="#1e293b" size={23} strokeWidth={2} />
          </div>

          {/* Garis pemisah antara back button dan breadcrumb items */}
          <div className="w-px h-6 bg-slate-300 mr-2.5" />
        </>
      )}

      {items &&
        items.map((item, index) => (
          <React.Fragment key={index}>
            {index == 1 && (
              <ChevronRight className="ml-2 mr-1" size={20} strokeWidth={2.25} color="#1e293b" />
            )}
            <Typography.Display3
              className={cn(
                'transition-colors -tracking-4 whitespace-nowrap leading-loose',
                index === items.length - 1
                  ? 'text-black font-semibold font-Inter'
                  : 'text-black font-semibold',
                index > 0 ? 'text-green-600' : '',
              )}
            >
              {item.label}
            </Typography.Display3>
          </React.Fragment>
        ))}
    </div>
  );
};

interface CardHeaderProps {
  breadcrumb?: {
    items: BreadcrumbItem[];
    showBackButton?: boolean;
    onBack?: () => void;
  };

  title?: string;
  subtitle?: string;

  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CardHeaderEID: React.FC<CardHeaderProps> = ({
  breadcrumb,
  title,
  subtitle,
  children,
  className,
  size = 'md',
}) => {
  const sizeConfigs = {
    sm: {
      title: 'font-semibold',
      subtitle: 'text-gray-600',
      spacing: 'mb-3',
    },
    md: {
      title: 'font-semibold',
      subtitle: 'text-gray-600',
      spacing: 'mb-4',
    },
    lg: {
      title: 'font-semibold',
      subtitle: 'text-gray-600',
      spacing: 'mb-5',
    },
    xl: {
      title: 'font-semibold',
      subtitle: 'text-gray-600',
      spacing: 'mb-6',
    },
  };

  const config = sizeConfigs[size];

  return (
    <div className={cn('w-full flex flex-row gap-4', config.spacing, className)}>
      {/* LEFT - 30% */}
      <div className="w-full md:w-[30%] flex flex-col justify-end">
        {breadcrumb ? (
          <BreadcrumbNewEID
            items={breadcrumb.items}
            showBackButton={breadcrumb.showBackButton}
            onBack={breadcrumb.onBack}
          />
        ) : (
          <>
            {title && <h2 className={cn(config.title, 'text-gray-900')}>{title}</h2>}
            {subtitle && <p className={cn(config.subtitle, 'mt-1')}>{subtitle}</p>}
          </>
        )}
      </div>

      {/* RIGHT - 70% */}
      <div className="w-full md:w-[70%] flex justify-end flex-wrap-reverse gap-3 items-end">
        {children}
      </div>
    </div>
  );
};

export default CardHeaderEID;
