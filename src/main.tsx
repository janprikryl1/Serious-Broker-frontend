import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/sass/style.scss';
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "./pages/ErrorFallback.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error, info) => {
              console.error(error, info);
          }}
      >
        <App />
      </ErrorBoundary>
  </StrictMode>,
)
