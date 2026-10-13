import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

/**
 * Samotný Vanta efekt. Tahá three.js (~2,8 MB), takže se importuje výhradně
 * lazy z VantaBackground.tsx — nikdy ho neimportuj staticky, skončil by
 * v entry chunku a stahoval se i na stránkách, kde se vůbec nerenderuje.
 */
export default function VantaFog() {
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!myRef.current) return;

    const effect = FOG({
      el: myRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0x695838, //C5A657
      midtoneColor: 0x2C2523,
      lowlightColor: 0x2C2523,
      baseColor: 0x2C2523,
      blurFactor: 0.9,
      speed: 2,
      zoom: 0.50
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={myRef}
      className="tw-fixed tw-inset-0 tw-w-full tw-h-full tw-z-[-1] tw-pointer-events-none"
    />
  );
}
