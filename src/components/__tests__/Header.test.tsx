import { renderWithProviders } from "../../test-utils";
import Header from "../Header";

describe("<Header />", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it("renders without crashing", () => {
    const { container } = renderWithProviders(<Header opened={false} toggle={mockToggle} />);

    expect(container).toBeTruthy();
  });

  it("displays the title", () => {
    const { getByText } = renderWithProviders(<Header opened={false} toggle={mockToggle} />);

    expect(getByText("Star Wars Explorer")).toBeTruthy();
  });

  it("displays the logo", () => {
    const { getByText } = renderWithProviders(<Header opened={false} toggle={mockToggle} />);

    expect(getByText("Logo")).toBeTruthy();
  });

  it("reflects the opened state on the burger", () => {
    const { container, rerender } = renderWithProviders(
      <Header opened={false} toggle={mockToggle} />,
    );
    expect(container.querySelector("[data-opened]")).toBeNull();

    rerender(<Header opened={true} toggle={mockToggle} />);
    expect(container.querySelector("[data-opened]")).toBeTruthy();
  });
});
