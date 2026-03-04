import type {
  IGetItemCardReturnProps,
  IListItemProps,
  Person,
  Planet,
  Starship,
} from "../types";

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
