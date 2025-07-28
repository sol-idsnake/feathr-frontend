import { renderWithProviders } from "../../test-utils";
import Header from "../Header";

describe("<Header />", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it("renders without crashing", () => {
    const { container } = renderWithProviders(
      <Header opened={false} toggle={mockToggle} />
    );

    expect(container).toBeTruthy();
  });

  it("displays the title", () => {
    const { getByText } = renderWithProviders(
      <Header opened={false} toggle={mockToggle} />
    );

    expect(getByText("Star Wars Explorer")).toBeTruthy();
  });

  it("displays the logo", () => {
    const { getByText } = renderWithProviders(
      <Header opened={false} toggle={mockToggle} />
    );

    expect(getByText("Logo")).toBeTruthy();
  });

  it("renders burger menu when opened is false", () => {
    const { container } = renderWithProviders(
      <Header opened={false} toggle={mockToggle} />
    );

    const burgerButton = container.querySelector("button");
    expect(burgerButton).toBeTruthy();
  });

  it("renders burger menu when opened is true", () => {
    const { container } = renderWithProviders(
      <Header opened={true} toggle={mockToggle} />
    );

    const burgerButton = container.querySelector("button");
    expect(burgerButton).toBeTruthy();
  });
});
