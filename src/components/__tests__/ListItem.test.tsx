import { renderWithProviders } from "../../test-utils";
import type { Person } from "../../types";
import ListItem from "../ListItem";

const mockPerson: Person = {
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
};

describe("<ListItem />", () => {
  it("renders without crashing", () => {
    const { container } = renderWithProviders(
      <ListItem item={mockPerson} dataType="people" />
    );

    expect(container).toBeTruthy();
  });

  it("displays the person details", () => {
    const { getByText } = renderWithProviders(
      <ListItem item={mockPerson} dataType="people" />
    );

    expect(getByText("Height: 172")).toBeTruthy();
    expect(getByText("Mass: 77")).toBeTruthy();
    expect(getByText("Luke Skywalker")).toBeTruthy();
  });
});
