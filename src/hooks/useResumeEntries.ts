import { useCallback } from "react";

import {
  Organization,
  ResumeData,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

export function useResumeEntries(
  data: ResumeData,
  updateDraft: (data: ResumeData) => void,
) {
  const getEntryFromData = useCallback(
    (
      type: ResumeDataKeysWithEntries,
      id: string,
    ): ResumeDataWithEntries | null => {
      return data[type]?.entries.find((entry) => entry.id === id) || null;
    },
    [data],
  );

  const updateData = useCallback(
    (type: ResumeDataKeysWithEntries, newData: ResumeDataWithEntries) => {
      const entries = [...(data[type]?.entries || [])];
      const existingEntryIndex = entries.findIndex(
        (entry) => entry.id === newData.id,
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
    [data, updateDraft],
  );

  const updateOrganization = useCallback(
    (organization: Organization) => {
      const entries = [...(data.organizations?.entries || [])];
      const existingOrgIndex = entries.findIndex(
        (org) => org.id === organization.id,
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
    [data, updateDraft],
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
    [data, updateDraft],
  );

  return {
    getEntryFromData,
    updateData,
    updateOrganization,
    deleteEntry,
  };
}
