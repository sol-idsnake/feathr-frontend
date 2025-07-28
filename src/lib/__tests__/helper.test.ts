import { formatCredits, formatPopulation, getIdfromUrl } from "../helper";

describe("Helper Functions", () => {
  describe("formatPopulation", () => {
    it("should format population numbers correctly", () => {
      expect(formatPopulation("1000000")).toBe("1,000,000");
      expect(formatPopulation("1234567")).toBe("1,234,567");
      expect(formatPopulation("1000")).toBe("1,000");
    });

    it("should handle unknown population", () => {
      expect(formatPopulation("unknown")).toBe("Unknown");
      expect(formatPopulation("n/a")).toBe("n/a");
    });

    it("should handle invalid numbers", () => {
      expect(formatPopulation("invalid")).toBe("invalid");
    });
  });

  describe("formatCredits", () => {
    it("should format credits correctly", () => {
      expect(formatCredits("1000000")).toBe("1,000,000");
      expect(formatCredits("1234567")).toBe("1,234,567");
      expect(formatCredits("1000")).toBe("1,000");
    });

    it("should handle unknown credits", () => {
      expect(formatCredits("unknown")).toBe("Unknown");
    });

    it("should handle credits with commas", () => {
      expect(formatCredits("1,000,000")).toBe("1,000,000");
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
});
