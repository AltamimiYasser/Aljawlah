import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const StyledTimer = styled.div`
  background: ${({ active, paused, ended }) =>
    (active && '#38aa38') ||
    (paused && ended && 'rgb(187, 47, 0)') ||
    (paused && '#ff8000') ||
    'lightgrey'};
  width: 100%;
  text-align: center;
  border-radius: 1.5em;
  padding: 0.3em 0.1em;
`;

const Timer = ({ startTimeInSeconds, isActive, paused, ended }) => {
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
  return (
    <StyledTimer active={isActive} paused={paused} ended={ended}>
      {new Date(seconds * 1000).toISOString().substr(11, 8)}
    </StyledTimer>
  );
};

export default Timer;
