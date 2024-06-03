import _ from "lodash";
import { useContext } from "react";

import Card from "./Card";
import GameContext from "../context";
import PlayerButtons from "./PlayerButtons";
import { useSpring } from "react-spring";
import constants from "../constants";

const BottomDeckComp = () => {
  const { on_play, bottom_deck, textures, turn } = useContext(GameContext);

  const get_card_position = (i: number) => {
    return {
      texture: textures[constants.CARDS.base],
      x: constants.WIDTH / 2 - i * constants.DIFF_BW_CARDS,
      scale: [constants.SCALE, constants.SCALE],
      y: constants.BOTTOM_DECK_Y,
      zIndex: constants.VERY_BIG_ZINDEX - 10 - i,
      anchor: 0.5,
    };
  };

  const first_card_position = get_card_position(0);

  const [props, api] = useSpring(first_card_position, []);

  const handle_play = () => {
    on_play(api, first_card_position);
  };

  const handle_come_back = () => {
    api.start(() => {
      return {
        to: [
          {
            ...first_card_position,
          },
        ],
        config: {
          duration: 500,
          easing: (t) => t,
        },
      };
    });
  };

  return (
    <>
      {_.map(bottom_deck, (value: any, key: number) => {
        return (
          <Card
            key={`item${key}`}
            card_props={key === 0 ? props : get_card_position(key)}
            dragging={key === 0}
            handle_play={handle_play}
            api={api}
            handle_come_back={handle_come_back}
          />
        );
      })}
      {turn === constants.BOTTOM_PLAYER && (
        <PlayerButtons handle_play={handle_play} />
      )}
    </>
  );
};

export default BottomDeckComp;
