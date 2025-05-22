import { fireEvent, render, screen } from "@testing-library/react";

import { Skill, SkillCategoryType } from "@/types/skill";

import { SkillCategory } from "../SkillCategory";

const category: {
  name: SkillCategoryType;
  description: string;
} = {
  name: "language",
  description: "Programming languages",
};

const baseSkills: Skill[] = [
  { id: "TypeScript", category: "language" }, 
  { id: "JavaScript", category: "language" },
];

describe("SkillCategory", () => {
  it("renders category skills", () => {
    render(
      <SkillCategory
        category={category}
        skills={baseSkills}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
        clearMessages={jest.fn()}
      />
    );
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("calls onAdd when adding", () => {
    const onAdd = jest.fn();
    render(
      <SkillCategory
        category={category}
        skills={[]}
        onAdd={onAdd}
        onRemove={jest.fn()}
        clearMessages={jest.fn()}
      />
    );
    const input = screen.getByPlaceholderText("Add skills separated by comma");
    fireEvent.change(input, { target: { value: "Python" } });
    fireEvent.click(screen.getByText("Add"));
    expect(onAdd).toHaveBeenCalledWith("language", "Python");
  });

  it("calls onRemove when removing", () => {
    const onRemove = jest.fn();
    render(
      <SkillCategory
        category={category}
        skills={baseSkills}
        onAdd={jest.fn()}
        onRemove={onRemove}
        clearMessages={jest.fn()}
      />
    );
    const removeBtn = screen.getAllByLabelText("remove")[0];
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledWith("language", "TypeScript");
  });

  it("clears messages on input focus", () => {
    const clearMessages = jest.fn();
    render(
      <SkillCategory
        category={category}
        skills={[]}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
        clearMessages={clearMessages}
      />
    );
    const input = screen.getByPlaceholderText("Add skills separated by comma");
    fireEvent.focus(input);
    expect(clearMessages).toHaveBeenCalled();
  });
});
