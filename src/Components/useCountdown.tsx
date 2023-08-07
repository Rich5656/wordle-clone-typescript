import React, {useState, useEffect} from 'react'

const useCountdown = () => {
  const [countDown, setCountDown] = useState<number>(0);
//   const [runTimer, setRunTimer] = useState<boolean>(true);

    useEffect(() => {
        setCountDown(5 * 60 * 1000);
        const interval = setInterval(() => {
                console.log(countDown)
                setCountDown(prev => prev - 1000);
            }, 1000);

        return () => clearInterval(interval);
    }, []);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60) / 1000));

    return [minutes, seconds];
}

export { useCountdown };