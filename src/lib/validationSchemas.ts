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
 * Schema for about entries
 */
const aboutEntrySchema = baseEntrySchema.extend({
  subtitle: z.string(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  leetcode: z.string().url().optional(),
  email: z.string().email(),
});

export const aboutSchema = z.object({
  entries: z.array(aboutEntrySchema),
});

/**
 * Schema for entries with date ranges (experience and education)
 */
const dateRangeEntrySchema = baseEntrySchema.extend({
  startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Date must be in YYYY-MM format'),
  endDate: z.string().regex(/^\d{4}-\d{2}$/, 'Date must be in YYYY-MM format').or(z.string().max(0)),
  organizationId: z.string(),
  link: z.string().optional(),
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
  link: z.string().url().optional(),
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

export const resumeSchema = z.object({
  version: z.number(),
  about: aboutSchema,
  experience: experienceSchema,
  education: educationSchema,
  projects: projectsSchema,
  certifications: certificationsSchema,
  organizations: organizationsSchema
});