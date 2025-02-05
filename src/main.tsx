import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/css/swiper-bundle.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './index.css';
import './styles/sass/style.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
