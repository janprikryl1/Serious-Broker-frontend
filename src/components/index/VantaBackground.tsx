import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';
import {useLocation} from "react-router-dom";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/register",
  "/sign_in",
];

export default function VantaBackground() {
  const location = useLocation();
  const myRef = useRef(null);
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  useEffect(() => {
    if (!isPublicRoute || !myRef.current) return;

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
  }, [isPublicRoute]);

  if (!isPublicRoute) {
    return null;
  }

  return (
    <div
      ref={myRef}
      className="tw-fixed tw-inset-0 tw-w-full tw-h-full tw-z-[-1] tw-pointer-events-none"
    />
  );
}