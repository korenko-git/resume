"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { HTMLProps } from "react";
import { cn } from "@/lib/utils";

type OutlineLinkButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLeftArrow?: boolean;
};

type AsLinkProps = OutlineLinkButtonProps &
  LinkProps &
  HTMLProps<HTMLAnchorElement> & { as?: "link" };
type AsButtonProps = OutlineLinkButtonProps &
  HTMLProps<HTMLButtonElement> & { as: "button" };

export function OutlineLinkButton({
  children,
  className,
  isLeftArrow = false,
  as = "link",
  ...props
}: AsLinkProps | AsButtonProps) {
  const commonClasses = cn(
    "text-foreground group inline-flex items-center leading-tight font-medium",
    className,
  );

  const arrowContent = (
    <span className="whitespace-nowrap">
      {isLeftArrow ? (
        <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-2" />
      ) : (
        <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
      )}
    </span>
  );

  const content = (
    <>
      {isLeftArrow && arrowContent}
      <span className="border-primary/50 group-hover:border-primary/50 border-b pb-px transition motion-reduce:transition-none lg:border-transparent">
        {children}
      </span>
      {!isLeftArrow && arrowContent}
    </>
  );

  if (as === "link") {
    return (
      <Link className={commonClasses} {...(props as LinkProps)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={commonClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
