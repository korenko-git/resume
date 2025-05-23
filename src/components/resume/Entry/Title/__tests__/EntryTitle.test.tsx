import { render, screen } from "../../../../../../__mocks__/testUtils";
import { EntryTitle } from "../EntryTitle";

jest.mock("../OrganizationTitle", () => ({
  OrganizationTitle: ({ title }: any) => (
    <div data-testid="organization-title">Organization: {title}</div>
  ),
}));

jest.mock("../ProjectTitle", () => ({
  ProjectTitle: ({ title }: any) => (
    <div data-testid="project-title">Project: {title}</div>
  ),
}));

describe("EntryTitle", () => {
  it("renders OrganizationTitle when organizationId is provided", () => {
    render(
      <EntryTitle
        data={{
          organizationId: "meta",
          title: "Senior Developer",
        }}
      />,
    );

    expect(screen.getByTestId("organization-title")).toBeInTheDocument();
    expect(screen.queryByTestId("project-title")).not.toBeInTheDocument();
  });

  it("renders ProjectTitle when source or demo is provided", () => {
    render(
      <EntryTitle
        data={{
          title: "Project Name",
          source: "https://github.com/example/project",
        }}
      />,
    );

    expect(screen.getByTestId("project-title")).toBeInTheDocument();
    expect(screen.queryByTestId("organization-title")).not.toBeInTheDocument();
  });

  it("renders ProjectTitle when demo is provided without source", () => {
    render(
      <EntryTitle
        data={{
          title: "Project Name",
          demo: "https://demo.example.com",
        }}
      />,
    );

    expect(screen.getByTestId("project-title")).toBeInTheDocument();
  });
});
