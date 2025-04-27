'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ResumeData, Organization, ResumeDataKeys, ResumeDataTypes } from '@/types/resume';
import { useResumeData } from '@/hooks/useResumeData';

interface ResumeContextType {
  data: ResumeData;
  organizations: Organization[];
  loading: boolean;
  error: Error | null;
  updateData: (type: ResumeDataKeys, newData: ResumeDataTypes) => void;
  updateOrganization: (organization: Organization) => void;
  getData: (type: ResumeDataKeys, id: string) => ResumeDataTypes | null;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { data, setData, loading, error } = useResumeData();

  const getData = (type: ResumeDataKeys, id: string): ResumeDataTypes | null => {
    if (type === 'about') return data[type]
    if (type === 'organizations') return null;
    return data[type]?.entries.find(entry => entry.id === id) || null;
  };

  const updateData = (type: ResumeDataKeys, newData: ResumeDataTypes) => {
    if (type === 'about') setData({...data, about: newData as ResumeData['about']})
    else {
      const newEntries = [...data[type].entries].map(entry => 
        entry.id === newData.id 
          ? newData 
          : entry
      );
      
      if (!newEntries.find(entry => entry.id === newData.id)) {
        newEntries.push(newData);
      }

      setData({
        ...data, 
        [type]: { entries: newEntries }
      });
    }
  };

  const updateOrganization = (organization: Organization) => {
    // Update organization in the organizations list
    const updatedOrganizations = data.organizations.entries.map(org =>
      org.id === organization.id ? organization : org
    );

    // If organization doesn't exist in the list, add it
    if (!updatedOrganizations.find(org => org.id === organization.id)) {
      updatedOrganizations.push(organization);
    }

    setData({
      ...data,
      organizations: { entries: updatedOrganizations }
    });
  };

  const value = {
    data,
    organizations: data.organizations?.entries || [],
    loading,
    error,
    updateData,
    updateOrganization,
    getData,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}