import { useState, useRef } from "react";

const useTimer = () => {
  const countRef = useRef(null);
  const [timer, setTimer] = useState(0);

  const handleStartTimer = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePauseTimer = () => {
    clearInterval(countRef.current);
  };

  const handleResumeTimer = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleResetTimer = () => {
    clearInterval(countRef.current);
    setTimer(0);
  };

  return {
    timer,
    handleStartTimer,
    handlePauseTimer,
    handleResumeTimer,
    handleResetTimer,
  };
};

export default useTimer;
