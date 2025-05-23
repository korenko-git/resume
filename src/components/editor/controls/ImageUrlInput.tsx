import { useState } from "react";

import { Label } from "@/components/common/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/ui/tabs";
import { cn } from "@/lib/utils";

import { ImageUpload } from "./ImageUpload";
import { UrlInput } from "./UrlInput";

interface ImageUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  urlPlaceholder?: string;
}

export function ImageUrlInput({
  value,
  onChange,
  label = "Image or URL",
  className,
  urlPlaceholder = "https://",
}: ImageUrlInputProps) {
  const [activeTab, setActiveTab] = useState<"image" | "url">(
    value?.startsWith("data:") ? "image" : "url",
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value as "image" | "url");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="url">Link</TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="pt-4">
          <ImageUpload
            value={value?.startsWith("data:") ? value : ""}
            onChange={onChange}
            label={"Link to local image"}
          />
        </TabsContent>

        <TabsContent value="url" className="pt-4">
          <UrlInput
            value={!value?.startsWith("data:") ? value : ""}
            onChange={onChange}
            label={"Link"}
            placeholder={urlPlaceholder}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
