import { useState, useEffect } from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;

export default function useTimer(start, interval = SECOND) {
    const [timespan, setTimespan] = useState(Date.now() - new Date(start).getTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimespan((_timespan) => _timespan + interval);
        }, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, [interval]);

    /* If the initial start time value changes */
    useEffect(() => {
        setTimespan(Date.now() - new Date(start).getTime());
    }, [start]);

    return {
        minutes: Math.floor((timespan / MINUTE)),
        seconds: Math.floor((timespan / SECOND) % 60)
    };
}