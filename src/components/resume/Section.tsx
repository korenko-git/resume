import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface SectionProps extends ComponentProps<"section"> {
  title: string;
  sr?: boolean;
  children: ReactNode;
}

export default function Section({ 
  title, 
  children, 
  sr = true, 
  className,
  ...props 
}: SectionProps) {
  return (
    <section
      className={cn(
        "mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24",
        className
      )}
      {...props}
    >
      <h2 className={cn(
        "text-sm font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-50 mb-6",
        sr && "lg:sr-only"
      )}>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </section>
  );
}