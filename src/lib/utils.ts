import { type ClassValue,clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Array of class values to be combined
 * @returns Combined and optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Performs a deep equality check between two objects
 * @param obj1 - First object to compare
 * @param obj2 - Second object to compare
 * @returns Boolean indicating whether the objects are deeply equal
 */
export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  if (obj1 === null || obj2 === null) return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => {
    if (!obj2.hasOwnProperty(key)) return false;
    return deepEqual(obj1[key], obj2[key]);
  });
};

/**
 * Checks if a value is an object (not null and not an array)
 * @param item - Value to check
 * @returns Boolean indicating whether the item is an object
 */
export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Recursively merges two objects, preserving the structure of the target
 * @param target - Target object to merge into
 * @param source - Source object to merge from
 * @returns New object with merged properties
 * @example
 * // Merges user data with default values
 * const result = deepMerge(defaultUser, userData);
 */
export function deepMerge(target: any, source: any): any {
  const output = { ...target };
  
  for (const key in source) {
    if (source[key] === undefined) continue;
    
    if (isObject(source[key]) && isObject(target[key])) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  
  return output;
}