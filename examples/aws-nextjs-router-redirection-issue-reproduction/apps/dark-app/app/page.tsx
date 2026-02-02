"use client";

import React from "react";

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

function Button({ 
  children, 
  variant = "primary",
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
          backgroundColor: "#fafafa",
          color: "#171717",
        }
      : {
          backgroundColor: "#262626",
          color: "#fafafa",
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

// Card Component
interface CardProps {
  title?: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  const cardStyles: React.CSSProperties = {
    backgroundColor: "#171717",
    color: "#fafafa",
    border: "1px solid #262626",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  };

  const titleStyles: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#fafafa",
  };

  return (
    <div style={cardStyles}>
      {title && <h3 style={titleStyles}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "80px 24px" 
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h1 style={{ 
            fontSize: "64px", 
            fontWeight: "900", 
            marginBottom: "24px",
            color: "#fafafa",
            letterSpacing: "-2px"
          }}>
            Dashboard Portal
          </h1>
          <p style={{ 
            fontSize: "20px", 
            color: "#a3a3a3", 
            marginBottom: "32px",
            maxWidth: "600px",
            margin: "0 auto 32px"
          }}>
            Your centralized hub for monitoring and analytics
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px",
          marginBottom: "40px"
        }}>
          <Card title="Total Users">
            <p style={{ fontSize: "48px", fontWeight: "800", color: "#fafafa", marginBottom: "8px" }}>
              12,543
            </p>
            <p style={{ color: "#22c55e", fontSize: "14px" }}>
              ↑ 12% from last month
            </p>
          </Card>
          
          <Card title="Active Sessions">
            <p style={{ fontSize: "48px", fontWeight: "800", color: "#fafafa", marginBottom: "8px" }}>
              3,842
            </p>
            <p style={{ color: "#22c55e", fontSize: "14px" }}>
              ↑ 8% from last month
            </p>
          </Card>
          
          <Card title="Revenue">
            <p style={{ fontSize: "48px", fontWeight: "800", color: "#fafafa", marginBottom: "8px" }}>
              $94.2K
            </p>
            <p style={{ color: "#22c55e", fontSize: "14px" }}>
              ↑ 23% from last month
            </p>
          </Card>
        </div>

        {/* Additional Info */}
        <Card title="Recent Activity">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "12px", backgroundColor: "#171717", borderRadius: "8px" }}>
              <p style={{ fontWeight: "600", marginBottom: "4px" }}>New user registration</p>
              <p style={{ fontSize: "14px", color: "#a3a3a3" }}>2 minutes ago</p>
            </div>
            <div style={{ padding: "12px", backgroundColor: "#171717", borderRadius: "8px" }}>
              <p style={{ fontWeight: "600", marginBottom: "4px" }}>Payment processed</p>
              <p style={{ fontSize: "14px", color: "#a3a3a3" }}>15 minutes ago</p>
            </div>
            <div style={{ padding: "12px", backgroundColor: "#171717", borderRadius: "8px" }}>
              <p style={{ fontWeight: "600", marginBottom: "4px" }}>System backup completed</p>
              <p style={{ fontSize: "14px", color: "#a3a3a3" }}>1 hour ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
