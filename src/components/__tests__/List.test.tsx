import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Endpoints } from "../../lib/api";
import { renderWithProviders } from "../../test-utils";
import List from "../List";

// Mock the hook
jest.mock("../../hooks/useListData", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseListData = jest.requireMock("../../hooks/useListData").default;

describe("<List />", () => {
  const mockPerson = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.info/api/planets/1/",
    films: ["https://swapi.info/api/films/1/"],
    species: [],
    vehicles: [],
    starships: [],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.info/api/people/1/",
  };

  const mockPerson2 = {
    name: "C-3PO",
    height: "167",
    mass: "75",
    hair_color: "n/a",
    skin_color: "gold",
    eye_color: "yellow",
    birth_year: "112BBY",
    gender: "n/a",
    homeworld: "https://swapi.info/api/planets/1/",
    films: ["https://swapi.info/api/films/1/"],
    species: [],
    vehicles: [],
    starships: [],
    created: "2014-12-10T15:10:51.357000Z",
    edited: "2014-12-20T21:17:50.309000Z",
    url: "https://swapi.info/api/people/2/",
  };

  beforeEach(() => {
    mockUseListData.mockClear();
  });

  it("renders list with data", () => {
    mockUseListData.mockReturnValue({
      data: [mockPerson, mockPerson2],
      dataType: Endpoints.people,
    });

    renderWithProviders(<List queryKey={Endpoints.people} />);

    expect(screen.getByText("People")).toBeInTheDocument();
  });

  it("renders list items correctly", () => {
    mockUseListData.mockReturnValue({
      data: [mockPerson],
      dataType: Endpoints.people,
    });

    renderWithProviders(<List queryKey={Endpoints.people} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("handles empty data", () => {
    mockUseListData.mockReturnValue({
      data: [],
      dataType: Endpoints.people,
    });

    renderWithProviders(<List queryKey={Endpoints.people} />);

    expect(screen.getByText("People")).toBeInTheDocument();
  });

  it("renders search input", () => {
    mockUseListData.mockReturnValue({
      data: [mockPerson, mockPerson2],
      dataType: Endpoints.people,
    });

    renderWithProviders(<List queryKey={Endpoints.people} />);

    expect(screen.getByPlaceholderText("Search people...")).toBeInTheDocument();
  });

  it("filters list by name", async () => {
    mockUseListData.mockReturnValue({
      data: [mockPerson, mockPerson2],
      dataType: Endpoints.people,
    });

    renderWithProviders(<List queryKey={Endpoints.people} />);

    await userEvent.type(screen.getByPlaceholderText("Search people..."), "Luke");

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.queryByText("C-3PO")).not.toBeInTheDocument();
  });

  it("shows no results message when filter matches nothing", async () => {
    mockUseListData.mockReturnValue({
      data: [mockPerson, mockPerson2],
      dataType: Endpoints.people,
    });

    renderWithProviders(<List queryKey={Endpoints.people} />);

    await userEvent.type(screen.getByPlaceholderText("Search people..."), "Darth Vader");

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("restores all items when search is cleared", async () => {
    mockUseListData.mockReturnValue({
      data: [mockPerson, mockPerson2],
      dataType: Endpoints.people,
    });

    renderWithProviders(<List queryKey={Endpoints.people} />);

    const input = screen.getByPlaceholderText("Search people...");
    await userEvent.type(input, "Luke");
    expect(screen.queryByText("C-3PO")).not.toBeInTheDocument();

    await userEvent.clear(input);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("C-3PO")).toBeInTheDocument();
  });
});
