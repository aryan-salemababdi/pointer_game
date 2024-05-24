import { FC, useEffect, useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
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
        positionX: number;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items: Omit<Flower, "id" | "positionX">[] = [
        { petal: 5, img: flower5 },
        { petal: 6, img: flower6 },
        { petal: 4, img: flower4 }
    ];

    const ref = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemRef = useRef<any>({});
    const [currentItems, setCurrentItems] = useState<Flower[]>([]);
    const [removedItems, setRemovedItems] = useState<number[]>([]);
    const [timer, setTimer] = useState<number | null>(null);
    const state = useSelector((store: { pointer: { point: number } }) => store.pointer.point);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * items.length);
            const positions = [10, 20, 30, 40, 50, 60, 70, 80, 90];
            const randomPositionIndex = Math.floor(Math.random() * positions.length);
            const newItem = {
                ...items[randomIndex],
                id: Date.now(),
                positionX: positions[randomPositionIndex]
            };
            setCurrentItems(prevItems => [...prevItems, newItem]);
            setTimeout(() => {
                const tops = currentItems
                    .filter(item => itemRef.current[item.id])
                    .map(item => ({
                        id: item.id,
                        top: itemRef.current[item.id]?.getBoundingClientRect().top
                    }));

                if (ref.current && tops) {
                    const containerHeight = ref.current.clientHeight;
                    tops.forEach(({ id, top }) => {
                        if (top && top >= containerHeight) {
                            itemRef.current[id].style.display = "none";
                        }
                    });
                }
            }, 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [items, currentItems]);


    useEffect(() => {
        if (timer === 60) result(true);
    }, [timer, result]);





    const handleItemClick = (id: number): void => {
        const clickedItem = currentItems.find(item => item.id === id);
        if (clickedItem) {
            if (role === "monocot") {
                if (clickedItem.petal % 5 === 0 || clickedItem.petal % 6 === 0) {
                    dispatch(increse(1));
                }
            } else {
                if (clickedItem.petal % 2 === 0) {
                    dispatch(increse(1));
                }
            }
            setRemovedItems([...removedItems, id]);
            setCurrentItems(currentItems.filter(item => item.id !== id));
        }
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
        <div style={{ overflow: "hidden" }}>
            <Box width="100%" height="100%" display="flex">
                <Box m={3} height="90vh" width="10%">
                    <Button
                        variant="contained"
                        onClick={() => {
                            setBackPage("");
                            dispatch(increse(-state));
                        }}
                        color="error"
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Box textAlign="center" my={20}>
                        <Typography fontWeight="bold" variant="h6">
                            امتیاز شما :
                        </Typography>
                        <Typography fontWeight="bold" color="green">
                            {state}
                        </Typography>
                        <Box mt={10}>
                            <Timer getTime={(counter) => {
                                setTimer(counter);
                            }} />
                        </Box>
                    </Box>
                </Box>
                <Box width="90%" height="90vh" position="relative" ref={ref}>
                    {currentItems.map(item => (
                        !removedItems.includes(item.id) && (
                            <Box
                                key={item.id}
                                ref={el => itemRef.current[item.id] = el}
                                position="absolute"
                                left={`calc(${item.positionX}%)`}
                                sx={{
                                    animation: `${fallingAnimation} 10s linear`
                                }}
                                onClick={() => handleItemClick(item.id)}
                            >
                                <img src={item.img} alt={`Flower with ${item.petal} petals`} width={50} />
                            </Box>
                        )
                    ))}
                </Box>
            </Box>
        </div>
    );
}

export default GamePage;
