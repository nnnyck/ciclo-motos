import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconBgClass?: string;
  iconColorClass?: string;
}

export default function Card({
  title,
  description,
  icon,
  iconBgClass = "bg-error-light",
  iconColorClass = "text-error",
}: CardProps) {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
  {icon && (
    <div
      className={`w-16 h-16 ${iconBgClass} rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}
    >
      {/* Círculo menor / ícone */}
      {React.cloneElement(icon as React.ReactElement, {
        className: `w-8 h-8 text-red-600 absolute inset-0 m-auto z-0`,
      })}
    </div>
  )}
  <h3 className="text-lg font-montserrat font-bold text-gray-800 mb-2">
    {title}
  </h3>
  <p className="text-gray-500 text-sm">{description}</p>
</div>

  );
}
