"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/common/ui/button";
import { DraftDialog } from "@/components/editor/dialogs/DraftDialog";
import { Editor } from "@/components/editor/Editor";
import { useResume } from "@/contexts/ResumeContext";
import { getSingularForm } from "@/lib/entityUtils";
import { processAllEntryImages } from "@/lib/imageUtils";
import { createUpdateZip } from "@/lib/zipUtils";
import { ResumeData } from "@/types/resume";

export default function EditorContent() {
  const router = useRouter();
  const { data } = useResume();

  const handleDownload = async () => {
    const imageFiles: File[] = [];
    const { version, ...dataWithoutVersion } = data;
    const dataWithImagePaths = {
      ...dataWithoutVersion,
      version: { version: version + 1 },
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
          const processedEntries = await processAllEntryImages(
            section.entries as any[],
            getSingularForm(sectionName),
            imageFiles,
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
      <div className="container mx-auto py-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="text-3xl font-bold">Resume Editor</h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              Home
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="download-button"
            >
              Download Changes as ZIP
            </Button>
          </div>
        </div>

        <Editor />
      </div>
    </>
  );
}
