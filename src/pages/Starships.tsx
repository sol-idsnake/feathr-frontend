import { type JSX, useCallback } from "react";

import List from "../components/List";
import ListItem from "../components/ListItem";
import { formatCredits } from "../lib/helper";
import type { Starship } from "../types";

function Starships(): JSX.Element {
  const getStartshipItem = useCallback((starship: Starship) => {
    const formattedFields = [
      { label: "Cost", value: formatCredits(starship.cost_in_credits) },
    ];

    return (
      <ListItem
        header={starship.name}
        key={starship.name}
        fields={formattedFields}
      />
    );
  }, []);

  return (
    <List<Starship> renderItems={getStartshipItem} title="Starships List" />
  );
}

export default Starships;
