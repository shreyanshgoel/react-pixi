import { Container } from "@pixi/react-animated";

import constants from "./constants";
import Button from "./components/Button";
import useGame from "./useGame";
import StartingDeck from "./components/StartingDeck";

const Game = ({ textures }) => {
  const {
    turn,
    handle_shuffle_my_cards,
    handle_play,
    on_game_started,
    handle_shuffle_main_deck,
  } = useGame({ textures });

  return (
    <Container sortableChildren={true}>
      {!turn && (
        <StartingDeck
          textures={textures}
          on_game_started={on_game_started}
          handle_shuffle_main_deck={handle_shuffle_main_deck}
        />
      )}

      {turn && (
        <>
          <Button
            on_click={handle_play}
            x={80}
            y={turn === constants.BOTTOM_PLAYER ? constants.HEIGHT - 100 : 50}
            width={80}
            height={30}
            border_radius={10}
            text="Play"
          />
          <Button
            on_click={handle_shuffle_my_cards}
            x={80}
            y={turn === constants.BOTTOM_PLAYER ? constants.HEIGHT - 50 : 100}
            width={80}
            height={30}
            border_radius={10}
            text="Shuffle"
          />
        </>
      )}
    </Container>
  );
};

export default Game;
