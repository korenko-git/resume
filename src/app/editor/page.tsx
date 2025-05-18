import type { Metadata } from "next";

import { createOpenGraphMetadata } from "@/lib/metadata";

import EditorContent from "./EditorContent";

export const metadata: Metadata = {
  ...createOpenGraphMetadata({
    title: "Resume Editor",
    description: "Edit your resume online with a convenient interface",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function Editor() {
  return <EditorContent />;
}
