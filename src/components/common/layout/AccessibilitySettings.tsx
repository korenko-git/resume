"use client";

import { Contrast, Eye, Type, Volume2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/ui/dialog";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { Switch } from "@/components/common/ui/switch";
import { THEME_LABELS, THEME_OPTIONS } from "@/constants/theme";

interface AccessibilitySettings {
  fontSize: "normal" | "large" | "extra-large";
  reducedMotion: boolean;
  highContrast: boolean;
  screenReaderMode: boolean;
}

const ACCESSIBILITY_STORAGE_KEY = "accessibility-settings";

export function AccessibilitySettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    reducedMotion: false,
    highContrast: false,
    screenReaderMode: false,
  });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to parse accessibility settings. Error:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));

    document.documentElement.classList.toggle(
      "font-large",
      settings.fontSize === "large",
    );
    document.documentElement.classList.toggle(
      "font-extra-large",
      settings.fontSize === "extra-large",
    );
    document.documentElement.classList.toggle(
      "reduced-motion",
      settings.reducedMotion,
    );
    document.documentElement.classList.toggle(
      "high-contrast",
      settings.highContrast,
    );
    document.documentElement.classList.toggle(
      "screen-reader-mode",
      settings.screenReaderMode,
    );
  }, [settings, mounted]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: "normal",
      reducedMotion: false,
      highContrast: false,
      screenReaderMode: false,
    });
    setTheme(THEME_OPTIONS.DARK);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          tabIndex={0}
          variant="outline"
          size="icon"
          aria-label="Open accessibility settings"
          title="Accessibility settings"
        >
          <Eye className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme-select">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme-select">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={THEME_OPTIONS.LIGHT}>
                  {THEME_LABELS[THEME_OPTIONS.LIGHT]}
                </SelectItem>
                <SelectItem value={THEME_OPTIONS.DARK}>
                  {THEME_LABELS[THEME_OPTIONS.DARK]}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size-select">Font Size</Label>
            <Select
              value={settings.fontSize}
              onValueChange={(value: AccessibilitySettings["fontSize"]) =>
                updateSetting("fontSize", value)
              }
            >
              <SelectTrigger id="font-size-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="flex items-center gap-2">
              <Contrast className="h-4 w-4" aria-hidden="true" />
              High Contrast
            </Label>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) =>
                updateSetting("highContrast", checked)
              }
              aria-describedby="high-contrast-desc"
            />
          </div>
          <p id="high-contrast-desc" className="text-muted-foreground text-sm">
            Increases contrast for better visibility
          </p>

          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" aria-hidden="true" />
              Reduce Motion
            </Label>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={(checked) =>
                updateSetting("reducedMotion", checked)
              }
              aria-describedby="reduced-motion-desc"
            />
          </div>
          <p id="reduced-motion-desc" className="text-muted-foreground text-sm">
            Reduces animations and transitions
          </p>

          <div className="flex items-center justify-between">
            <Label htmlFor="screen-reader" className="flex items-center gap-2">
              <Type className="h-4 w-4" aria-hidden="true" />
              Screen Reader Mode
            </Label>
            <Switch
              id="screen-reader"
              checked={settings.screenReaderMode}
              onCheckedChange={(checked) =>
                updateSetting("screenReaderMode", checked)
              }
              aria-describedby="screen-reader-desc"
            />
          </div>
          <p id="screen-reader-desc" className="text-muted-foreground text-sm">
            Optimizes interface for screen readers
          </p>

          <Button
            onClick={resetSettings}
            variant="outline"
            className="w-full"
            aria-label="Reset all accessibility settings to default"
          >
            Reset to Default
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
