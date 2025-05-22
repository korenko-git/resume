import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { SkillManager } from "../SkillManager";
import { useSkills } from "@/hooks/useSkills";
import { SKILL_CATEGORIES } from "../сonstants";

// Mock useSkills for state control
jest.mock("@/hooks/useSkills");

const mockAddSkills = jest.fn();
const mockRemoveSkill = jest.fn();

const mockSkills = [
  { id: "TypeScript", category: "language" },
  { id: "React", category: "coreFrontend" },
  { id: "PostgreSQL", category: "database" },
];

beforeEach(() => {
  jest.clearAllMocks();
  (useSkills as jest.Mock).mockReturnValue({
    skills: mockSkills,
    addSkills: mockAddSkills,
    removeSkill: mockRemoveSkill,
  });
});

describe("SkillManager", () => {
  it("renders all categories", () => {
    render(<SkillManager />);
    SKILL_CATEGORIES.forEach((cat) => {
      expect(screen.getByText(cat.name)).toBeInTheDocument();
      expect(screen.getByText(cat.description)).toBeInTheDocument();
    });
  });

  it("passes skills to the correct categories", () => {
    render(<SkillManager />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("calls addSkills on add", () => {
    render(<SkillManager />);
    const input = screen.getAllByPlaceholderText("Add skills separated by comma")[0];
    const addBtn = screen.getAllByText("Add")[0];
    fireEvent.change(input, { target: { value: "Python" } });
    fireEvent.click(addBtn);
    expect(mockAddSkills).toHaveBeenCalled();
  });

  it("calls removeSkill on remove", () => {
    render(<SkillManager />);
    const removeBtns = screen.getAllByLabelText("remove");
    removeBtns[0].click();
    expect(mockRemoveSkill).toHaveBeenCalled();
  });
});