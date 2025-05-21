export const entityRelationships: Record<string, { referencedIn: Array<{ type: string, field: string }> }> = {
  organizations: {
    referencedIn: [
      { type: 'experience', field: 'organizationId' },
      { type: 'education', field: 'organizationId' },
      { type: 'certifications', field: 'organizationId' }
    ]
  },
  about: { referencedIn: [] },
  experience: { referencedIn: [] },
  education: { referencedIn: [] },
  projects: { referencedIn: [] },
  certifications: { referencedIn: [] }
};