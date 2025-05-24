import { fireEvent, render, screen } from "@/../__mocks__/testUtils";

import { EntityForm } from "../EntityForm";

// Mock the components used in EntityForm
jest.mock("@/components/common/ui/label", () => ({
  Label: ({ children, htmlFor }: any) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
}));

jest.mock("@/components/common/ui/input", () => ({
  Input: (props: any) => (
    <input
      id={props.id}
      value={props.value || ""}
      onChange={props.onChange}
      data-testid={`input-${props.id}`}
    />
  ),
}));

jest.mock("@/components/common/ui/textarea", () => ({
  Textarea: (props: any) => (
    <textarea
      id={props.id}
      value={props.value || ""}
      onChange={props.onChange}
      rows={props.rows}
      data-testid={`textarea-${props.id}`}
    />
  ),
}));

jest.mock("@/components/common/ui/switch", () => ({
  Switch: (props: any) => (
    <input
      type="checkbox"
      id={props.id}
      checked={props.checked}
      onChange={(e) => props.onCheckedChange(e.target.checked)}
      data-testid={`switch-${props.id}`}
    />
  ),
}));

jest.mock("@/components/common/ui/button", () => ({
  Button: ({ children, onClick, type }: any) => (
    <button
      onClick={onClick}
      type={type}
      data-testid={`button-${type || "button"}`}
    >
      {children}
    </button>
  ),
}));

jest.mock("../../controls/OrganizationSelector", () => ({
  OrganizationSelector: ({ value, onChange, label }: any) => (
    <div data-testid="organization-selector">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="org-select"
      >
        <option value="org-1">Organization 1</option>
      </select>
    </div>
  ),
}));

describe("EntityForm", () => {
  const mockOnUpdate = jest.fn();
  const mockData = {
    id: "exp-1",
    title: "Senior Developer",
    description: "Working on React applications",
    isPublished: true,
    startDate: "2021-01",
    endDate: "",
    skills: ["React", "TypeScript"],
    organizationId: "org-1",
  };

  beforeEach(() => {
    mockOnUpdate.mockClear();
  });

  it("renders form fields for experience type", () => {
    render(
      <EntityForm type="experience" data={mockData} onUpdate={mockOnUpdate} />,
    );

    expect(screen.getByTestId("input-title")).toHaveValue("Senior Developer");
    expect(screen.getByTestId("textarea-description")).toHaveValue(
      "Working on React applications",
    );
    expect(screen.getByTestId("switch-isPublished")).toBeChecked();
    expect(screen.getByTestId("organization-selector")).toBeInTheDocument();
  });

  it("updates form data when fields change", () => {
    render(
      <EntityForm type="experience" data={mockData} onUpdate={mockOnUpdate} />,
    );

    const titleInput = screen.getByTestId("input-title");
    fireEvent.change(titleInput, { target: { value: "Lead Developer" } });

    const descriptionTextarea = screen.getByTestId("textarea-description");
    fireEvent.change(descriptionTextarea, {
      target: { value: "New description" },
    });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Lead Developer",
        description: "New description",
      }),
    );
  });

  it("renders form fields for project type", () => {
    const projectData = {
      id: "proj-1",
      title: "Portfolio Website",
      description: "Personal portfolio website",
      isPublished: true,
      skills: ["React", "Next.js"],
      source: "https://github.com/user/project",
      demo: "https://example.com",
    };

    render(
      <EntityForm type="projects" data={projectData} onUpdate={mockOnUpdate} />,
    );

    expect(screen.getByTestId("input-title")).toHaveValue("Portfolio Website");
    expect(screen.getByTestId("textarea-description")).toHaveValue(
      "Personal portfolio website",
    );
  });
});
