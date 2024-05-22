import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { increse } from "../../../stores/slices/pointsSlice/pointsSlice";
import { keyframes } from '@emotion/react';

// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// components
import Timer from "../../Atom/Timer/Timer";

// images
import flower5 from "../../../assets/flower.png";
import flower6 from "../../../assets/flower-with-rounded-petals.png";
import flower4 from "../../../assets/nature.png";

interface IGamePage {
    role: string;
    setBackPage: (state: string) => void;
    result: (resultPage: boolean) => void;
}

const GamePage: FC<IGamePage> = ({ setBackPage, result, role }) => {

    interface Flower {
        id: number;
        petal: number;
        img: string;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items: Flower[] = [
        {
            id: 0,
            petal: 5,
            img: flower5
        },
        {
            id: 1,
            petal: 6,
            img: flower6
        },
        {
            id: 2,
            petal: 4,
            img: flower4
        }
    ];

    const [currentItem, setCurrentItem] = useState<Flower | null>(null);
    const [removedItems, setRemovedItems] = useState<number[]>([]);
    const [positionX, setPositionX] = useState<number>(0);
    const [timer, setTimer] = useState<number | null>(null);
    const state = useSelector((store: { pointer: { point: number } }) => store.pointer.point);
    const dispatch = useDispatch();


    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * items.length);
            setCurrentItem(items[randomIndex]);
            setRemovedItems([]);
            const randomOffset = (Math.random() * 90);
            setPositionX(randomOffset);
        }, 3500);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (timer === 60) result(true);
    });

    const handleItemClick = (id: number): void => {
        if (role === "monocot") {
            if (currentItem !== null) {
                if (currentItem.petal % 5 === 0 || currentItem.petal % 6 === 0) {
                    dispatch(increse(1))
                }
            }
        }
        else {
            if (currentItem !== null) {
                if (currentItem.petal % 2 === 0) {
                    dispatch(increse(1))
                }
            }
        }
        setRemovedItems([...removedItems, id]);
        setCurrentItem(null);
    };


    const fallingAnimation = keyframes`
        0% {
            top: 0;
        }
        100% {
            top: 100vh;
        }
    `;


    return (
        <>
            <Box width="100%" display="flex">
                <Box m={3} height="100vh" width="10%">
                    <Button
                        variant="contained"
                        onClick={() => {
                            setBackPage("")
                            dispatch(increse(-state))
                        }}
                        color="error"
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Box textAlign="center" my={20}>
                        <Typography fontWeight="bold" variant="h6">
                            Total points:
                        </Typography>
                        <Typography fontWeight="bold" color="green">
                            {state}
                        </Typography>
                        <Box mt={10}>
                            <Timer getTime={(counter) => {
                                setTimer(counter)
                            }} />
                        </Box>
                    </Box>
                </Box>
                <Box width="90%" height="100vh" position="relative">
                    {currentItem && !removedItems.includes(currentItem.id) && (
                        <Box
                            key={currentItem.id}
                            position="absolute"
                            left={`calc(${positionX}%)`}
                            sx={{
                                transform: 'translateX(-50%)',
                                animation: `${fallingAnimation} 5s linear`
                            }}
                            onClick={() => handleItemClick(currentItem.id)}
                        >
                            <img src={currentItem.img} alt={`Flower with ${currentItem.petal} petals`} width={50} />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default GamePage;
