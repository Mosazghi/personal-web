"use client";

import { useEffect, useRef, useState } from "react";
import WAVES from "vanta";

export default function VantaWavesBackground({ children }) {
    const containerRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect && containerRef.current) {
            setVantaEffect(
                WAVES({
                    el: containerRef.current,
                    // configuration options — adapt to your needs:
                    backgroundAlpha: 1,
                    color: 0x526351,
                    waveHeight: 8.5,
                    waveSpeed: 1,
                    shininess: 30,
                    zoom: 1,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                })
            );
        }

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, [vantaEffect]);

    return (
        <div ref={containerRef} style={{ position: "absolute", width: "100%", height: "100%", zIndex: -1 }}>
            {children}
        </div>
    );
}
