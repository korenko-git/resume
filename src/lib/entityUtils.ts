import {
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
  ExperienceEntry,
  EducationEntry,
  ProjectEntry,
  CertificationEntry,
  Organization,
  AboutEntry,
  ResumeData,
} from "@/types/resume";

/**
 * Creates a unique ID with the given prefix
 *
 * @param prefix - The prefix to use for the ID
 * @returns A unique string ID with the format prefix-timestamp
 */
export function createUniqueId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}

/**
 * Creates a default entity object based on the specified type
 *
 * @param type - The type of entity to create
 * @returns A new entity object with default values
 */
export function createDefaultEntity(
  type: ResumeDataKeysWithEntries
): ResumeDataWithEntries {
  const baseEntity = {
    id: createUniqueId(type.slice(0, 3)),
    title: `New item`,
    description: `Description`,
    isPublished: false,
  };

  switch (type) {
    case "about":
      return {
        title: "Your Name",
        subtitle: "Your Title",
        description: "A brief description about yourself",
        isPublished: true,
        location: "Your Location",
        email: "your.email@example.com",
      } as AboutEntry;
    case "experience":
      return {
        ...baseEntity,
        startDate: new Date().toISOString().slice(0, 7),
        endDate: "",
        skills: [],
        organizationId: "",
      } as ExperienceEntry;

    case "education":
      return {
        ...baseEntity,
        startDate: new Date().toISOString().slice(0, 7),
        endDate: "",
        skills: [],
        organizationId: "",
      } as EducationEntry;

    case "projects":
      return {
        ...baseEntity,
        skills: [],
        source: "",
        demo: "",
      } as ProjectEntry;

    case "certifications":
      return {
        ...baseEntity,
        date: new Date().toISOString().slice(0, 7),
        skills: [],
        organizationId: "",
      } as CertificationEntry;

    case "organizations":
      const { isPublished, ...entityWithoutIsPublished } = baseEntity;
      return {
        ...entityWithoutIsPublished,
        logo: "",
        url: "",
      } as Organization;

    default:
      return baseEntity as ResumeDataWithEntries;
  }
}

/**
 * Filters entries based on their published status
 *
 * @param entries - Array of entries to filter
 * @param includeUnpublished - Whether to include unpublished entries
 * @returns Filtered array of entries
 */
export function filterPublishedEntries<T extends ResumeDataWithEntries>(
  entries: T[] | undefined,
  includeUnpublished: boolean = false
): T[] {
  if (!entries) return [];
  return includeUnpublished
    ? entries
    : entries.filter((entry) => "isPublished" in entry && entry.isPublished !== false);
}

/**
 * Gets the first published entry from an array of entries
 *
 * @param entries - Array of entries to search
 * @returns The first published entry or undefined if none found
 */
export function getFirstPublishedEntry<T extends ResumeDataWithEntries>(
  entries: T[] | undefined
): T | undefined {
  return entries && entries.find((entry: T) => "isPublished" in entry && entry.isPublished);
}

/**
 * Retrieves a specific entity from the resume data by its ID
 *
 * @param data - The complete resume data object
 * @param type - The type of entity to retrieve (e.g., 'about', 'experience', etc.)
 * @param id - The unique identifier of the entity to retrieve
 * @returns The found entity object or null if not found
 * 
 * @example
 * // Get a specific experience entry
 * const experienceEntry = getEntity(resumeData, 'experience', 'exp-123');
 * 
 * // Get a specific project
 * const project = getEntity(resumeData, 'projects', 'prj-456');
 */
export function getEntity(
  data: ResumeData,
  type: ResumeDataKeysWithEntries,
  id?: string | null
): ResumeDataWithEntries | null {
  if (!id) return null;

  const entries = data[type].entries;
  return entries.find((entry) => entry.id === id) || null;
}
