"use client";

import React, { useState } from "react";

// Card Component
interface CardProps {
  title?: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  const cardStyles: React.CSSProperties = {
    backgroundColor: "#ffffff",
    color: "#171717",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const titleStyles: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#171717",
  };

  return (
    <div style={cardStyles}>
      {title && <h3 style={titleStyles}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

// Dialog Component
interface DialogProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Dialog({ trigger, title, children }: DialogProps) {
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
    backgroundColor: "#ffffff",
    color: "#171717",
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
    color: "#171717",
  };

  const closeButtonStyles: React.CSSProperties = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#e5e5e5",
    color: "#171717",
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

// Main Page Component
export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Sidebar */}
      <aside style={{ 
        width: "280px", 
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e5e5",
        padding: "32px 24px",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto"
      }}>
        <h2 style={{ 
          fontSize: "24px", 
          fontWeight: "800", 
          marginBottom: "32px",
          color: "#171717"
        }}>
          Documentation
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <a href="#" style={{ 
            padding: "12px 16px", 
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            fontWeight: "600",
            color: "#171717"
          }}>
            Getting Started
          </a>
          <a href="#" style={{ 
            padding: "12px 16px", 
            color: "#737373",
            borderRadius: "8px",
            fontWeight: "500"
          }}>
            Components
          </a>
          <a href="#" style={{ 
            padding: "12px 16px", 
            color: "#737373",
            borderRadius: "8px",
            fontWeight: "500"
          }}>
            API Reference
          </a>
          <a href="#" style={{ 
            padding: "12px 16px", 
            color: "#737373",
            borderRadius: "8px",
            fontWeight: "500"
          }}>
            Examples
          </a>
          <a href="#" style={{ 
            padding: "12px 16px", 
            color: "#737373",
            borderRadius: "8px",
            fontWeight: "500"
          }}>
            FAQ
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "64px 48px" }}>
        <div style={{ maxWidth: "900px" }}>
          {/* Header */}
          <div style={{ marginBottom: "48px" }}>
            <h1 style={{ 
              fontSize: "48px", 
              fontWeight: "900", 
              marginBottom: "16px",
              color: "#171717",
              letterSpacing: "-1px"
            }}>
              Documentation Hub
            </h1>
            <p style={{ 
              fontSize: "18px", 
              color: "#525252",
              lineHeight: "1.7"
            }}>
              Welcome to our comprehensive documentation. Find everything you need to get started 
              and build amazing applications.
            </p>
          </div>

          {/* Help Dialog */}
          <div style={{ marginBottom: "32px" }}>
            <Dialog 
              trigger={
                <button style={{
                  padding: "10px 20px",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}>
                  Need Help?
                </button>
              }
              title="How can we help you?"
            >
              <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                Our documentation is organized into several sections to help you find what you need quickly:
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.8", color: "#525252" }}>
                <li>Getting Started - Quick setup guides</li>
                <li>Components - Detailed component documentation</li>
                <li>API Reference - Complete API documentation</li>
                <li>Examples - Real-world usage examples</li>
              </ul>
            </Dialog>
          </div>

          {/* Content Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Card title="Quick Start Guide">
              <p style={{ lineHeight: "1.7", color: "#525252", marginBottom: "16px" }}>
                Get up and running in minutes with our quick start guide. We'll walk you through 
                the installation process and your first steps.
              </p>
              <p style={{ 
                fontSize: "14px", 
                fontWeight: "600", 
                color: "#3b82f6",
                cursor: "pointer"
              }}>
                Read more →
              </p>
            </Card>

            <Card title="Core Concepts">
              <p style={{ lineHeight: "1.7", color: "#525252", marginBottom: "16px" }}>
                Understanding the core concepts is essential for building robust applications. 
                Learn about the fundamental principles and architecture.
              </p>
              <p style={{ 
                fontSize: "14px", 
                fontWeight: "600", 
                color: "#3b82f6",
                cursor: "pointer"
              }}>
                Read more →
              </p>
            </Card>

            <Card title="Best Practices">
              <p style={{ lineHeight: "1.7", color: "#525252", marginBottom: "16px" }}>
                Follow these best practices to ensure your application is performant, maintainable, 
                and scalable. Learn from real-world experiences.
              </p>
              <p style={{ 
                fontSize: "14px", 
                fontWeight: "600", 
                color: "#3b82f6",
                cursor: "pointer"
              }}>
                Read more →
              </p>
            </Card>

            <Card title="Troubleshooting">
              <p style={{ lineHeight: "1.7", color: "#525252", marginBottom: "16px" }}>
                Running into issues? Check out our troubleshooting guide for common problems 
                and their solutions.
              </p>
              <p style={{ 
                fontSize: "14px", 
                fontWeight: "600", 
                color: "#3b82f6",
                cursor: "pointer"
              }}>
                Read more →
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
