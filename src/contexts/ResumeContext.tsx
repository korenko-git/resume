"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import {
  ResumeData,
  Organization,
  ResumeDataKeys,
  ResumeDataTypes,
  ResumeDataWithEntries,
  ResumeDataKeysWithEntries,
} from "@/types/resume";
import { useResumeData } from "@/hooks/useResumeData";
import { toast } from "sonner";

interface ResumeContextType {
  data: ResumeData;
  organizations: Organization[];
  loading: boolean;
  error: Error | null;
  version: number;
  setVersion: (version: number) => void;
  updateData: (type: ResumeDataKeys, newData: ResumeDataTypes) => void;
  updateOrganization: (organization: Organization) => void;
  getEntryFromData: (
    type: ResumeDataKeysWithEntries,
    id: string
  ) => ResumeDataWithEntries | null;
  setData: (data: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { data, setData, loading, error } = useResumeData();
  const [version, setVersion] = useState(data.about?.version || 0);

  const getEntryFromData = (
    type: ResumeDataKeysWithEntries,
    id: string
  ): ResumeDataWithEntries | null => {
    return data[type]?.entries.find((entry) => entry.id === id) || null;
  };

  const updateDraft = (data: ResumeData) => {
    const currentVersion = data.about?.version || 0;
    const dataAbaout = { ...data.about, version: currentVersion + 1 };
    const dataToSave: ResumeData = {
      ...data,
      about: dataAbaout as ResumeData["about"],
    };

    try {
      localStorage.setItem("resumeDraft", JSON.stringify(dataToSave));
      setData(dataToSave);
      toast.success("Resume draft saved");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save resume draft");
    }
  };

  const updateData = (type: ResumeDataKeys, newData: ResumeDataTypes) => {
    if (type === "about")
      updateDraft({ ...data, about: newData as ResumeData["about"] });
    else {
      const newEntries = [...data[type].entries].map((entry) =>
        entry.id === newData.id ? newData : entry
      );

      if (!newEntries.find((entry) => entry.id === newData.id)) {
        newEntries.push(newData);
      }

      updateDraft({
        ...data,
        [type]: { entries: newEntries },
      });
    }
  };

  const updateOrganization = (organization: Organization) => {
    // Update organization in the organizations list
    const updatedOrganizations = data.organizations.entries.map((org) =>
      org.id === organization.id ? organization : org
    );

    // If organization doesn't exist in the list, add it
    if (!updatedOrganizations.find((org) => org.id === organization.id)) {
      updatedOrganizations.push(organization);
    }

    updateDraft({
      ...data,
      organizations: { entries: updatedOrganizations },
    });
  };

  const value = {
    data,
    organizations: data.organizations?.entries || [],
    loading,
    error,
    version,
    setVersion,
    updateData,
    setData,
    updateOrganization,
    getEntryFromData,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
