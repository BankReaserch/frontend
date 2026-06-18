"use client";

import { useEffect, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
    value: number;
    suffix?: string;
}

export default function Counter({
    value,
    suffix = "",
}: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px",
    });

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const controls = animate(0, value, {
            duration: 5,
            ease: [0.22, 1, 0.36, 1],
            onUpdate(latest) {
                setDisplayValue(Math.floor(latest));
            },
        });

        return () => controls.stop();
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {displayValue.toLocaleString()}
            {suffix}
        </span>
    );
}