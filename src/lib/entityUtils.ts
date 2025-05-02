import { 
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
  ExperienceEntry,
  EducationEntry,
  ProjectEntry,
  CertificationEntry,
  Organization
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
export function createDefaultEntity(type: ResumeDataKeysWithEntries): ResumeDataWithEntries {
  const baseEntity = {
    id: createUniqueId(type.slice(0, 3)),
    title: `New item`,
    description: `Description`,
    isPublished: false,
  };
  
  switch (type) {
    case 'experience':
      return {
        ...baseEntity,
        startDate: new Date().toISOString().slice(0, 7),
        endDate: '',
        skills: [],
        organizationId: '',
      } as ExperienceEntry;
      
    case 'education':
      return {
        ...baseEntity,
        startDate: new Date().toISOString().slice(0, 7),
        endDate: '',
        skills: [],
        organizationId: '',
      } as EducationEntry;
      
    case 'projects':
      return {
        ...baseEntity,
        skills: [],
        source: '',
        demo: '',
      } as ProjectEntry;
      
    case 'certifications':
      return {
        ...baseEntity,
        date: new Date().toISOString().slice(0, 7),
        skills: [],
        organizationId: '',
      } as CertificationEntry;
      
    case 'organizations':
      return {
        ...baseEntity,
        logo: '',
        url: '',
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
    : entries.filter(entry => entry.isPublished !== false);
}