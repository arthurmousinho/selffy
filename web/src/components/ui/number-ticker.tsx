"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format-currency";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  currency = false,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay em segundos
  decimalPlaces?: number;
  currency?: boolean; // se true, formata como moeda
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 10,
    stiffness: 50,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 100);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = currency
          ? formatCurrency(Number(latest.toFixed(decimalPlaces)))
          : Number(latest.toFixed(decimalPlaces)).toString();
      }
    });
  }, [springValue, decimalPlaces, currency]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black dark:text-white",
        className,
      )}
      ref={ref}
    />
  );
}
