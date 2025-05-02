import { z } from 'zod';

/**
 * Base schema for resume entries with common fields
 */
const baseEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  isPublished: z.boolean(),
  skills: z.array(z.string()).optional(),
});

/**
 * Schema for the about section
 */
export const aboutSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  isPublished: z.boolean(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  leetcode: z.string().url().optional(),
  email: z.string().email(),
  version: z.number(),
});

/**
 * Schema for entries with date ranges (experience and education)
 */
const dateRangeEntrySchema = baseEntrySchema.extend({
  startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Date must be in YYYY-MM format'),
  endDate: z.string().regex(/^\d{4}-\d{2}$/, 'Date must be in YYYY-MM format').or(z.string().max(0)),
  organizationId: z.string(),
});

/**
 * Schema for experience entries
 */
export const experienceEntrySchema = dateRangeEntrySchema;
export const experienceSchema = z.object({
  entries: z.array(experienceEntrySchema),
});

/**
 * Schema for education entries
 */
export const educationEntrySchema = dateRangeEntrySchema;
export const educationSchema = z.object({
  entries: z.array(educationEntrySchema),
});

/**
 * Schema for project entries
 */
export const projectEntrySchema = baseEntrySchema.extend({
  source: z.string().url().optional(),
  demo: z.string().url().optional(),
});
export const projectsSchema = z.object({
  entries: z.array(projectEntrySchema),
});

/**
 * Schema for certification entries
 */
export const certificationEntrySchema = baseEntrySchema.extend({
  date: z.string().regex(/^\d{4}-\d{2}$/, 'Date must be in YYYY-MM format'),
  organizationId: z.string(),
});
export const certificationsSchema = z.object({
  entries: z.array(certificationEntrySchema),
});

/**
 * Schema for organization entries
 */
export const organizationEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url().optional(),
  logo: z.string().optional(),
});
export const organizationsSchema = z.object({
  entries: z.array(organizationEntrySchema),
});

/**
 * Validates resume data against the appropriate schema
 * 
 * @param data - The data to validate
 * @param type - The type of resume section
 * @returns Boolean indicating whether the data is valid
 */
export function validateResumeData(data: any, type: 'about' | 'experience' | 'education' | 'projects' | 'certifications' | 'organizations'): boolean {
  try {
    switch (type) {
      case 'about':
        aboutSchema.parse(data);
        break;
      case 'experience':
        experienceSchema.parse(data);
        break;
      case 'education':
        educationSchema.parse(data);
        break;
      case 'projects':
        projectsSchema.parse(data);
        break;
      case 'certifications':
        certificationsSchema.parse(data);
        break;
      case 'organizations':
        organizationsSchema.parse(data);
        break;
      default:
        return false;
    }
    return true;
  } catch (error) {
    console.error(`Validation error for data type ${type}:`, error);
    return false;
  }
}