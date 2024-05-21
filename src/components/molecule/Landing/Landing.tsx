import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import StartMenu from "../../Atom/StartMenu/StartMenu";


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
            <Box>
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