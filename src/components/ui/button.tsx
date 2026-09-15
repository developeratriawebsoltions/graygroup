import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Sharp-cornered, wide-tracked buttons. Deliberately no border radius — the
 * architectural language of the brand is rectilinear.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-charcoal text-ivory hover:bg-bronze",
        bronze: "bg-bronze text-white hover:bg-charcoal",
        outline:
          "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
        outlineLight:
          "border border-white/40 text-white hover:border-white hover:bg-white hover:text-charcoal",
        ivory: "bg-ivory text-charcoal hover:bg-sand",
        ghost: "text-charcoal hover:text-bronze",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9",
        link: "h-auto gap-2 p-0 text-[0.6875rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
