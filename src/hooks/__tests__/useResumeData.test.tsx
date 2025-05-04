import { renderHook, waitFor } from "@testing-library/react";
import { useResumeData } from "../useResumeData";

// Mock the data imports
jest.mock(
  "@/data/organizations.json",
  () => ({
    entries: [{ id: "org-1", title: "Organization 1" }],
  }),
  { virtual: true }
);

jest.mock(
  "@/data/about.json",
  () => ({
    entries: [{ id: "about-1", title: "John Smith" }],
    version: 1,
  }),
  { virtual: true }
);

jest.mock(
  "@/data/experience.json",
  () => ({
    entries: [{ id: "exp-1", title: "Experience 1" }],
  }),
  { virtual: true }
);

jest.mock(
  "@/data/projects.json",
  () => ({
    entries: [{ id: "proj-1", title: "Project 1" }],
  }),
  { virtual: true }
);

jest.mock(
  "@/data/education.json",
  () => ({
    entries: [{ id: "edu-1", title: "Education 1" }],
  }),
  { virtual: true }
);

jest.mock(
  "@/data/certifications.json",
  () => ({
    entries: [{ id: "cert-1", title: "Certification 1" }],
  }),
  { virtual: true }
);

describe("useResumeData", () => {
  it("loads data correctly", async () => {
    const { result } = renderHook(() => useResumeData());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(null);
    expect(result.current.data.about.entries).toEqual([
      { id: "about-1", title: "John Smith" },
    ]);
    expect(result.current.data.experience.entries).toEqual([
      { id: "exp-1", title: "Experience 1" },
    ]);
    expect(result.current.data.organizations.entries).toEqual([
      { id: "org-1", title: "Organization 1" },
    ]);
  });
});
