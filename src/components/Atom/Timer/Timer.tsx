import { Typography } from '@mui/material';
import { useState, useEffect, FC } from 'react';


interface ITimeer {
    getTime: (counter: number) => void;
}

const Timer: FC<ITimeer> = ({ getTime }) => {

    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(prevCounter => prevCounter + 1);
            getTime(counter)
        }, 1000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[counter]);


    return (
        <>
            <Typography fontWeight="bold" variant="h6">
                Time:
            </Typography>
            <Typography fontWeight="bold" variant="h6" color="green">
                {counter}
            </Typography>
        </>
    )
}

export default Timer