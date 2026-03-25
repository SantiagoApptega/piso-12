import { useState, useEffect } from 'react';
import type { CountdownTime } from '../../domain/entities/index.js';
import { EVENT } from '../../domain/constants/index.js';

function calculateTimeLeft(targetISO: string): CountdownTime {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function useCountdown(): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateTimeLeft(EVENT.dateISO)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(EVENT.dateISO));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
