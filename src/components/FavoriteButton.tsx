"use client";

import React from "react";

interface Props {
  isFavorite: boolean;
  onToggle: () => void;
  title: string;
  size?: "sm" | "md";
  className?: string;
}

const FavoriteButton = React.memo(function FavoriteButton({
  isFavorite,
  onToggle,
  title,
  size = "md",
  className = "",
}: Props) {
  const sizeClasses = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      title={title}
      className={`
        ${sizeClasses}
        flex items-center justify-center
        rounded-xl
        transition-all duration-200
        active:scale-90
        ${
          isFavorite
            ? "text-yellow-400 hover:text-yellow-500"
            : "text-slate-400 hover:text-yellow-400"
        }
        ${className}
      `}
    >
      <svg
        className={`${iconSize} transition-transform duration-200 ${
          isFavorite ? "scale-110" : "scale-100"
        }`}
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </button>
  );
});

export default FavoriteButton;