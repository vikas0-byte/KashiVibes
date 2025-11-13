export type BadgeVariant = 
  | 'default'
  | 'secondary' 
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning';

export type BadgeSize = 'sm' | 'md' | 'lg';

export const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'border-transparent bg-destructive !text-destructive-foreground hover:!bg-destructive/80',
  outline: 'text-foreground',
  success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
  warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600'
};

export const BADGE_SIZES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base'
};