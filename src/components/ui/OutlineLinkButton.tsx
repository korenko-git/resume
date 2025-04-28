"use client"

import { HTMLProps } from "react";
import Link, { LinkProps } from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OutlineLinkButton({
  children,
  className,
  isLeftArrow = false,
  ...props
}: LinkProps & HTMLProps<HTMLAnchorElement> & { isLeftArrow?: boolean }) {
  return (
    <div className="mt-12">
  <Link
    className={
      "inline-flex items-center font-medium leading-tight text-slate-700 dark:text-slate-50 group " + className
    }
    {...props}
  >
    {isLeftArrow && (
      <span className="whitespace-nowrap">
        <ArrowLeft />
      </span>
    )}
    <span className="border-b border-blue-300 lg:border-transparent pb-px transition group-hover:border-blue-300 motion-reduce:transition-none">
      {children}
    </span>
    {!isLeftArrow && (
      <span className="whitespace-nowrap">
        <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
      </span>
    )}
  </Link>
</div>

  );
}