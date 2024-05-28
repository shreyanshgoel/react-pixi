import { useState } from "react";
import constants from "./constants";
import { useSprings } from "react-spring";
import _ from "lodash";

const useGame = ({ textures }) => {
  const [is_game_started, set_is_game_started] = useState(false);
  const [turn, set_turn] = useState<string | null>(null);
  const [main_deck, set_main_deck] = useState(_.filter(constants.CARDS, card=> card!==constants.CARDS.base));

  const [top_deck, set_top_deck] = useState<string[]>([]);
  const [bottom_deck, set_bottom_deck] = useState<string[]>([]);

  const [springs, api] = useSprings(constants.NUMBER_OF_CARDS, (i) => ({
    texture: textures[constants.CARDS.base],
    x: constants.WIDTH / 2 - i * 0.2,
    scale: [0.3, 0.3],
    y: constants.HEIGHT / 2,
    zIndex: constants.NUMBER_OF_CARDS - i,
    anchor: 0.5,
    angle: 0,
  }));

  const handle_start_game = () => {
    set_is_game_started(true);

    const temp_bottom_deck: string[] = [];
    const temp_top_deck: string[] = [];

    _.map(main_deck, (card, key) => {
      if (key % 2 === 0) {
        temp_bottom_deck.push(card);
      } else {
        temp_top_deck.push(card);
      }
    });

    set_bottom_deck(_.reverse(temp_bottom_deck));
    set_top_deck(_.reverse(temp_top_deck));

    const get_final_config = (
      final_x: number,
      final_y: number,
      delay: number,
      zIndex: number
    ) => {
      return {
        to: [
          {
            x: final_x,
            y: final_y,
            angle: 360,
            zIndex,
          },
        ],
        delay,
        config: {
          duration: 1000,
        },
      };
    };

    api.start((i) => {
      return {
        ...get_final_config(
          constants.WIDTH / 2 + i * 0.2,
          i % 2 === 0 ? constants.BOTTOM_DECK_Y : constants.TOP_DECK_Y,
          i * 200,
          i
        ),
        onRest: () => {
          if (i === constants.NUMBER_OF_CARDS - 1) {
            set_turn(constants.BOTTOM_PLAYER);
          }
        },
      };
    });
  };

  const handle_shuffle_deck = () => {
    const _main_deck = _.cloneDeep(main_deck);
    set_main_deck(_.shuffle(_main_deck));
  };

  const handle_shuffle_my_cards = () => {
    const _deck = _.cloneDeep(
      turn === constants.BOTTOM_PLAYER ? bottom_deck : top_deck
    );

    if (turn === constants.BOTTOM_PLAYER) {
      set_bottom_deck(_.shuffle(_deck));
    } else {
      set_top_deck(_.shuffle(_deck));
    }
  };

  const handle_play = () => {
    set_turn(
      turn === constants.BOTTOM_PLAYER
        ? constants.TOP_PLAYER
        : constants.BOTTOM_PLAYER
    );
  };



  return {
    handle_shuffle_deck,
    handle_start_game,
    is_game_started,
    springs,
    turn,
    handle_shuffle_my_cards,
    handle_play,
  };
};

export default useGame;
