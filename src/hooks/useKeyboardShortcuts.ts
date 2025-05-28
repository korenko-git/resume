import { useEffect } from "react";
import { useTheme } from "next-themes";
import { THEME_OPTIONS } from "@/constants/theme";

export function useKeyboardShortcuts() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey) {
        switch (e.key) {
          case 'T':
            e.preventDefault();
            if (theme === THEME_OPTIONS.LIGHT) {
              setTheme(THEME_OPTIONS.DARK);
            } else {
              setTheme(THEME_OPTIONS.LIGHT);
            }
            break;
          case 'H':
            e.preventDefault();
            window.location.hash = '#about';
            break;
          case 'E':
            e.preventDefault();
            window.location.hash = '#experience';
            break;
          case 'P':
            e.preventDefault();
            window.location.hash = '#projects';
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setTheme, theme]);
}