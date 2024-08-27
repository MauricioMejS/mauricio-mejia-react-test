import React, { ReactNode, useEffect, useRef, useState } from "react";
import { NeatConfig, NeatGradient } from "@firecms/neat";
import styles from "./Background.module.scss";

const Background: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gradientRef = useRef<NeatGradient | null>(null);

    useEffect(() => {

        if (!canvasRef.current)
            return;

        gradientRef.current = new NeatGradient({
            ref: canvasRef.current,
            "colors": [
        {
            "color": "#044A59",
            "enabled": true
        },
        {
            "color": "#037353",
            "enabled": true
        },
        {
            "color": "#038C5A",
            "enabled": true
        },
        {
            "color": "#038C4C",
            "enabled": true
        },
        {
            "color": "#048C34",
            "enabled": false
        }
    ],
    "speed": 6,
    "horizontalPressure": 3,
    "verticalPressure": 3,
    "waveFrequencyX": 2,
    "waveFrequencyY": 4,
    "waveAmplitude": 2,
    "shadows": 0,
    "highlights": 2,
    "colorBrightness": 1,
    "colorSaturation": 3,
    "wireframe": false,
    "colorBlending": 5,
    "backgroundColor": "#003FFF",
    "backgroundAlpha": 1,
    "resolution": 1

        });

        return gradientRef.current.destroy;

    }, [canvasRef.current]);

    return (
      <canvas
        className={styles.backgroundContainer}
        style={{
          isolation: "isolate",
          height: "100%",
          width: "100%",
        }}
        ref={canvasRef}
      />
    );
};


export default Background;