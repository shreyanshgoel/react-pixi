import { useContext } from "react";
import _ from "lodash";

import constants from "../constants";
import Card from "./Card";

import GameContext from "../context";

const TableDeckComp = () => {
  const { textures, table_deck } = useContext(GameContext);

  const get_card_position = (i: number) => {
    return {
      texture: textures[table_deck[i]],
      x: constants.WIDTH / 2,
      scale: [constants.SCALE, constants.SCALE],
      y: constants.HEIGHT / 2,
      zIndex: constants.VERY_BIG_ZINDEX - 10 - i,
      anchor: 0.5,
    };
  };

  return (
    <>
      {_.map(table_deck, (value, key: number) => {
        return (
          <Card
            key={`item${key}`}
            card_props={get_card_position(key)}
            dragging={false}
          />
        );
      })}
    </>
  );
};

export default TableDeckComp;
