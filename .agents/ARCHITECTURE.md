# Architektura aplikace — Serious Broker Frontend

Tento dokument detailně popisuje architekturu, organizaci kódu a datové toky v aplikaci Serious Broker.

---

## 🏗️ Adresářová struktura (`src/`)

```
src/
├── assets/                  # Statické assety (SVG ikony, Lottie animace JSON)
├── components/              # React komponenty rozdělené podle domén
│   ├── about/               # O nás, tým, kontakty
│   ├── achievment/          # Achievement vizualizace a animace
│   ├── admin/               # Administrační komponenty (tabulky, správa uživatelů, nastavení)
│   ├── article/             # Detail článku, komentáře, boční lišta, překlady
│   ├── articles/            # Výpis článků, kartičky článků, kategorie
│   ├── contact/             # Kontaktní formuláře a karty
│   ├── demo/                # Interaktivní dema strategií a portfolií
│   ├── editor/              # Editorské nástroje (tvorba a editace článků, překlady, highlights)
│   ├── formQuestions/       # Otázky a modální okna pro formuláře uživatelů
│   ├── graphs/              # Grafy, BTFD ladění parametrů, vizualizace aktiv
│   ├── guide/               # Průvodce investováním a ovládáním systému
│   ├── index/               # Komponenty pro homepage (bannery, ceníky, feature bloky)
│   ├── investmentPlan/      # Formuláře a kroky tvorby investičního plánu
│   ├── navbar/              # Header, Footer, navigační lišta, banner neověřeného účtu
│   ├── overview/            # Přehled trhu a aktiv
│   ├── profile/             # Komponenty uživatelského profilu (portfolio, dashboard, watchlist)
│   ├── register/            # Registrační formuláře a kroky
│   ├── reusable/            # Znovupoužitelné UI komponenty (tlačítka, modály, skeletony, PageLoader)
│   ├── signIn/              # Přihlašovací formuláře
│   └── trafficLight/        # Komponenty semaforu (indikátory tržních stavů)
├── pages/                   # Stránkové komponenty (připojené do Router.tsx)
│   ├── admin/               # Stránky administrace
│   ├── editor/              # Stránky editora
│   ├── graphs/              # Stránky grafů a detailů doporučení
│   ├── guide/               # Stránky průvodců
│   ├── profile/             # Stránky uživatelského profilu
│   └── welcome/             # Onboardingové / uvítací stránky
├── styles/                  # Stylování (SASS / SCSS + Bootstrap)
│   ├── css/                 # Zkompilované / externí CSS (Bootstrap, Swiper, AchievementWrapper)
│   └── sass/                # Modulární SCSS (abstracts, base, components, pages)
├── utils/                   # Pomocné moduly, API, typy a kontexty
│   ├── api/                 # Axios API služby pro komunikaci s backendem (30+ služeb)
│   ├── constants/           # Konstanty, URL adresy, konfigurace kroků a grafů
│   ├── enums/               # TypeScript enumy (stavy semaforu, periody grafů, řazení aktiv)
│   ├── formSchemas/         # Zod schémata pro validaci formulářů
│   ├── functions/           # Pomocné utility funkce (formátování čísel, dat, měn, výpočty)
│   ├── hooks/               # Custom React hooky (data fetching, logika grafů, scroll, modály)
│   ├── icons/               # SVG / React ikony
│   ├── options/             # Možnosti a konfigurace pro selektory a grafy
│   ├── providers/           # React Context Providers (Globální a doménové stavy)
│   ├── translations/        # JSON překlady pro i18next (čeština, angličtina)
│   └── types/               # TypeScript typové definice a rozhraní
├── App.tsx                  # Kořenová komponenta aplikace (poskytuje globální providery)
├── Router.tsx               # Konfigurace React Routeru (lazy loading a routy)
├── env.ts                   # Konfigurace URL backendu
├── i18n.tsx                 # Inicializace i18next
└── main.tsx                 # Vstupní bod aplikace (ReactDOM.createRoot)
```

---

## 🌐 Systém routingu (`Router.tsx`)

Routing využívá `react-router-dom` v6 s dynamickým načítáním (`React.lazy()`) a obalením každé routy v `<PageLoader>`.

### 1. Veřejné trasy
- `/` — Homepage (`Index.tsx`)
- `/about` — O projektu / O nás
- `/overview` — Přehled trhu a aktiv
- `/contact` — Kontakt
- `/articles`, `/article/:id/:language?`, `/articles/search/:text` — Magazín a články
- `/dictionary` — Slovník pojmů (Glossary)
- `/asset_list`, `/asset_graph/:name`, `/asset_graph/detail/:index_label` — Grafy aktiv
- `/cryptocurrencies_list`, `/cryptocurrency_detail/:id` — Seznam kryptoměn a detail mince
- `/graphs/recommendation`, `/graphs/recommendation/detail/:asset_label`, `/graphs/BTFD` — Doporučení a BTFD tuning
- `/demos`, `/demo` — Dema strategií
- `/welcome`, `/welcome/premium` — Uvítací stránky

