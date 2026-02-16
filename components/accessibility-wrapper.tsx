import React from 'react';

/**
 * Accessibility wrapper component that ensures proper ARIA attributes
 * and keyboard navigation for interactive elements
 */
export interface AccessibilityWrapperProps {
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
}

export function AccessibilityWrapper({
  children,
  role,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  tabIndex = -1,
  onKeyDown,
  className = '',
}: AccessibilityWrapperProps) {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={`${className} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent`}
    >
      {children}
    </div>
  );
}

/**
 * Touch target wrapper ensures minimum 44x44px touch target
 */
export function TouchTarget({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`min-h-11 min-w-11 flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Skip to main content link for keyboard navigation
 */
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only absolute top-0 left-0 z-50 bg-accent text-accent-foreground px-4 py-2 rounded focus:ring-2 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
