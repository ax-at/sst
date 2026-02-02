import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export function Card({ title, children, dark = false }: CardProps) {
  const cardStyles: React.CSSProperties = {
    backgroundColor: dark ? "#171717" : "#ffffff",
    color: dark ? "#fafafa" : "#171717",
    border: `1px solid ${dark ? "#262626" : "#e5e5e5"}`,
    borderRadius: "12px",
    padding: "24px",
    boxShadow: dark 
      ? "0 4px 6px rgba(0, 0, 0, 0.3)" 
      : "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const titleStyles: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "16px",
    color: dark ? "#fafafa" : "#171717",
  };

  return (
    <div style={cardStyles}>
      {title && <h3 style={titleStyles}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
