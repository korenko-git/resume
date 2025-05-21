export type FieldType =
  | 'text'
  | 'textarea'
  | 'switch'
  | 'date'
  | 'dateRange'
  | 'organization'
  | 'skills'
  | 'url'
  | 'image'
  | 'imageWithUrl';

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  grid?: boolean;
  gridSpan?: number;
}

export const entityFields: Record<string, FieldDefinition[]> = {
  about: [
    { name: 'title', label: 'Name', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'subtitle', label: 'Position', type: 'text', required: true, grid: true },
    { name: 'description', label: 'About me', type: 'textarea', required: true },
    { name: 'location', label: 'Location', type: 'text', grid: true },
    { name: 'email', label: 'Email', type: 'text', grid: true },
    { name: 'phone', label: 'Phone', type: 'text', grid: true },
    { name: 'github', label: 'GitHub', type: 'url', placeholder: 'https://github.com/...', grid: true },
    { name: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/in/...', grid: true },
    { name: 'leetcode', label: 'LeetCode', type: 'url', placeholder: 'https://leetcode.com/...', grid: true },
    { name: 'website', label: 'Website', type: 'url', placeholder: 'https://...', grid: true },
    { name: 'avatar', label: 'Profile Photo', type: 'image' }
  ],
  experience: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true, grid: true },
    { name: 'endDate', label: 'End Date', type: 'date', placeholder: 'Present', grid: true },
    { name: 'organizationId', label: 'Organization', type: 'organization', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' },
    { name: 'link', label: 'Custom Link', type: 'imageWithUrl', placeholder: 'https://...' }
  ],
  education: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true, grid: true },
    { name: 'endDate', label: 'End Date', type: 'date', required: true, grid: true },
    { name: 'organizationId', label: 'Organization', type: 'organization', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' },
    { name: 'link', label: 'Custom Link', type: 'imageWithUrl', placeholder: 'https://...' }
  ],
  projects: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' },
    { name: 'source', label: 'Source Code', type: 'url', placeholder: 'https://github.com/...', grid: true },
    { name: 'demo', label: 'Demo', type: 'url', placeholder: 'https://...', grid: true },
    { name: 'image', label: 'Project Image', type: 'image' }
  ],
  certifications: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'organizationId', label: 'Organization', type: 'organization', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' },
    { name: 'link', label: 'Custom Link', type: 'imageWithUrl', placeholder: 'https://...' }
  ],
  organizations: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'url', label: 'Website', type: 'url', placeholder: 'https://...' },
    { name: 'logo', label: 'Logo', type: 'image' }
  ]
};