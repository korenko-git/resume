"use client";

import { createContext, ReactNode, useContext } from "react";

import { useResumeData } from "@/hooks/useResumeData";
import { useResumeEntries } from "@/hooks/useResumeEntries";
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
  const { data, setData, updateDraft } = useResumeData();
  const { getEntryFromData, updateData, updateOrganization, deleteEntry } =
    useResumeEntries(data, updateDraft);

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
