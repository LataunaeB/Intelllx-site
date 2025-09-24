import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon, 
    iconPosition = 'left',
    loading = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition duration-200 ease-out active:duration-75 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-[--btn] text-white shadow-sm shadow-black/10 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none hover:bg-[--btn-hover]",
      secondary: "border border-white/20 text-white/90 hover:text-white hover:border-white/40 hover:bg-white/5 active:shadow-none",
      ghost: "text-white/80 hover:text-white hover:bg-white/5 active:shadow-none"
    };
    
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-[15px]",
      lg: "px-5 py-3 text-base"
    };
    
    const iconClasses = {
      left: "mr-2",
      right: "ml-2"
    };
    
    const iconSpacing = icon ? iconClasses[iconPosition] : "";
    
    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className={iconSpacing}>{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className={iconSpacing}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
