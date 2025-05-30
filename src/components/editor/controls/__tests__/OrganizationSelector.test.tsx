import { render, screen } from "@/../__mocks__/testUtils";

import { OrganizationSelector } from "../OrganizationSelector";

// Mock the createDefaultEntity function
jest.mock("@/lib/entityUtils", () => ({
  createDefaultEntity: () => ({
    id: "new-org-id",
    title: "New Organization",
    description: "",
    isPublished: true,
    logo: "",
    url: "",
  }),
}));

describe("OrganizationSelector", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with default label", () => {
    render(<OrganizationSelector value="" onChange={mockOnChange} />);

    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Create new")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(
      <OrganizationSelector value="" onChange={mockOnChange} label="Company" />,
    );

    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("shows selected value in selector", () => {
    render(<OrganizationSelector value="meta" onChange={mockOnChange} />);

    const selectTrigger = screen.getByRole("combobox");
    expect(selectTrigger).toBeInTheDocument();
  });
});
