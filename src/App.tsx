import { useState } from 'react'
import Landing from './components/molecule/Landing/Landing'
import GamePage from './components/molecule/GamePage/GamePage';
import ResultPage from './components/molecule/ResultPage/ResultPage';

function App() {
  const [gameMode, setGameMode] = useState<string>("");
  const [resultPage, setResultPage] = useState<boolean>(false);

  return (
    <>
      {
        gameMode === "" ? (
          <Landing
            selected={(select) => {
              setGameMode(select)
            }}
          />
        ) : resultPage ? (
          <ResultPage
            setMenuPage={(status, menu) => {
              setGameMode(status)
              setResultPage(menu)
            }}
          />
        ) : (
          <GamePage
            role={gameMode}
            setBackPage={(state) => {
              setGameMode(state)
            }}
            result={(resultPage) => {
              setResultPage(resultPage);
            }}
          />
        )
      }
    </>
  )
}

export default App;
