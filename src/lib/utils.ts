import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date?: string) => {
  return date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  }) : 'Present';
};