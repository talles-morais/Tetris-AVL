import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';
import { useMemo } from 'react';
import { useCallback } from 'react';

export default function GraphicsExample() {
    const draw = useCallback((g) => {
      g.clear();
      g.lineStyle(0);
      g.beginFill(0xffff0b, 0.5);
      g.drawCircle(470, 90, 45);
      g.endFill();
    }, []);
  
    return (
      <Stage width={960} height={window.innerHeight} options={{ backgroundColor: 0xffffff }}>
        <Graphics draw={draw} />
      </Stage>
    );
  }