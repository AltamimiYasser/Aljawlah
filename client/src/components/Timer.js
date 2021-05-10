import React, { useState } from 'react';
import { useEffect } from 'react';

const Timer = ({ startTimeInSeconds, isActive }) => {
  const [seconds, setSeconds] = useState(startTimeInSeconds);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  return <>{new Date(seconds * 1000).toISOString().substr(11, 8)}</>;
};

export default Timer;
