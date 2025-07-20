import { useCallback, useEffect, useState } from "react";

export function useTimer(isRunning: boolean) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTime = useCallback(() => setTime(0), []);

  return { time, resetTime };
}
