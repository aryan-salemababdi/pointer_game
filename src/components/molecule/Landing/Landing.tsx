import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import StartMenu from "../../Atom/StartMenu/StartMenu";


import landingBg from "../../../assets/IMG_20240531_005858.jpg";


interface ILanding {
    selected: (select: string) => void;
}

const Landing: FC<ILanding> = ({ selected }) => {


    const [state, setState] = useState<string>("")

    useEffect(() => {
        selected(state)
    }, [selected, state])

    return (
        <>
            <Box sx={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh"
            }}>
                <StartMenu
                    setSelected={(select) => {
                        setState(select)
                    }}
                />
            </Box>
        </>
    )
}

export default Landing;