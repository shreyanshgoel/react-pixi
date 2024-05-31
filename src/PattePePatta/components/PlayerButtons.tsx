import { useContext } from "react";
import GameContext from "../context";
import constants from "../constants";
import Button from "./Button";

const PlayerButtons = ({ handle_play }) => {
  const { handle_shuffle_my_cards, is_bottom_player_turn } =
    useContext(GameContext);

  return (
    <>
      <Button
        on_click={handle_play}
        x={80}
        y={is_bottom_player_turn ? constants.HEIGHT - 100 : 50}
        width={80}
        height={30}
        border_radius={10}
        text="Play"
      />
      <Button
        on_click={handle_shuffle_my_cards}
        x={80}
        y={is_bottom_player_turn ? constants.HEIGHT - 50 : 100}
        width={80}
        height={30}
        border_radius={10}
        text="Shuffle"
      />
    </>
  );
};

export default PlayerButtons;
