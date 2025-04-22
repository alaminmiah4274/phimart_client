import { useState, useEffect } from "react";

const DiscoutTimer = () => {
  const targetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 25;

  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-justify-center md:justify-start space-x-8 text-2xl font-semibold my-7">
      <div>
        <div className="text-3xl text-pink-500">{timeLeft.days}</div>
        <div>Days</div>
      </div>
      <div>
        <div className="text-3xl text-pink-500">{timeLeft.hours}</div>
        <div>Hrs</div>
      </div>
      <div>
        <div className="text-3xl text-pink-500">{timeLeft.minutes}</div>
        <div>Min</div>
      </div>
      <div>
        <div className="text-3xl text-pink-500">{timeLeft.seconds}</div>
        <div>Sec</div>
      </div>
    </div>
  );
};

export default DiscoutTimer;
