import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
// Pouze CSS. Bootstrapí JS bundle není potřeba — veškerá interaktivita jde přes
// react-bootstrap, které si vlastní logiku nese samo. V kódu nezůstalo žádné
// deklarativní data-bs-toggle ani globální bootstrap.* API.
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/sass/style.scss';
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "./pages/ErrorFallback.tsx";
import {BrowserRouter} from "react-router-dom";
import AutoScrollToTop from "./components/reusable/AutoScrollToTop.tsx";
import { PostHogProvider } from '@posthog/react'

const options = {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    defaults: '2026-05-30',
} as const

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostHogProvider apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || ''} options={options}>
            <BrowserRouter>
                <AutoScrollToTop />
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onError={(error, info) => {
                        console.error(error, info);
                    }}
                >
                    <App/>
                </ErrorBoundary>
            </BrowserRouter>
        </PostHogProvider>
    </StrictMode>,
)
