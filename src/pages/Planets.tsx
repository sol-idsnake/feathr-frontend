import { type JSX, useCallback } from "react";

import List from "../components/List";
import ListItem from "../components/ListItem";
import { formatPopulation } from "../lib/helper";
import type { Planet } from "../types";

function Planets(): JSX.Element {
  const getPlanetItem = useCallback((planet: Planet) => {
    const formattedFields = [
      {
        label: "Population",
        value: formatPopulation(planet.population),
      },
    ];

    return (
      <ListItem
        header={planet.name}
        key={planet.name}
        fields={formattedFields}
      />
    );
  }, []);

  return <List<Planet> renderItems={getPlanetItem} title="Planets List" />;
}

export default Planets;
