import React from "react";

interface Props {
  handle_shuffle_main_deck: any;
  on_game_started: any;
  turn: any;
  handle_shuffle_my_cards: any;
  on_play: any;
  textures: any;
  bottom_deck: any;
  top_deck: any;
  is_bottom_player_turn: any;
  table_deck: any;
  is_game_started: boolean;
}

const GameContext = React.createContext<Props>({} as Props);

export default GameContext;
