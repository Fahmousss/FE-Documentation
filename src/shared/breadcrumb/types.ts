import { ComponentType, SVGProps } from 'react';

export interface BreadcrumbItem {
    label: string;
    path: string;
    disabled?: boolean;
    onClick?: () => void;
    icon?: ComponentType<SVGProps<SVGSVGElement>>; // Untuk icon component
}

export interface BreadcrumbProps {
    className?: string;
    bordered?: boolean;
    icon?: ComponentType<SVGProps<SVGSVGElement>>; // Icon default untuk semua item
    items: BreadcrumbItem[];
}