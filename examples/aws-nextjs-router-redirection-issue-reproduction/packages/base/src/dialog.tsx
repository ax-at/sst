"use client";

import React, { useState } from "react";

interface DialogProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}

export function Dialog({ trigger, title, children, dark = false }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const overlayStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: isOpen ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const dialogStyles: React.CSSProperties = {
    backgroundColor: dark ? "#171717" : "#ffffff",
    color: dark ? "#fafafa" : "#171717",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
  };

  const headerStyles: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "16px",
    color: dark ? "#fafafa" : "#171717",
  };

  const closeButtonStyles: React.CSSProperties = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: dark ? "#262626" : "#e5e5e5",
    color: dark ? "#fafafa" : "#171717",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      <div style={overlayStyles} onClick={() => setIsOpen(false)}>
        <div style={dialogStyles} onClick={(e) => e.stopPropagation()}>
          <h2 style={headerStyles}>{title}</h2>
          <div>{children}</div>
          <button style={closeButtonStyles} onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
