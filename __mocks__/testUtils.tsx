import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";

import { ResumeContext } from "@/contexts/ResumeContext";
import { ResumeData, ResumeDataKeysWithEntries } from "@/types/resume";

// Mock resume data
export const mockResumeData: ResumeData = {
  version: 1,
  about: {
    entries: [
      {
        id: "about-1",
        title: "John Smith",
        subtitle: "Senior Frontend Developer",
        description:
          "Experienced developer with a focus on React and TypeScript",
        isPublished: true,
        location: "New York, NY",
        email: "john@example.com",
        github: "https://github.com/johnsmith",
        linkedin: "https://linkedin.com/in/johnsmith",
      },
    ],
  },
  experience: {
    entries: [
      {
        id: "exp-1",
        title: "Senior Frontend Developer",
        description:
          "Development and maintenance of large-scale web applications.",
        isPublished: true,
        startDate: "2021-01",
        endDate: "",
        skills: ["React", "TypeScript", "Next.js"],
        organizationId: "meta",
      },
    ],
  },
  education: { entries: [] },
  projects: { entries: [] },
  certifications: { entries: [] },
  organizations: {
    entries: [
      {
        id: "meta",
        title: "Meta",
        description: "Technology company",
        logo: "/images/meta-logo.png",
        url: "https://meta.com",
      },
    ],
  },
  skills: {
    entries: [
      { id: "React", category: "frontend" },
      { id: "TypeScript", category: "language" },
      { id: "Next.js", category: "frontend" },
    ],
  },
};

const MockResumeContext = ({ children }: { children: React.ReactNode }) => {
  const updateData = (type: ResumeDataKeysWithEntries, data: any) => {
    console.log("Mock: Updating data:", type, data);
  };

  const deleteEntry = (type: ResumeDataKeysWithEntries, id: string) => {
    console.log("Mock: Deleting entry:", type, id);
  };

  const updateOrganization = (organization: any) => {
    console.log("Mock: Updating organization:", organization);
  };

  const getEntryFromData = (type: ResumeDataKeysWithEntries, id: string) => {
    const section = mockResumeData[type] as { entries?: any[] } | undefined;
    const entries = section?.entries || [];
    return entries.find((entry: any) => entry.id === id) || null;
  };

  const updateDraft = (updatedData: ResumeData) => {
    console.log("Mock: Updating draft:", updatedData);
  };

  const contextValue = {
    data: mockResumeData,
    loading: false,
    error: null,
    updateData,
    updateDraft, 
    updateOrganization,
    getEntryFromData,
    deleteEntry,
  };

  return (
    <ResumeContext.Provider value={contextValue as any}>
      {" "}
      {children}
    </ResumeContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: MockResumeContext, ...options });

// re-export everything
export * from "@testing-library/react";
export { customRender as render };
