import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SkillManager } from "../SkillManager";

describe("SkillManager", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a skill to the correct category", async () => {
    render(<SkillManager />);
    const input = screen.getAllByPlaceholderText("Add skills separated by comma")[0];
    const button = screen.getAllByText("Add")[0];

    fireEvent.change(input, { target: { value: "TypeScript" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Success")).toBeInTheDocument();
    });
  });

  it("does not add duplicates", async () => {
    render(<SkillManager />);
    const input = screen.getAllByPlaceholderText("Add skills separated by comma")[0];
    const button = screen.getAllByText("Add")[0];

    fireEvent.change(input, { target: { value: "TypeScript" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "TypeScript" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("All entered skills already exist")).toBeInTheDocument();
    });
  });

  it("removes a skill", async () => {
    render(<SkillManager />);
    const input = screen.getAllByPlaceholderText("Add skills separated by comma")[0];
    const button = screen.getAllByText("Add")[0];

    fireEvent.change(input, { target: { value: "TypeScript" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    const removeBtn = screen.getByLabelText("remove");
    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
      expect(screen.getByText("Success")).toBeInTheDocument();
    });
  });
});