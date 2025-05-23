export type Version = number;

export interface BaseEntry {
  id: string;
  title: string;
  description: string;
  isPublished?: boolean;
}

export interface Organization extends Omit<BaseEntry, "isPublished"> {
  logo: string;
  url: string;
}

export interface LinkableEntity {
  link?: string;
}
