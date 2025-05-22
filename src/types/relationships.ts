export const entityRelationships = {
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
  certifications: { referencedIn: [] },
  skills: {
    referencedIn: [
      { type: 'experience', field: 'skills' },
      { type: 'education', field: 'skills' },
      { type: 'projects', field: 'skills' },
      { type: 'certifications', field: 'skills' }
    ]
  }
};
