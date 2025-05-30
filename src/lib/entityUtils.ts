import {
  AboutEntry,
  CertificationEntry,
  EducationEntry,
  entityRelationships,
  ExperienceEntry,
  Organization,
  ProjectEntry,
  ResumeData,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
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
  type: ResumeDataKeysWithEntries,
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
        ...baseEntity,
        title: "Your Name",
        subtitle: "Your Title",
        description: "A brief description about yourself",
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  includeUnpublished: boolean = false,
): T[] {
  if (!entries) return [];
  return includeUnpublished
    ? entries
    : entries.filter(
        (entry) => "isPublished" in entry && entry.isPublished !== false,
      );
}

/**
 * Gets the first published entry from an array of entries
 *
 * @param entries - Array of entries to search
 * @returns The first published entry or undefined if none found
 */
export function getFirstPublishedEntry<T extends ResumeDataWithEntries>(
  entries: T[] | undefined,
): T | undefined {
  return (
    entries &&
    entries.find((entry: T) => "isPublished" in entry && entry.isPublished)
  );
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
  data: Omit<ResumeData, "version">,
  type: ResumeDataKeysWithEntries,
  id?: string | null,
): ResumeDataWithEntries | null {
  if (!id) return null;

  const entries = data[type].entries;
  return entries.find((entry) => entry.id === id) || null;
}

/**
 * Converts a singular entity type to its plural form
 * @param type Entity type in singular form
 * @returns Plural form of the entity type
 */
export function getPluralForm(type: string): string {
  return type.endsWith("y") ? type.slice(0, -1) + "ies" : type + "s";
}

/**
 * Converts a plural entity type to its singular form
 * @param type Entity type in plural form
 * @returns Singular form of the entity type
 */
export function getSingularForm(type: string): string {
  return type.endsWith("s") ? type.slice(0, -1) : type;
}

/**
 * Removes Markdown links from the text while preserving the visible link text.
 *
 * Example:
 * Input:  "See [documentation](https://example.com)"
 * Output: "See documentation"
 *
 * Supports only inline-style Markdown links of the form [text](url).
 * Does not affect images, HTML, or other Markdown elements.
 *
 * @param {string} md - The input Markdown string.
 * @returns {string} Markdown string with links removed.
 */
export function stripLinksFromMarkdown(md: string): string {
  return md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

/**
 * Gets references for a specific entity type based on the entityRelationships
 * @param entityType Type of the entity
 * @returns Array of references or empty array if none found
 */
function getEntityReferences(
  entityType: ResumeDataKeysWithEntries,
): Array<{ type: ResumeDataKeysWithEntries; field: string }> {
  const references: Array<{ type: ResumeDataKeysWithEntries; field: string }> =
    [];

  // Iterate through all entity types and find which ones are referenced by our entity
  Object.entries(entityRelationships).forEach(([refType, relationship]) => {
    // If this entity type is referenced by our target entity
    if (refType !== entityType) {
      relationship.referencedIn.forEach((ref) => {
        if (ref.type === entityType) {
          references.push({
            type: refType as ResumeDataKeysWithEntries,
            field: ref.field,
          });
        }
      });
    }
  });

  return references;
}

/**
 * Retrieves a specific entity with all referenced entities fully populated
 *
 * @param data - The complete resume data object
 * @param type - The type of entity to retrieve (e.g., 'about', 'experience', etc.)
 * @param id - The unique identifier of the entity to retrieve
 * @returns The found entity object with all references populated or null if not found
 *
 * @example
 * // Get a specific experience entry with organization data
 * const experienceWithOrg = getEntityFull(resumeData, 'experience', 'exp-123');
 */
export function getEntityFull(
  data: Omit<ResumeData, "version">,
  type: ResumeDataKeysWithEntries,
  id?: string | null,
): ResumeDataWithEntries | null {
  const entity = getEntity(data, type, id);

  if (!entity) return null;

  const result = { ...entity };

  // Get all references for this entity type
  const references = getEntityReferences(type);

  // For each reference type, check if this entity has the reference field
  for (const { type: refType, field } of references) {
    if (field in entity && (entity as any)[field]) {
      const refId = (entity as any)[field];
      if (Array.isArray(refId)) {
        const referencedEntities = refId
          .map((id) => getEntity(data, refType, id))
          .filter(Boolean);
        if (referencedEntities.length > 0) {
          const singularType = getSingularForm(refType);
          (result as any)[singularType] = referencedEntities;
        }
      } else {
        const referencedEntity = getEntity(data, refType, refId);

        if (referencedEntity) {
          // Add the referenced entity to the result using singular form
          const singularType = getSingularForm(refType);
          (result as any)[singularType] = referencedEntity;
        }
      }
    }
  }

  return result;
}

/**
 * Checks if an entity ID is used by other entities
 * @param data Resume data
 * @param entityType Type of the entity to check
 * @param entityId ID of the entity to check
 * @returns True if the entity is used by other entities, false otherwise
 */
export function isUsed(
  data: ResumeData,
  entityType: ResumeDataKeysWithEntries,
  entityId: string,
): boolean {
  const relationships = entityRelationships[entityType];

  if (!relationships || relationships.referencedIn.length === 0) {
    return false;
  }

  return relationships.referencedIn.some(({ type, field }) => {
    return data[type as ResumeDataKeysWithEntries].entries.some(
      (entry: any) => {
        const value = entry[field];
        if (Array.isArray(value)) {
          return value.includes(entityId);
        }
        return value === entityId;
      },
    );
  });
}

/**
 * Checks if an entity type has defined relationships where it is referenced by other entities.
 * This is useful for determining if an entity type is part of a relationship chain.
 *
 * @param entityType The type of the entity to check (e.g., 'experience', 'education').
 * @returns True if the entity type has relationships where it is referenced, false otherwise.
 */
export function hasRelationships(
  entityType: ResumeDataKeysWithEntries,
): boolean {
  const relationships = entityRelationships[entityType];
  return relationships && relationships.referencedIn.length > 0;
}
