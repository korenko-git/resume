import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ResumeContext } from "@/contexts/ResumeContext";
import { ResumeDataKeysWithEntries } from "@/types/resume";

// Mock resume data
export const mockResumeData = {
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
        isPublished: true,
        logo: "/images/meta-logo.png",
        url: "https://meta.com",
      },
    ],
  },
};

const MockResumeContext = ({ children }: { children: React.ReactNode }) => {
  const updateData = (type: any, data: any) => {
    console.log("Updating data:", type, data);
  };

  const deleteEntry = (type: any, id: any) => {
    console.log("Deleting entry:", type, id);
  };

  const updateOrganization = (organization: any) => {
    console.log("Updating organization:", organization);
  };

  const getEntryFromData = (type: ResumeDataKeysWithEntries, id: any) => {
    const entries = mockResumeData[type]?.entries || [];
    return entries.find((entry: any) => entry.id === id) || null;
  };

  const setData = (newData: any) => {
    console.log("Setting data:", newData);
  };

  const setVersion = (version: number) => {
    console.log("Setting version:", version);
  };

  const contextValue = {
    data: mockResumeData,
    organizations: mockResumeData.organizations.entries,
    loading: false,
    error: null,
    version: mockResumeData.version,
    setVersion,
    updateData,
    setData,
    updateOrganization,
    getEntryFromData,
    deleteEntry,
  };

  return (
    <ResumeContext.Provider value={contextValue}>
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
