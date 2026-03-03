import { renderHook, waitFor } from "@testing-library/react";

import { createTestWrapper } from "../../test-utils";
import type { Person } from "../../types";
import useListData from "../useListData";

jest.mock("../../lib/api", () => ({
  fetchListData: jest.fn(),
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
];

describe("useListData", () => {
  const mockFetchListData = jest.requireMock("../../lib/api").fetchListData;

  beforeEach(() => {
    mockFetchListData.mockClear();
  });

  it("returns data when query succeeds", async () => {
    mockFetchListData.mockResolvedValue(mockPeople);

    const { result } = renderHook(() => useListData({ queryKey: "people" }), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockPeople);
    });

    expect(result.current.dataType).toBe("people");
  });

  it("calls fetchListData with correct parameters", async () => {
    mockFetchListData.mockResolvedValue(mockPeople);

    renderHook(() => useListData({ queryKey: "people" }), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => {
      expect(mockFetchListData).toHaveBeenCalledWith({ url: "people" });
    });
  });
});
