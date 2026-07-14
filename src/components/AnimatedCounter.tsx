import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export function AnimatedCounter({
  value,
  duration = 1.2,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });

    prev.current = value;

    return () => controls.stop();
  }, [value, duration]);

  return <>{Math.round(display).toLocaleString()}</>;
}