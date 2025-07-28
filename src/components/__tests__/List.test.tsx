import { screen } from "@testing-library/react";

import { Endpoint } from "../../lib/api";
import { renderWithProviders } from "../../test-utils";
import type { Person } from "../../types";
import List from "../List";

// Mock the useListData hook
jest.mock("../../hooks/useListData", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockPeople: Person[] = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.info/api/planets/1/",
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    url: "https://swapi.info/api/people/1/",
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
  },
  {
    name: "C-3PO",
    height: "167",
    mass: "75",
    hair_color: "n/a",
    skin_color: "gold",
    eye_color: "yellow",
    birth_year: "112BBY",
    gender: "n/a",
    homeworld: "https://swapi.info/api/planets/1/",
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    url: "https://swapi.info/api/people/2/",
    created: "2014-12-10T15:10:51.357000Z",
    edited: "2014-12-20T21:17:50.309000Z",
  },
];

describe("<List />", () => {
  const mockUseListData = jest.requireMock("../../hooks/useListData").default;

  beforeEach(() => {
    mockUseListData.mockClear();
  });

  it("renders without crashing", () => {
    mockUseListData.mockReturnValue({
      data: mockPeople,
      dataType: Endpoint.people,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { container } = renderWithProviders(
      <List queryKey={Endpoint.people} />
    );

    expect(container).toBeTruthy();
  });

  it("displays the correct title", () => {
    mockUseListData.mockReturnValue({
      data: mockPeople,
      dataType: Endpoint.people,
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<List queryKey={Endpoint.people} />);

    expect(screen.getByText("PEOPLE List")).toBeTruthy();
  });

  it("renders list items", () => {
    mockUseListData.mockReturnValue({
      data: mockPeople,
      dataType: Endpoint.people,
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<List queryKey={Endpoint.people} />);

    expect(screen.getByText("Luke Skywalker")).toBeTruthy();
    expect(screen.getByText("C-3PO")).toBeTruthy();
  });

  it("handles empty data", () => {
    mockUseListData.mockReturnValue({
      data: [],
      dataType: Endpoint.people,
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<List queryKey={Endpoint.people} />);

    expect(screen.getByText("PEOPLE List")).toBeTruthy();
    expect(screen.queryByText("Luke Skywalker")).toBeFalsy();
  });
});
