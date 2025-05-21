"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";

import { getResume } from "@/lib/getResume";
import {
  Organization,
  ResumeData,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

interface ResumeContextType {
  data: ResumeData;
  updateData: (
    type: ResumeDataKeysWithEntries,
    newData: ResumeDataWithEntries
  ) => void;
  updateOrganization: (organization: Organization) => void;
  getEntryFromData: (
    type: ResumeDataKeysWithEntries,
    id: string
  ) => ResumeDataWithEntries | null;
  setData: (data: ResumeData) => void;
  updateDraft: (updatedData: ResumeData) => void;
  deleteEntry: (type: ResumeDataKeysWithEntries, id: string) => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(
  undefined
);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(getResume());

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
    (updatedDataToSave: ResumeData) => {
      try {
        const currentRootVersion = updatedDataToSave.version || 0;
        const dataWithBumpedVersion: ResumeData = {
          ...updatedDataToSave,
          version: currentRootVersion + 1, // Bump root version
        };

        localStorage.setItem(
          "resumeDraft",
          JSON.stringify(dataWithBumpedVersion)
        );
        setData(dataWithBumpedVersion);
        toast.success("Resume draft saved");
      } catch (e) {
        console.error("Error saving draft:", e);
        toast.error("Failed to save resume draft");
      }
    },
    [setData]
  );

  const updateData = useCallback(
    (type: ResumeDataKeysWithEntries, newData: ResumeDataWithEntries) => {
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
    updateData,
    setData,
    updateDraft,
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
