import { Container } from "@pixi/react-animated";

import useGame from "./useGame";
import StartingDeck from "./components/StartingDeck";
import GameContext from "./context";
import { useContext } from "react";
import BottomDeckComp from "./components/BottomDeckComp";
import TopDeckComp from "./components/TopDeckComp";
import TableDeckComp from "./components/TableDeckComp";

const GameComp = () => {
  const { is_game_started } = useContext(GameContext);

  return (
    <Container sortableChildren={true}>
      {!is_game_started && <StartingDeck />}
      <TableDeckComp />
      <BottomDeckComp />
      <TopDeckComp />
    </Container>
  );
};

const Game = ({ textures }) => {
  const value = useGame({ textures });

  return (
    <GameContext.Provider value={value}>
      <GameComp />
    </GameContext.Provider>
  );
};

export default Game;
