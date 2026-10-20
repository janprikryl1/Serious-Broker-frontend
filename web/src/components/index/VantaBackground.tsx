import { lazy, Suspense } from 'react';
import { useLocation } from "react-router-dom";

// Lazy — tím se three.js + vanta (~2,8 MB) dostanou z entry chunku do vlastního,
// který se stahuje jen na veřejných stránkách, kde se pozadí reálně renderuje.
const VantaFog = lazy(() => import('./VantaFog.tsx'));

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/register",
  "/sign_in",
  "/gdpr_info",
  "/cookies_info",
  "/cooperation_info"
];

export default function VantaBackground() {
  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  if (!isPublicRoute) {
    return null;
  }

  // fallback je null — jde o dekorativní pozadí, preloader by tu byl na obtíž.
  return (
    <Suspense fallback={null}>
      <VantaFog />
    </Suspense>
  );
}
