// Base interface for all SWAPI entities
interface BaseEntity {
  created: string;
  edited: string;
  films: string[];
  name: string;
  url: string;
}

interface Person extends BaseEntity {
  birth_year: string;
  eye_color: string;
  gender: "male" | "female" | "n/a" | "none" | "hermaphrodite" | string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}

interface Planet extends BaseEntity {
  climate: string;
  diameter: string;
  gravity: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
}

interface Starship extends BaseEntity {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  crew: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  MGLT: string;
  model: string;
  passengers: string;
  pilots: string[];
  starship_class: string;
}

interface Film extends Omit<BaseEntity, "name" | "films"> {
  characters: string[];
  director: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  vehicles: string[];
}

interface Specie extends BaseEntity {
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
}

interface IListItemProps {
  item: Entity;
  dataType: string;
}

interface GetItemCardReturnProps {
  fields: { label: string; value: string }[];
  header: string;
  id: string;
}

interface RelatedQuery {
  key: string;
  url: string;
  id: string;
}

type Entity = Planet | Starship | Person | Film | Specie;

export type { BaseEntity, Entity, Film, Person, Planet, Specie, Starship };
export type { GetItemCardReturnProps, IListItemProps, RelatedQuery };
