import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				/** Brand primary CTA — gradient, glow, micro-motion */
				cta: [
					'relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-emerald-500 to-emerald-600',
					'text-white shadow-[0_4px_16px_-2px_rgba(16,185,129,0.45),inset_0_1px_0_0_rgba(255,255,255,0.2)]',
					'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:from-emerald-400 hover:to-emerald-600',
					'hover:shadow-[0_8px_24px_-4px_rgba(16,185,129,0.55),inset_0_1px_0_0_rgba(255,255,255,0.25)]',
					'active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_10px_-2px_rgba(16,185,129,0.4)]',
					'dark:from-emerald-500 dark:to-emerald-700 dark:hover:from-emerald-400 dark:border-emerald-300/15',
					'dark:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.35),inset_0_1px_0_0_rgba(255,255,255,0.12)]',
					'dark:hover:shadow-[0_8px_28px_-6px_rgba(16,185,129,0.45),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
				].join(' '),
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };

