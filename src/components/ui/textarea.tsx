import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[90px] w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 transition-colors placeholder:text-stone-400 focus-visible:outline-none focus-visible:border-[#0A1C33] focus-visible:ring-1 focus-visible:ring-[#0A1C33] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
