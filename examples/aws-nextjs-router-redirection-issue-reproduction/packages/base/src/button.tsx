import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  dark?: boolean;
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = "primary", 
  dark = false,
  onClick 
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const variantStyles: React.CSSProperties = 
    variant === "primary"
      ? {
          backgroundColor: dark ? "#fafafa" : "#171717",
          color: dark ? "#171717" : "#fafafa",
        }
      : {
          backgroundColor: dark ? "#262626" : "#e5e5e5",
          color: dark ? "#fafafa" : "#171717",
        };

  return (
    <button 
      style={{ ...baseStyles, ...variantStyles }} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
