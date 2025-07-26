import { type JSX, useCallback } from "react";

import List from "../components/List";
import ListItem from "../components/ListItem";
import type { Character } from "../types";

function Characters(): JSX.Element {
  const getCharacterItem = useCallback((character: Character) => {
    const formattedFields = [
      { label: "Height", value: character.height },
      { label: "Mass", value: character.mass },
    ];

    return (
      <ListItem
        header={character.name}
        key={character.name}
        fields={formattedFields}
      />
    );
  }, []);

  return (
    <List<Character> renderItems={getCharacterItem} title="Characters List" />
  );
}

export default Characters;
