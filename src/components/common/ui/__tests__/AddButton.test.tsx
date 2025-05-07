import { fireEvent,render, screen } from "@testing-library/react";

import { AddButton } from "../AddButton";

describe("AddButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders correctly with label", () => {
    render(<AddButton onClick={mockOnClick} label="Experience" />);

    const button = screen.getByRole("button", { name: /add experience/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Add Experience");
  });

  it("calls onClick handler when clicked", () => {
    render(<AddButton onClick={mockOnClick} label="Project" />);

    const button = screen.getByRole("button", { name: /add project/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
