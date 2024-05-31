import _ from "lodash";
import { useEffect, useRef, useState } from "react";

import constants from "./constants";
import { SpringRef } from "react-spring";

const useGame = ({ textures }) => {
  const [turn, set_turn] = useState<string | null>(null);
  const [main_deck, set_main_deck] = useState(
    _.shuffle(
      _.filter(constants.CARDS, (card) => card !== constants.CARDS.base)
    )
  );
  const [is_game_started, set_is_game_started] = useState(false);
  const last_turn_ref = useRef<string | null>(null);

  const [top_deck, set_top_deck] = useState<string[]>([]);
  const [bottom_deck, set_bottom_deck] = useState<string[]>([]);

  const [table_deck, set_table_deck] = useState<string[]>([]);

  const is_bottom_player_turn = turn === constants.BOTTOM_PLAYER;

  const handle_shuffle_main_deck = () => {
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

  const on_game_started = () => {
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
    set_turn(constants.BOTTOM_PLAYER);
    set_is_game_started(true);
  };

  const on_play = (api: SpringRef, first_card_pos) => {
    last_turn_ref.current = turn;
    set_turn(null);
    const final_x = constants.WIDTH / 2;
    const final_y = constants.HEIGHT / 2;
    const player_deck = _.cloneDeep(
      is_bottom_player_turn ? bottom_deck : top_deck
    );

    const _table_deck = _.cloneDeep(table_deck);

    api.start(() => {
      return {
        to: [
          {
            y: is_bottom_player_turn
              ? (constants.BOTTOM_DECK_Y + final_y) / 2
              : final_y / 2,
            scale: [0.02, constants.SCALE],
            zIndex: constants.VERY_BIG_ZINDEX,
          },
          {
            texture: textures[player_deck[0]],
            config: { duration: 0 },
          },
          {
            x: final_x,
            y: final_y,
            scale: [constants.SCALE, constants.SCALE],
          },
          {
            ...first_card_pos,
            config: {
              duration: 0,
            },
          },
        ],
        config: {
          duration: 500,
          easing: (t) => t,
        },
        onRest: () => {
          const card: string = player_deck[0];
          _table_deck.unshift(card);
          set_table_deck(_table_deck);

          player_deck.shift();
          if (is_bottom_player_turn) {
            set_bottom_deck(player_deck);
          } else {
            set_top_deck(player_deck);
          }
        },
      };
    });
  };

  useEffect(() => {
    if (!_.isEmpty(table_deck)) {
      setTimeout(() => {
        let change_turn = true;
        if (_.split(table_deck[0], "")[0] === _.split(table_deck[1], "")[0]) {
          if (last_turn_ref.current === constants.BOTTOM_PLAYER) {
            const new_deck = [...table_deck, ...bottom_deck];
            set_bottom_deck(new_deck);
          } else {
            const new_deck = [...table_deck, ...top_deck];
            set_top_deck(new_deck);
          }
          set_table_deck([]);
          change_turn = false;
        }

        set_turn(
          !change_turn
            ? last_turn_ref.current
            : last_turn_ref.current === constants.BOTTOM_PLAYER
            ? constants.TOP_PLAYER
            : constants.BOTTOM_PLAYER
        );
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table_deck]);

  useEffect(() => {
    if (is_game_started) {
      if (_.isEmpty(bottom_deck)) {
        alert("Top Player Wins");
      }

      if (_.isEmpty(top_deck)) {
        alert("Bottom Player Wins");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottom_deck, top_deck]);

  return {
    handle_shuffle_main_deck,
    on_game_started,
    turn,
    handle_shuffle_my_cards,
    on_play,
    textures,
    bottom_deck,
    top_deck,
    is_bottom_player_turn,
    table_deck,
    is_game_started,
  };
};

export default useGame;
