import { ReactNode } from "react";

interface CardSectionProps {
    children: ReactNode;
    className?: string;
}

const CardSection = ({ children, className = "" }: CardSectionProps) => {
    return (
        <div
            className={`w-full bg-white border border-gray-200 rounded-md p-6 ${className}`}
        >
            {children}
        </div>
    );
};

export default CardSection;