import type { Metadata } from "next";

import EditorContent from "@/components/pages/EditorContent";

export const metadata: Metadata = {
  title: "Resume Editor",
  description: "Edit your resume online with a convenient interface",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Editor() {
  return <EditorContent />;
}
