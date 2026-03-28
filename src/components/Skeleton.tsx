import React from "react";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={`animate-pulse bg-on-surface/20 rounded-xl ${className}`}
      {...props}
    />
  );
}
