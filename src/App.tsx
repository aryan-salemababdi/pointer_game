import { useState } from 'react';
import { Box } from "@mui/material";
import Landing from './components/molecule/Landing/Landing'
import GamePage from './components/molecule/GamePage/GamePage';
import ResultPage from './components/molecule/ResultPage/ResultPage';


function App() {
  const [gameMode, setGameMode] = useState<string>("");
  const [resultPage, setResultPage] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ m: 0, p: 0, overflow: "hidden" }}>
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
      </Box>
    </>
  )
}

export default App;
