import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ButtonVariant = 
  | 'default'
  | 'primary'
  | 'destructive'
  | 'outline'
  | 'cta'
  | 'secondary'
  | 'hero'
  | 'outline-hero'
  | 'ghost'
  | 'premium'
  | 'link'
  | 'tour'
  | 'glass'
  | 'book';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon';

export interface ButtonVariantsConfig {
  variant: ButtonVariant;
  size: ButtonSize;
}

export const buttonVariants = (config: ButtonVariantsConfig & { className?: string }): string => {
  const { variant, size, className } = config;
  
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  
  const variants: Record<ButtonVariant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    primary: "bg-gradient-primary text-primary-foreground hover:shadow-medium transition-smooth hover:-translate-y-0.5",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    cta: "bg-gradient-primary text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-0",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    hero: "bg-gradient-spiritual text-white hover:shadow-large transition-bounce hover:-translate-y-1 font-semibold",
    "outline-hero": "border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-smooth",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    premium: "bg-gradient-to-r from-secondary to-primary text-white hover:from-primary hover:to-secondary shadow-lifted hover:shadow-dramatic border border-accent/20 rounded-xl font-semibold backdrop-blur-sm",
    link: "text-primary underline-offset-4 hover:underline",
    tour: "bg-card text-card-foreground border border-input hover:bg-muted/50 transition-all duration-300 shadow-custom-sm hover:shadow-custom-md",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-elegant hover:shadow-card rounded-xl",
    book: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-custom-sm hover:shadow-custom-md transition-all duration-300"
  };

  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    xl: "h-16 rounded-xl px-10 py-5 text-lg",
    icon: "h-10 w-10"
  };

  return cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );
};