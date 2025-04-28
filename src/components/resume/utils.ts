import { BaseEntry } from "@/types/resume";

export const filterPublished = <T extends BaseEntry>(entries: T[], editable: boolean): T[] => {
  return editable ? entries : entries.filter(entry => entry.isPublished);
};