// Base interface for all SWAPI entities
interface BaseEntity {
  created: string;
  edited: string;
  films: string[];
  name: string;
  url: string;
}

interface Character extends BaseEntity {
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

export type { BaseEntity, Character, Planet, Starship };
