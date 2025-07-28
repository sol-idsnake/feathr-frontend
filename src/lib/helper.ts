import type {
  IGetItemCardReturnProps,
  IListItemProps,
  IRelatedQueryProps,
  Person,
  Planet,
  Starship,
} from "../types";
import { Endpoints, getDataTypeRoute } from "./api";

export function formatPopulation(population: string): string {
  if (population.includes("unknown")) {
    return "Unknown";
  }

  const num = Number(population);

  if (isNaN(num)) {
    return population;
  }

  return num.toLocaleString();
}

export function formatCredits(credits: string): string {
  if (credits.includes("unknown")) {
    return "Unknown";
  }

  const num = Number(credits.replace(/,/g, ""));

  if (isNaN(num)) {
    return credits;
  }

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function getTotalPages(total: number, pageSize = 10): number {
  return Math.ceil(total / pageSize);
}

export function getIdfromUrl(url: string): string {
  return url.split("/").filter(Boolean).pop() ?? "";
}

export function getItemCard({
  item,
  dataType,
}: IListItemProps): IGetItemCardReturnProps {
  const entityId = getIdfromUrl(item.url);

  switch (dataType) {
    case "planets": {
      const planet = item as Planet;
      const fields = [
        {
          label: "Population",
          value: formatPopulation(planet.population),
        },
      ];
      return {
        header: planet.name,
        id: entityId,
        fields,
      };
    }

    case "starships": {
      const starship = item as Starship;
      const fields = [
        {
          label: "Cost",
          value: formatCredits(starship.cost_in_credits),
        },
      ];
      return {
        header: starship.name,
        id: entityId,
        fields,
      };
    }

    case "people": {
      const person = item as Person;
      const fields = [
        { label: "Height", value: person.height },
        { label: "Mass", value: person.mass },
      ];

      return {
        header: person.name,
        fields,
        id: entityId,
      };
    }

    default:
      return {
        id: "0",
        header: "",
        fields: [],
      };
  }
}

export function buildRelatedQueries({
  isSuccess,
  person,
}: {
  isSuccess: boolean;
  person?: Person;
}): IRelatedQueryProps[] {
  if (!isSuccess || !person) {
    return [];
  }

  const queries: IRelatedQueryProps[] = [];

  // Add homeworld query
  if (person.homeworld) {
    queries.push({
      key: Endpoints.homeworld,
      url: getDataTypeRoute("homeworld"),
      id: getIdfromUrl(person.homeworld),
    });
  }

  // Add species queries
  person.species.forEach((url) => {
    queries.push({
      key: Endpoints.species,
      url: getDataTypeRoute("species"),
      id: getIdfromUrl(url),
    });
  });

  // Add films queries
  person.films.forEach((url) => {
    queries.push({
      key: Endpoints.films,
      url: getDataTypeRoute("films"),
      id: getIdfromUrl(url),
    });
  });

  // Add starships queries
  person.starships.forEach((url) => {
    queries.push({
      key: Endpoints.starships,
      url: getDataTypeRoute("starships"),
      id: getIdfromUrl(url),
    });
  });

  return queries.filter((query) => query.id);
}
