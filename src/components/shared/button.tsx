import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string; // Add href prop
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg font-bold leading-normal tracking-[0.015em] transition-colors";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-white/10 text-white hover:bg-white/20",
  };

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        <span className="truncate">{children}</span>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button className={combinedClassName} {...props}>
      <span className="truncate">{children}</span>
    </button>
  );
}