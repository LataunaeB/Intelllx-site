"use client";
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  endDate: Date;
  onExpire?: () => void;
}

export default function CountdownTimer({ endDate, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onExpire?.();
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  return (
    <div className="flex items-center justify-center gap-4 text-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 min-w-[80px]">
        <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-sm text-white/70">Days</div>
      </div>
      <div className="text-white/50 text-2xl">:</div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 min-w-[80px]">
        <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
        <div className="text-sm text-white/70">Hours</div>
      </div>
      <div className="text-white/50 text-2xl">:</div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 min-w-[80px]">
        <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-sm text-white/70">Minutes</div>
      </div>
      <div className="text-white/50 text-2xl">:</div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 min-w-[80px]">
        <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-sm text-white/70">Seconds</div>
      </div>
    </div>
  );
}
