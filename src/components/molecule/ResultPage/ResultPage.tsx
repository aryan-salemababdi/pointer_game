import { Box, Button, Card, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

interface IResultPage {
  setMenuPage: (status: string, menu: boolean) => void;
}


const ResultPage: FC<IResultPage> = ({ setMenuPage }) => {

  const state = useSelector((store: { pointer: { point: number } }) => store.pointer.point);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card sx={{ width: "350px", maxWidth: "350px", p: "20px" }}>
          <Box display="flex" justifyContent="space-around" m="20px 10px">
            <Box textAlign="center">
              <Typography fontWeight="bold" variant="h5">
                your total point is:
              </Typography>
              <Typography fontWeight="bold" variant="h6" color="green">
                {state}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="success" onClick={() => setMenuPage("", false)}>
              برگشت به منو
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default ResultPage;