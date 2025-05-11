import type React from "react";
import { Button } from "./ui/button";
import type { buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProp
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

export default function CustomButton({
  isLoading,
  loadingText,
  className,
  disabled,
  children,
  ...props
}: ButtonProp) {
  const fallbackText =
    typeof children === "string" ? `${children}...` : "Loading...";

  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("gap-2", className)}
      {...props}
    >
      {isLoading && (
        <Loader2 className="size-4 animate-spin shrink-0" aria-hidden="true" />
      )}
      {isLoading ? loadingText || fallbackText : children}
    </Button>
  );
}
