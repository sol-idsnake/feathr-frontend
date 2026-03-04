import {
  formatNumber,
  getEntityDetailFields,
  getIdfromUrl,
  getItemCard,
} from "../utils";

describe("Helper Functions", () => {
  describe("formatNumber", () => {
    it("should format numbers correctly", () => {
      expect(formatNumber("1000000")).toBe("1,000,000");
      expect(formatNumber("1234567")).toBe("1,234,567");
      expect(formatNumber("1000")).toBe("1,000");
    });

    it("should handle unknown value", () => {
      expect(formatNumber("unknown")).toBe("Unknown");
    });

    it("should handle values with commas", () => {
      expect(formatNumber("1,000,000")).toBe("1,000,000");
    });

    it("should return original string for invalid input", () => {
      expect(formatNumber("invalid")).toBe("invalid");
      expect(formatNumber("n/a")).toBe("n/a");
    });
  });

  describe("getIdfromUrl", () => {
    it("should extract ID from URL", () => {
      expect(getIdfromUrl("https://swapi.info/api/people/1/")).toBe("1");
      expect(getIdfromUrl("https://swapi.info/api/planets/5/")).toBe("5");
      expect(getIdfromUrl("https://swapi.info/api/starships/10/")).toBe("10");
    });

    it("should handle URLs without trailing slash", () => {
      expect(getIdfromUrl("https://swapi.info/api/people/1")).toBe("1");
    });

    it("should return last segment for invalid URLs", () => {
      expect(getIdfromUrl("invalid-url")).toBe("invalid-url");
      expect(getIdfromUrl("")).toBe("");
    });
  });

  describe("getEntityDetailFields", () => {
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
      residents: [],
      films: [],
      created: "",
      edited: "",
    } as any;

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
      films: [],
      created: "",
      edited: "",
    } as any;

    it("returns correct fields for planets", () => {
      const fields = getEntityDetailFields(mockPlanet, "planets");
      expect(fields).toContainEqual({ label: "Climate", value: "arid" });
      expect(fields).toContainEqual({ label: "Terrain", value: "desert" });
      expect(fields).toContainEqual({ label: "Population", value: "200,000" });
      expect(fields).toContainEqual({ label: "Orbital Period", value: "304 days" });
      expect(fields).toContainEqual({ label: "Surface Water", value: "1%" });
    });

    it("returns correct fields for starships", () => {
      const fields = getEntityDetailFields(mockStarship, "starships");
      expect(fields).toContainEqual({ label: "Model", value: "DS-1 Orbital Battle Station" });
      expect(fields).toContainEqual({ label: "Cost", value: "1,000,000,000,000" });
      expect(fields).toContainEqual({ label: "Hyperdrive Rating", value: "4.0" });
    });

    it("returns empty array for unknown dataType", () => {
      const fields = getEntityDetailFields(mockPlanet, "films" as any);
      expect(fields).toEqual([]);
    });
  });

  describe("getItemCard", () => {
    it("returns header and height/mass fields for people", () => {
      const result = getItemCard({
        item: {
          url: "https://swapi.info/api/people/1/",
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
        } as any,
        dataType: "people",
      });
      expect(result.header).toBe("Luke Skywalker");
      expect(result.id).toBe("1");
      expect(result.fields).toEqual([
        { label: "Height", value: "172" },
        { label: "Mass", value: "77" },
      ]);
    });

    it("returns header and population field for planets", () => {
      const result = getItemCard({
        item: {
          url: "https://swapi.info/api/planets/1/",
          name: "Tatooine",
          population: "200000",
        } as any,
        dataType: "planets",
      });
      expect(result.header).toBe("Tatooine");
      expect(result.id).toBe("1");
      expect(result.fields).toEqual([{ label: "Population", value: "200,000" }]);
    });

    it("returns header and cost field for starships", () => {
      const result = getItemCard({
        item: {
          url: "https://swapi.info/api/starships/9/",
          name: "Death Star",
          cost_in_credits: "1000000000000",
        } as any,
        dataType: "starships",
      });
      expect(result.header).toBe("Death Star");
      expect(result.id).toBe("9");
      expect(result.fields).toEqual([{ label: "Cost", value: "1,000,000,000,000" }]);
    });

    it("returns empty default for unknown dataType", () => {
      const result = getItemCard({
        item: { url: "https://swapi.info/api/films/1/" } as any,
        dataType: "films",
      });
      expect(result.id).toBe("0");
      expect(result.header).toBe("");
      expect(result.fields).toEqual([]);
    });
  });
});
