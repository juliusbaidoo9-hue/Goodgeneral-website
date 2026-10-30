import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0A1C33] text-white hover:bg-[#0D2545] focus-visible:outline-[#0A1C33] shadow-sm",
        gold:
          "bg-[#E6AC3E] text-[#0A1C33] hover:bg-[#D99B26] focus-visible:outline-[#E6AC3E] shadow-sm font-bold",
        secondary:
          "bg-white text-[#0A1C33] border border-stone-200 hover:bg-stone-50 focus-visible:outline-[#0A1C33]",
        ghost:
          "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60 focus-visible:outline-stone-400",
        link:
          "text-[#0A1C33] underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
