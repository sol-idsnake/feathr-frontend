import type { IGetItemCardReturnProps, IListItemProps, Person, Planet, Starship } from "../types";
import type { ApiRoute } from "../types/api";

export function formatNumber(value: string): string {
  if (value.includes("unknown")) {
    return "Unknown";
  }

  const num = Number(value.replaceAll(",", ""));

  if (isNaN(num)) {
    return value;
  }

  return num.toLocaleString();
}

export function getIdfromUrl(url: string): string {
  return url.split("/").filter(Boolean).at(-1) ?? "";
}

export function getEntityDetailFields(
  entity: Person | Planet | Starship,
  dataType: ApiRoute,
): { label: string; value: string }[] {
  switch (dataType) {
    case "people": {
      const p = entity as Person;
      return [
        { label: "Birth Year", value: p.birth_year },
        { label: "Gender", value: p.gender },
        { label: "Height", value: `${p.height} cm` },
        { label: "Mass", value: `${p.mass} kg` },
        { label: "Hair Color", value: p.hair_color },
        { label: "Eye Color", value: p.eye_color },
        { label: "Skin Color", value: p.skin_color },
        { label: "Homeworld", value: p.homeworld },
      ];
    }
    case "planets": {
      const p = entity as Planet;
      return [
        { label: "Climate", value: p.climate },
        { label: "Diameter", value: p.diameter },
        { label: "Gravity", value: p.gravity },
        { label: "Orbital Period", value: `${p.orbital_period} days` },
        { label: "Population", value: formatNumber(p.population) },
        { label: "Rotation Period", value: `${p.rotation_period} hrs` },
        { label: "Surface Water", value: `${p.surface_water}%` },
        { label: "Terrain", value: p.terrain },
      ];
    }
    case "starships": {
      const s = entity as Starship;
      return [
        { label: "Class", value: s.starship_class },
        { label: "Cost", value: formatNumber(s.cost_in_credits) },
        { label: "Crew", value: s.crew },
        { label: "Hyperdrive Rating", value: s.hyperdrive_rating },
        { label: "Manufacturer", value: s.manufacturer },
        { label: "Model", value: s.model },
        { label: "Passengers", value: s.passengers },
      ];
    }
    default:
      return [];
  }
}

export function getEntityBadgeGroups(
  entity: Person | Planet | Starship,
  dataType: ApiRoute,
): { label: string; color: string; items: string[] }[] {
  switch (dataType) {
    case "people": {
      const p = entity as Person;
      return [
        { label: "Species", color: "blue", items: p.species },
        { label: "Films", color: "indigo", items: p.films },
        { label: "Starships", color: "teal", items: p.starships },
      ];
    }
    case "planets": {
      const p = entity as Planet;
      return [
        { label: "Residents", color: "green", items: p.residents },
        { label: "Films", color: "indigo", items: p.films },
      ];
    }
    case "starships": {
      const s = entity as Starship;
      return [
        { label: "Pilots", color: "orange", items: s.pilots },
        { label: "Films", color: "indigo", items: s.films },
      ];
    }
    default:
      return [];
  }
}

export function getItemCard({ item, dataType }: IListItemProps): IGetItemCardReturnProps {
  const entityId = getIdfromUrl(item.url);

  switch (dataType) {
    case "planets": {
      const planet = item as Planet;
      const fields = [
        {
          label: "Population",
          value: formatNumber(planet.population),
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
          value: formatNumber(starship.cost_in_credits),
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
