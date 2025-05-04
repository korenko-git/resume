'use client';

import { useState, useEffect } from 'react';
import type { ResumeData } from '@/types/resume';

export function useResumeData() {
  const [data, setData] = useState<ResumeData>({
    version: 0,
    about: { entries: [] },
    experience: { entries: [] },
    projects: { entries: [] },
    education: { entries: [] },
    certifications: { entries: [] },
    organizations: { entries: [] }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Promise.all([
      import('@/data/organizations.json'),
      import('@/data/about.json'),
      import('@/data/experience.json'),
      import('@/data/projects.json'),
      import('@/data/education.json'),
      import('@/data/certifications.json')
    ])
      .then(([organizations, about, experience, projects, education, certifications]) => {
        setData({
          about: {entries: about.default.entries},
          version: about.default.version,
          experience: experience.default,
          projects: projects.default,
          education: education.default,
          certifications: certifications.default,
          organizations: organizations.default
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return {
    data,
    setData,
    loading,
    error
  };
}