### 2. Autentizační trasy
- `/sign_in` — Přihlášení
- `/register` — Registrace
- `/verify_account/:user_id/:token` — Ověření e-mailu
- `/forgotten_password` — Žádost o obnovu hesla
- `/reset_password/:user_id/:secret_key_1/:secret_key_2` — Nastavení nového hesla

### 3. Uživatelský profil (`/profile/*`)
Chráněná sekce s vnořeným layoutem:
- `/profile` — Přehled profilu
- `/profile/edit` — Úprava údajů
- `/profile/sessions` — Aktivní přihlášení a relace
- `/profile/achievements` — Získané achievementy
- `/profile/membership` — Informace o členství / tarifu
- `/profile/dashboard` — Osobní dashboard
- `/profile/my_portfolio`, `/profile/edit_my_portfolio/:id`, `/profile/my_portfolio_details/:id` — Správa portfolií
- `/profile/my_watch_list` — Sledované kryptoměny
- `/profile/my_investment_plans` — Seznam investičních plánů
- `/profile/my_traffic_lights` — Osobní semafory
- **Tvorba investičního plánu** (obalená v `InvestmentPlanProvider`):
  - `/profile/new_investment_plan_intro`
  - `/profile/new_investment_plan_name`
  - `/profile/new_investment_plan`
  - `/profile/new_investment_plan/new_portfolio`
  - `/profile/new_investment_plan/existing_portfolio`
  - `/profile/new_investment_plan/recurring_investment`
  - `/profile/new_investment_plan/invested_amount`
  - `/profile/new_investment_plan/traffic_lights`

### 4. Editorská sekce (`/editor/*`)
Chráněná sekce obalená v layoutu `EditorOverview.tsx`:
- Správa článků, tvorba, editace, komentáře, sdílení na sociální sítě
- Překlady článků do cizích jazyků (`ArticleTranslate`, `TranslateEdit`)
- Správa rychlých zpráv / novinek (`HighlightsList`, `HighlightsEditor`)

### 5. Administrační sekce (`/admin/*`)
Chráněná sekce obalená v layoutu `Admin.tsx` se sidebarem:
- Správa uživatelů (`AdminUserManagement`)
- Správa newsletteru (`AdminNewsletterOverview`)
- Správa slovníku (`AdminGlossaryManagement`)
- Systémové logy a audit (`AdminTableLog`)
- Správa zpětné vazby (`AdminFeedbackManagement`)
- Správa achievementů (`AdminAchievements`)
- Nastavení coinů a cache (`AdminCoinSettings`, `AdminChachedData`)
- Generování a správa QR kódů (`AdminQRManagement`)
- Správa demo scénářů (`AdminDemos`, `AdminDemoEdit`)
- Správa Binance Indexu (`AdminBinanceIndexAbout`)
- Dynamické tabulky a formuláře (`AdminGenericTableData`, `AdminFormsOverview`, `AdminFormResponses`, `FormEvaulationSettings`)

---

## 🔄 Správa stavu a Context Providers

Aplikace nepoužívá Redux ani Zustand; stav je řízen hierarchií React Context providerů:

| Provider | Umístění | Odpovědnost |
| :--- | :--- | :--- |
| `ToastProvider` | `App.tsx` (Root) | Globální zobrazení toast notifikací |
| `ThemeProvider` | `App.tsx` (Root) | Správa světlého / tmavého režimu |
| `ProviderUser` | `App.tsx` (Root) | Přihlášený uživatel, token, oprávnění, ochrana tras |
| `AchievementsProvider` | `App.tsx` (Root) | Notifikace o splněných achievementech, animace |
| `InvestmentPlanProvider`| `Router.tsx` (`/profile/new_investment_plan/*`) | Vícekrokový formulář tvorby investičního plánu |
| `ArticleCreateProvider` | `EditArticle.tsx` | Tvorba nového článku (bloky obsahu, obrázky, jazyky) |
| `ArticleTranslateProvider`| `ArticleTranslate.tsx` | Správa překladového workflow pro články |
| `DemoProvider` | `Demo.tsx` | Stav simulace a interaktivního dema |
| `GenericTablesProvider`| Admin sekce | Dynamické schéma a data generických tabulek |
| `HighlightProvider` | Editor sekce | Správa krátkých zpráv a bleskovek |
| `TrafficLightProvider` | Profil / Semafory | Nastavení prahových hodnot semaforů pro aktiva |
| `UserDetailsProvider` | Profil | Detailní nastavení profilu uživatele |
| `MyPortfolioProvider` | Profil / Portfolio | Výpočty, složení a transakce portfolia |
