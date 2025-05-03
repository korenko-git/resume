"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
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
  deleteEntry: (type: ResumeDataKeysWithEntries, id: string) => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(
  undefined
);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { data, setData, loading, error } = useResumeData();
  const [version, setVersion] = useState(data.about?.version || 0);

  const getEntryFromData = useCallback(
    (
      type: ResumeDataKeysWithEntries,
      id: string
    ): ResumeDataWithEntries | null => {
      return data[type]?.entries.find((entry) => entry.id === id) || null;
    },
    [data]
  );

  const updateDraft = useCallback(
    (updatedData: ResumeData) => {
      try {
        const currentVersion = updatedData.about?.version || 0;
        const updatedAbout = {
          ...updatedData.about,
          version: currentVersion + 1,
        };

        const dataToSave: ResumeData = {
          ...updatedData,
          about: updatedAbout as NonNullable<ResumeData["about"]>,
        };

        localStorage.setItem("resumeDraft", JSON.stringify(dataToSave));
        setData(dataToSave);
        toast.success("Resume draft saved");
      } catch (error) {
        console.error("Error saving draft:", error);
        toast.error("Failed to save resume draft");
      }
    },
    [setData]
  );

  const updateData = useCallback(
    (type: ResumeDataKeys, newData: ResumeDataTypes) => {
      if (type === "about") {
        updateDraft({
          ...data,
          about: newData as NonNullable<ResumeData["about"]>,
        });
        return;
      }

      const entries = [...(data[type]?.entries || [])];
      const existingEntryIndex = entries.findIndex(
        (entry) => entry.id === newData.id
      );

      if (existingEntryIndex >= 0) {
        entries[existingEntryIndex] = newData as ResumeDataWithEntries;
      } else {
        entries.push(newData as ResumeDataWithEntries);
      }

      updateDraft({
        ...data,
        [type]: { entries },
      });
    },
    [data, updateDraft]
  );

  const updateOrganization = useCallback(
    (organization: Organization) => {
      const entries = [...(data.organizations?.entries || [])];
      const existingOrgIndex = entries.findIndex(
        (org) => org.id === organization.id
      );

      if (existingOrgIndex >= 0) {
        entries[existingOrgIndex] = organization;
      } else {
        entries.push(organization);
      }

      updateDraft({
        ...data,
        organizations: { entries },
      });
    },
    [data, updateDraft]
  );

  const deleteEntry = useCallback(
    (type: ResumeDataKeysWithEntries, id: string) => {
      if (!data[type]?.entries) {
        console.error(`No entries found for type: ${type}`);
        return;
      }

      const entries = data[type].entries.filter((entry) => entry.id !== id);

      updateDraft({
        ...data,
        [type]: { entries },
      });
    },
    [data, updateDraft]
  );

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
    deleteEntry,
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
