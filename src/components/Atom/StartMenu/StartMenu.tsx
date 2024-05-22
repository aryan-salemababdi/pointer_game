import { FC } from "react";
import {
  Box,
  Button,
  Card,
  Typography
} from "@mui/material";


interface IStartMenu {
  setSelected: (select: string) => void;
}


const StartMenu: FC<IStartMenu> = ({ setSelected }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card sx={{ width: "350px", maxWidth: "350px", p: "20px" }}>
          <Box textAlign="center">
            <Typography fontWeight="bold" variant="h6">
              welcome to the Petal Picker
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-around" m="20px 10px">
            <Box>
              <Button variant="contained" color="success" onClick={() => setSelected("monocot")}>
                monocot
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="success" onClick={() => setSelected("dicot")} >
                dicot
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default StartMenu;