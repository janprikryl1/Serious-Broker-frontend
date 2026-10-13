import axios from "axios";
import { backendUrl } from "../../env.ts";

/**
 * Centrální axios instance pro veškerou komunikaci s vlastním backendem.
 *
 * Nahrazuje opakovaný boilerplate, který byl dřív v každé service zvlášť:
 *   - skládání URL z `backendUrl`
 *   - `localStorage.getItem("token")` + ruční `Authorization` hlavička
 *   - `Content-Type: application/json`
 *
 * Cesty se předávají relativně, bez `backendUrl`:
 *   api.get<DashboardType>("dashboard/dashboard.php")
 *
 * Úvodní lomítko je jedno — axios `baseURL` a cestu spojuje přes combineURLs,
 * takže `"dashboard/x.php"` i `"/dashboard/x.php"` dají stejný výsledek.
 *
 * Pozor: instance je určená výhradně pro vlastní backend. Kdyby se někdy volalo
 * cizí API, použij na to čistý `axios`, ať tam neposíláš náš token.
 */
/*
 * Content-Type se ZÁMĚRNĚ nenastavuje jako default. Axios ho dopočítá sám podle
 * typu těla requestu:
 *   - objekt   -> application/json
 *   - FormData -> multipart/form-data VČETNĚ boundary
 *
 * Kdyby tu byl default "application/json", přebil by multipart u uploadů
 * (adminCryptocurrencyService, imageService) a server by dostal JSON hlavičku
 * k multipart tělu. Navíc je to takhle korektnější než původní kód, který
 * multipart hlavičku psal ručně bez boundary.
 */
export const api = axios.create({
  baseURL: backendUrl,
});

// Token se připojuje až v momentě odeslání requestu, ne při vytvoření instance —
// jinak by se po přihlášení používal zastaralý (resp. žádný) token až do reloadu.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/*
 * ZÁMĚRNĚ zde není response interceptor na 401.
 *
 * Aplikace dnes vypršelý token nikde centrálně neřeší — `ProviderUser` jen
 * odchytí chybu z `is_authenticated.php`, nechá `user` undefined a chráněné
 * routy přesměruje na homepage. Doplnit sem automatický logout by znamenalo
 * změnu chování autentizace, což je samostatné rozhodnutí. Až na to dojde,
 * patří to přesně sem:
 *
 * api.interceptors.response.use(
 *   (response) => response,
 *   (error) => {
 *     if (error.response?.status === 401) {
 *       localStorage.removeItem("token");
 *       // + propsat do ProviderUser, aby se vyčistil i stav uživatele
 *     }
 *     return Promise.reject(error);
 *   }
 * );
 */
