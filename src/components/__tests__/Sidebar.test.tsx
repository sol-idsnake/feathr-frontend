import { renderWithProviders } from "../../test-utils";
import Sidebar from "../Sidebar";

describe("<Sidebar />", () => {
  it("renders without crashing", () => {
    const { container } = renderWithProviders(<Sidebar />);

    expect(container).toBeTruthy();
  });

  it("displays all navigation items", () => {
    const { container, getByText } = renderWithProviders(<Sidebar />);
    const links = container.querySelectorAll("a");

    expect(getByText("People")).toBeTruthy();
    expect(getByText("Planets")).toBeTruthy();
    expect(getByText("Starships")).toBeTruthy();
    expect(links.length).toBe(3);
  });

  it("marks only the current route's nav item as active", () => {
    window.history.pushState({}, "", "/people");
    const { container } = renderWithProviders(<Sidebar />);
    const activeItems = container.querySelectorAll("a[data-active]");
    expect(activeItems.length).toBe(1);
  });
});
