import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends ComponentProps<"section"> {
  title?: string;
  hideHeadingOnDesktop?: boolean;
  hideHeading?: boolean;
  children: ReactNode;
}

export function Section({
  title,
  children,
  hideHeadingOnDesktop = true,
  hideHeading = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24",
        className,
      )}
      {...props}
    >
      {!hideHeading && (
        <h2
          className={cn(
            "text-foreground mb-6 text-sm font-bold tracking-widest uppercase",
            hideHeadingOnDesktop && "lg:sr-only",
          )}
        >
          {title}
        </h2>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
