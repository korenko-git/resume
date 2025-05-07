"use client";

import { useRouter } from "next/navigation";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/common/ui/button";
import { ThemeToggle } from "@/components/common/layout/ThemeToggle";
import { Editor } from "@/components/editor/Editor";
import { DraftDialog } from "../editor/dialogs/DraftDialog";
import { createUpdateZip } from "@/lib/zipUtils";
import { processAllEntryImages } from "@/lib/imageUtils";
import { ResumeData } from "@/types/resume";

export default function EditorContent() {
  const router = useRouter();
  const { data, loading, error } = useResume();

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">Error: {error.message}</div>
    );
  }

  const handleDownload = async () => {
    const imageFiles: File[] = [];
    const { version, ...dataWithoutVersion } = data;
    const dataWithImagePaths = {
      ...dataWithoutVersion,
      abaout: { ...data.about, version: version },
    };

    for (const sectionName of Object.keys(dataWithoutVersion) as Array<
      keyof Omit<ResumeData, "version">
    >) {
      const section = dataWithoutVersion[sectionName];

      if (
        typeof section === "object" &&
        section !== null &&
        "entries" in section
      ) {
        if (section?.entries?.length) {
          const prefix = sectionName.endsWith("s")
            ? sectionName.slice(0, -1)
            : sectionName;

          const processedEntries = await processAllEntryImages(
            section.entries as any[],
            prefix,
            imageFiles
          );

          (dataWithImagePaths[sectionName] as any).entries = processedEntries;
        }
      }
    }

    const zip = await createUpdateZip(dataWithImagePaths, imageFiles, {
      submittedBy: "guest_user",
    });

    const url = URL.createObjectURL(zip);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-update.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <DraftDialog />
      <div className="container mx-auto py-8 ">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Resume Editor</h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={() => router.push("/")}>
              Home
            </Button>
            <Button onClick={handleDownload} className="download-button">
              Download Changes as ZIP
            </Button>
          </div>
        </div>

        <Editor />
      </div>
    </>
  );
}
