import _ from "lodash";
import { useContext } from "react";

import Card from "./Card";
import GameContext from "../context";
import PlayerButtons from "./PlayerButtons";
import { useSpring } from "react-spring";
import constants from "../constants";

const TopDeckComp = () => {
  const { on_play, top_deck, textures, turn } = useContext(GameContext);

  const get_card_position = (i: number) => {
    return {
      texture: textures[constants.CARDS.base],
      x: constants.WIDTH / 2 - i * constants.DIFF_BW_CARDS,
      scale: [constants.SCALE, constants.SCALE],
      y: constants.TOP_DECK_Y,
      zIndex: constants.VERY_BIG_ZINDEX - 10 - i,
      anchor: 0.5,
    };
  };
  const first_card_position = get_card_position(0);

  const [props, api] = useSpring(first_card_position, []);

  const handle_play = (drag_pos) => {
    on_play(api, first_card_position, drag_pos);
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

  const is_my_turn = turn === constants.TOP_PLAYER;

  return (
    <>
      {_.map(top_deck, (value: any, key: number) => {
        return (
          <Card
            key={`item${key}`}
            card_props={key === 0 ? props : get_card_position(key)}
            dragging={key === 0 && is_my_turn}
            handle_play={handle_play}
            api={api}
            handle_come_back={handle_come_back}
          />
        );
      })}
      {is_my_turn && <PlayerButtons handle_play={handle_play} />}
    </>
  );
};

export default TopDeckComp;
