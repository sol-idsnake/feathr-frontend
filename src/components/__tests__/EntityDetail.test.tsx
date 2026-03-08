import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";

import { Endpoints } from "../../lib/api";
import { renderWithProviders } from "../../test-utils";
import EntityDetail from "../EntityDetail";

const mockPlanet = {
  name: "Tatooine",
  url: "https://swapi.info/api/planets/1/",
  climate: "arid",
  terrain: "desert",
  gravity: "1 standard",
  diameter: "10465",
  population: "200000",
  orbital_period: "304",
  rotation_period: "23",
  surface_water: "1",
  residents: ["Owen Lars", "Beru Lars"],
  films: ["A New Hope"],
  created: "",
  edited: "",
};

const mockStarship = {
  name: "Death Star",
  url: "https://swapi.info/api/starships/9/",
  model: "DS-1 Orbital Battle Station",
  starship_class: "Deep Space Mobile Battlestation",
  manufacturer: "Imperial Department of Military Research",
  cost_in_credits: "1000000000000",
  crew: "342,953",
  passengers: "843,342",
  hyperdrive_rating: "4.0",
  cargo_capacity: "1000000000000",
  consumables: "3 years",
  length: "120000",
  max_atmosphering_speed: "n/a",
  MGLT: "10",
  pilots: ["Darth Vader"],
  films: ["A New Hope"],
  created: "",
  edited: "",
};

const mockPerson = {
  name: "Luke Skywalker",
  url: "https://swapi.info/api/people/1/",
  birth_year: "19BBY",
  eye_color: "blue",
  gender: "male",
  hair_color: "blond",
  height: "172",
  homeworld: "Tatooine",
  mass: "77",
  skin_color: "fair",
  species: [],
  starships: ["X-wing"],
  films: ["A New Hope"],
  vehicles: [],
  created: "",
  edited: "",
};

describe("<EntityDetail />", () => {
  describe("planets", () => {
    it("renders planet name", () => {
      renderWithProviders(<EntityDetail entity={mockPlanet} dataType={Endpoints.homeworld} />);
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });

    it("renders planet scalar fields", () => {
      renderWithProviders(<EntityDetail entity={mockPlanet} dataType={Endpoints.homeworld} />);
      expect(screen.getByText("Climate:")).toBeInTheDocument();
      expect(screen.getByText("arid")).toBeInTheDocument();
      expect(screen.getByText("Terrain:")).toBeInTheDocument();
    });

    it("renders residents badge group", () => {
      renderWithProviders(<EntityDetail entity={mockPlanet} dataType={Endpoints.homeworld} />);
      expect(screen.getByText("Residents")).toBeInTheDocument();
      expect(screen.getByText("Owen Lars")).toBeInTheDocument();
      expect(screen.getByText("Beru Lars")).toBeInTheDocument();
    });

    it("renders films badge group", () => {
      renderWithProviders(<EntityDetail entity={mockPlanet} dataType={Endpoints.homeworld} />);
      expect(screen.getByText("Films")).toBeInTheDocument();
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });

    it("renders Unknown for empty badge groups", () => {
      const emptyPlanet = { ...mockPlanet, residents: [], films: [] };
      renderWithProviders(<EntityDetail entity={emptyPlanet} dataType={Endpoints.homeworld} />);
      expect(screen.getAllByText("Unknown")).toHaveLength(2);
    });
  });

  describe("starships", () => {
    it("renders starship name", () => {
      renderWithProviders(<EntityDetail entity={mockStarship} dataType={Endpoints.starships} />);
      expect(screen.getByText("Death Star")).toBeInTheDocument();
    });

    it("renders starship scalar fields", () => {
      renderWithProviders(<EntityDetail entity={mockStarship} dataType={Endpoints.starships} />);
      expect(screen.getByText("Model:")).toBeInTheDocument();
      expect(screen.getByText("DS-1 Orbital Battle Station")).toBeInTheDocument();
    });

    it("renders pilots badge group", () => {
      renderWithProviders(<EntityDetail entity={mockStarship} dataType={Endpoints.starships} />);
      expect(screen.getByText("Pilots")).toBeInTheDocument();
      expect(screen.getByText("Darth Vader")).toBeInTheDocument();
    });

    it("renders films badge group", () => {
      renderWithProviders(<EntityDetail entity={mockStarship} dataType={Endpoints.starships} />);
      expect(screen.getByText("Films")).toBeInTheDocument();
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });
  });

  describe("people", () => {
    it("renders person name", () => {
      renderWithProviders(<EntityDetail entity={mockPerson} dataType={Endpoints.people} />);
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    it("renders person scalar fields", () => {
      renderWithProviders(<EntityDetail entity={mockPerson} dataType={Endpoints.people} />);
      expect(screen.getByText("Birth Year:")).toBeInTheDocument();
      expect(screen.getByText("19BBY")).toBeInTheDocument();
      expect(screen.getByText("Homeworld:")).toBeInTheDocument();
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });

    it("renders starships badge group", () => {
      renderWithProviders(<EntityDetail entity={mockPerson} dataType={Endpoints.people} />);
      expect(screen.getByText("Starships")).toBeInTheDocument();
      expect(screen.getByText("X-wing")).toBeInTheDocument();
    });

    it("renders films badge group", () => {
      renderWithProviders(<EntityDetail entity={mockPerson} dataType={Endpoints.people} />);
      expect(screen.getByText("Films")).toBeInTheDocument();
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });
  });
});
