export const RESUME_THEME_STORAGE_KEY = "resume-theme";

export const THEME_OPTIONS = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeOption = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS];

export const THEME_LABELS = {
  [THEME_OPTIONS.LIGHT]: "Light",
  [THEME_OPTIONS.DARK]: "Dark",
} as const;
