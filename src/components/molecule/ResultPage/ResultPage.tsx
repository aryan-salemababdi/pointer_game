import { Box, Button, Card, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increse } from "../../../stores/slices/pointsSlice/pointsSlice";

interface IResultPage {
  setMenuPage: (status: string, menu: boolean) => void;
}


const ResultPage: FC<IResultPage> = ({ setMenuPage }) => {

  const state = useSelector((store: { pointer: { point: number } }) => store.pointer.point);
  const dispatch = useDispatch();

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
                امتیاز کلی شما: 
              </Typography>
              <Typography fontWeight="bold" variant="h6" color="green">
                {state}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="success"
              onClick={() => {
                dispatch(increse(-state))
                setMenuPage("", false);
              }}
            >
            برگشت به منو
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default ResultPage;