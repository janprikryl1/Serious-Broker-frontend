# AGENTS.md — Serious Broker Frontend

Tento dokument slouží jako centrální kontext a příručka pro AI asistenty a vývojáře pracující na projektu **Serious Broker Frontend**.

---

## 📌 Rychlý přehled projektu

- **Název projektu**: Serious Broker Frontend (`frontend-bakalarka`)
- **Účel**: Frontend webové platformy pro kryptoměnové investice, analýzy, portfolio management, investiční plány, semafory (traffic lights), články, glossary a administrační/editorskou správu (Bakalářská práce).
- **Technologický stack**:
  - **Framework / Build tool**: React 18 (TypeScript), Vite 5
  - **Routing**: React Router DOM v6
  - **UI & Styly**: SASS (SCSS), Bootstrap 5, Emotion, MUI Joy & MUI X-Charts / X-Data-Grid, FontAwesome 6, Lucide React
  - **Grafy & Vizualizace**: Lightweight Charts (TradingView), MUI X-Charts, ApexCharts, React CountUp, Lottie React, Framer Motion / Motion Plus, AOS
  - **Formuláře & Validace**: React Hook Form, Zod, React Select, React Dropzone
  - **Lokalizace**: i18next (čeština `cs`, angličtina `en`)
  - **Notifikace & Modály**: React Hot Toast, React Toastify, SweetAlert2
  - **HTTP Klient**: Axios

---

## 📂 Struktura agentní dokumentace

Pro detailní kontext si prostuduj specializované dokumenty ve složce [`.agents/`](file:///.agents/):

1. **[`.agents/ARCHITECTURE.md`](file:///.agents/ARCHITECTURE.md)** — Architektura aplikace, strom providerů, správa stavu, routing a ochrana tras.
2. **[`.agents/BUSINESS_LOGIC_AND_FEATURES.md`](file:///.agents/BUSINESS_LOGIC_AND_FEATURES.md)** — Doménová a obchodní logika: Semafory (Traffic Lights), BTFD strategie, Binance Index, Investiční plány, Achievementy a Dotazníky rizika.
3. **[`.agents/API_INTEGRATION.md`](file:///.agents/API_INTEGRATION.md)** — Backend API integrace, konfigurace URL v `src/env.ts`, autentizace (JWT token), přehled všech API služeb.
4. **[`.agents/COMPONENTS_AND_PAGES.md`](file:///.agents/COMPONENTS_AND_PAGES.md)** — Přehled stránek (`src/pages/`) a komponent (`src/components/`) rozdělených dle domén.
5. **[`.agents/HOOKS_AND_STATE.md`](file:///.agents/HOOKS_AND_STATE.md)** — Katalog všech 25+ vlastních React hooků (`src/utils/hooks/`) a Context Providerů.
6. **[`.agents/CODING_STANDARDS.md`](file:///.agents/CODING_STANDARDS.md)** — Kódovací standardy, TypeScript konvence, stylování v SCSS, práce s i18n a formuláři.
7. **[`.agents/rules/coding_guidelines.md`](file:///.agents/rules/coding_guidelines.md)** — Konkrétní pravidla a best practices pro úpravy kódu a přidávání nových funkcionalit.

---

## ⚙️ Vývojářské příkazy a konfigurace

```bash
# Spuštění vývojového serveru (port 5173)
npm run dev

# Sestavení pro produkci (TypeScript kontrola + Vite build)
npm run build

# Kontrola linterem
npm run lint

# Náhled produkčního buildu
npm run preview
```

### Konfigurace backendu (`src/env.ts`)
```typescript
// Produkční backend
export const backendUrl = "https://api.serious.broker/";

// Lokální backend pro vývoj
// export const backendUrl = "https://localhost/bakalarska_prace_backend/";
```

---

## 🔐 Klíčové architektonické principy

1. **Autentizace & Ochrana tras**:
   - Token je uložen v `localStorage.getItem("token")`.
   - V `ProviderUser` (`src/utils/providers/providerUser.tsx`) probíhá ověření přes `user/is_authenticated.php`.
   - Chráněné prefixy tras: `PROTECTED_ROUTES = ['/admin', '/profile', '/graphs', '/editor']`. Pokud uživatel není přihlášen, je přesměrován na `/`.
2. **Role & Oprávnění**:
   - Uživatel má role: Běžný uživatel, Editor (`/editor/*`), Administrátor (`/admin/*`).
3. **Hierarchie Providerů (`App.tsx`)**:
   ```tsx
   <BrowserRouter>
     <ToastProvider>
       <ThemeProvider>
         <ProviderUser>
           <AchievementsProvider>
             <UnverifiedHeaderInfo />
             <Header />
             <Router />
             <Footer />
           </AchievementsProvider>
         </ProviderUser>
       </ThemeProvider>
     </ToastProvider>
   </BrowserRouter>
   ```
4. **Lazy Loading**:
   - Všechny stránky v `src/Router.tsx` jsou načítány dynamicky přes `React.lazy()` a obaleny v `<PageLoader />`.
5. **Importy a přípony**:
   - V projektu se v TypeScript souborech standardně uvádějí explicitní přípony souborů (`.ts`, `.tsx`). Dodržuj tento pattern při přidávání importů!
