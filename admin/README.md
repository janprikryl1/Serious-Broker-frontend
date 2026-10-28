# Serious Broker — administrace

Samostatný frontend administrace. Dřív žila v projektu `web`
(`src/pages/admin`, `src/components/admin`), teď je to vlastní Vite build
nasazený jako subpath `/admin/`.

Stack: React 19, Vite 7, Tailwind 4, shadcn/ui, TanStack Query, react-router 7.
**Žádný bootstrap, žádné MUI, žádný sweetalert2.**

## Spuštění

```bash
npm install
npm run dev        # localhost:5174
```

Pro práci na přihlášených stránkách je potřeba běžící `web` s proxy, viz
[Jak funguje přihlášení](#jak-funguje-přihlášení).

```bash
npm run build      # tsc -b && vite build
npm run typecheck
npm run lint
```

## Jak funguje přihlášení

Token se **nikam nepředává**. `localStorage` je per-origin (ne per-path), a
protože admin jede jako subpath stejné domény jako `web`, čte přesně ten
token, který tam zapsal login na webu — klíč `token`, viz
`src/utils/auth/token.ts`.

Tok:

1. `RequireRole` (v `src/App.tsx`) ověří roli přes `user/is_authenticated.php`.
2. Chybí token nebo přijde 401 → plná navigace na `/sign_in?redirect=<cesta>`
   veřejného webu. Musí to být `window.location`, ne react-router `navigate` —
   web je jiný build.
3. Web po přihlášení přečte `?redirect=` (validuje ho
   `web/src/utils/functions/safeRedirect.ts` proti open redirectu) a vrátí
   uživatele sem.
4. Přihlášený uživatel s nedostatečnou rolí dostane `Forbidden`, ne redirect —
   redirect na login by u přihlášeného uživatele jen cykloval.

### Dev: chodí se přes web, ne na tenhle port

`localhost:5173` a `localhost:5174` **nejsou** stejný origin (origin zahrnuje
i port), takže by se token nesdílel. Proto se tenhle projekt nespouští
samostatně k prohlížení — jde se na něj přes dev proxy ve `web/vite.config.ts`:

```bash
cd ../web && npm run dev     # 5173 — musí běžet
cd ../admin && npm run dev  # 5174
```

Pak **chodíš na `localhost:5173/admin/`**, nikdy na 5174 přímo. Když půjdeš
rovnou na 5174, guard tě pošle na `/sign_in`, který tady neexistuje, a uvidíš
jen vite hlášku *„The server is configured with a public base URL of
/admin/"*.

Proxy routuje per cestu: na tenhle build jdou jen zmigrované stránky, zbytek
`/admin/*` projde na `web`. Seznam je v `PANELS` ve `web/vite.config.ts` a
musí odpovídat příznakům `migrated` v `src/utils/constants/routes.ts`.

Bez proxy se dá token vložit ručně v devtools:
`localStorage.setItem("token", "<token z webu>")`.

### Pozor

Oddělení buildu **není** bezpečnostní opatření. `/admin/` je veřejně dostupný
asset a kontrola role na frontendu je kosmetika — autorizaci musí vynucovat
backend na každém endpointu.

## Lint a formátování

Lintuje **biome** (`biome.jsonc`), formátuje **prettier**. Biome formatter je
záměrně vypnutý — neumí řadit tailwind classy, což dělá
`prettier-plugin-tailwindcss`. Kdyby byl zapnutý, oba nástroje by si soubory
přepisovaly navzájem.

```bash
npm run lint       # biome
npm run lint:fix   # biome --write
npm run format     # prettier
```

Konfigurace je striktnější než ve `web`: tady jede preset `recommended` celý,
kdežto web má `preset: "none"` a vypnuté hlídání nepoužitých importů kvůli
legacy kódu, do kterého se nemá zasahovat. `src/components/ui/**` se nelintuje
— je to vendorovaný shadcn kód.

Přechodem z eslintu projekt přišel o pravidla React Compileru
(`react-hooks/set-state-in-effect`, `react-hooks/incompatible-library`), pro
která biome ekvivalent nemá. Na setState v efektu a podobné antipatterny si
tedy musíš dát pozor sám.

## Nasazení

Obsah `dist/` jde do `www/admin/`. `public/.htaccess` se nakopíruje s ním a
řeší SPA fallback pro deep linky (`RewriteBase /admin/`).

## Stav migrace: 100 % DOKONČENO

Všechny stránky administrace byly kompletně přeneseny z projektu `web` do tohoto projektu `admin`.
Původní kód v `web/src/pages/admin` i administrační komponenty v `web/src/components/admin` byly odstraněny.
Veškeré administrační routy byly v `web/src/Router.tsx` zrušeny a `web/vite.config.ts` proxuje veškeré požadavky pod prefixem `/admin` přímo sem na port 5174.

Routy jsou lazy (`src/Router.tsx`) — každá stránka má vlastní chunk.
Cesty v `src/utils/constants/routes.ts` jsou ZÁMĚRNĚ shodné s původními, takže se URL nemění a záložky/odkazy fungují dál.

| stránka ve `web`                | cesta                         | stav | poznámka |
| ------------------------------- | ----------------------------- | ---- | -------- |
| `AdminOverview.tsx`             | `/`                           | ✅   | Shadcn karty, metriky, přehled |
| `AdminUserManagement.tsx`       | `users`                       | ✅   | TanStack Table, shadcn Dialog, filtry |
| `AdminNewsletterOverview.tsx`   | `newsletter`                  | ✅   | Seznam odběratelů, mazání, export |
| `AdminGlossaryManagement.tsx`   | `glossary`                    | ✅   | Slovník pojmů, inline editace, přidávání |
| `AdminTableLog.tsx`             | `log_table`                   | ✅   | Logy tabulek, stahování log souborů |
| `AdminFeedbackManagement.tsx`   | `feedbacks`                   | ✅   | Zpětná vazba uživatelů, správa stavů |
| `AdminAchievements.tsx`         | `achievements`                | ✅   | Správa achievementů, uživatelé a přidělování |
| `AdminCoinSettings.tsx`         | `coin_settings`               | ✅   | Správa kryptoměn, loga, parametry |
| `AdminChachedData.tsx`          | `chached_data`                | ✅   | Správa mezipaměti / cache |
| `AdminQRManagement.tsx`         | `qr`                          | ✅   | QR kódy pro platby, nahrávání |
| `AdminDemos.tsx` + `DemoEdit`   | `demos`, `demos/edit/:id`     | ✅   | Správa interaktivních dem a widgetů |
| `AdminBinanceIndexAbout.tsx`    | `binance_index_about`         | ✅   | Nastavení Binance index infa |
| `AdminGenericTableData.tsx` ×3  | `generic_table_data`, …       | ✅   | Dynamické tabulky, SQL builder, výsledky |
| `AdminFormsOverview.tsx` ×3     | `forms`, `form_responses`, …  | ✅   | Formuláře s `@dnd-kit` drag-and-drop, odpovědi, hodnocení |

### Stránky vzniklé až tady (nemají předchůdce ve `web`)

Sekce **Server** v postranním panelu. Vznikla pro případ, kdy je k hostingu
jen FTP přístup — všechno, co by se jinak zjišťovalo přes `phpinfo()` nebo
stažením `error.log`, je vidět přímo v administraci.

| stránka                 | cesta         | backend | poznámka |
| ----------------------- | ------------- | ------- | -------- |
| `ServerInfo.tsx`        | `server_info` | `server/get_info.php` | Verze PHP a konfigurace, rozšíření, databáze, disk, oprávnění složek |
| `ServerErrorLog.tsx`    | `server_log`  | `server/get_error_log.php`, `server/clear_error_log.php` | Výpis `error.log` po záznamech, filtr podle severity, fulltext, export, vyprázdnění |

Oba endpointy vyžadují roli `admin` nebo `manager` a hodnoty z `.env`
nevracejí — v logu navíc maskují hesla a tokeny, které se do stack trace
dostanou jako argumenty funkcí.

### Vzhled: Light / Dark Mode

V administraci je zabudovaný přepínač motivu (ThemeToggle):
- Tlačítko v patičce postranního panelu (Sidebar) s ikonami Sun / Moon.
- Podporuje režimy `light`, `dark` a `system`.
- Stav se ukládá do `localStorage` pod klíčem `admin-theme`.
- Toasty (`sonner`) automaticky respektují zvolené téma.

### Čím nahradit staré závislosti

| ve `web`                          | tady                               |
| --------------------------------- | ---------------------------------- |
| `react-bootstrap`                 | tailwind + shadcn                  |
| `components/reusable/Button.tsx`  | `components/ui/button.tsx`         |
| `customSwal.ts` (sweetalert2)     | `sonner` + shadcn `AlertDialog`    |
| `@mui/x-data-grid`                | shadcn `Table` + `@tanstack/react-table` |
| `react-pro-sidebar`               | `components/layout/Sidebar.tsx`    |
| `ArticlesSkeleton`                | vlastní skeleton (viz `StatCard`)  |
| `useState` + `useEffect` + fetch  | `useQuery`                         |

`react-hook-form` + `zod`, `react-dropzone`, `@dnd-kit` a `react-i18next`
zůstávají — jsou UI-agnostic a fungují dál.

### Pozor na `shadcn add`

CLI (ověřeno na 4.21.4) generuje komponenty s `import { cn } from "cn"`
místo `"@/lib/utils.ts"` a kvůli tomu si do závislostí přidá balík `cn`,
který s naším `lib/utils.ts` nemá nic společného. Po každém `shadcn add`:

```bash
grep -rln 'from "cn"' src/components/ui/   # a importy přepsat na @/lib/utils.ts
npm uninstall cn                            # kdyby se zase nainstaloval
```

Na dotaz „The file button.tsx already exists. Would you like to overwrite?“
odpovídej **ne** — přepsalo by to komponenty sdílené s `internal-tools`.

### Postup u jedné stránky

1. Přenes service z `web/src/utils/api/` do `src/utils/api/`. Vypusť
   `if (!token) return` — `RequireRole` nepustí nepřihlášeného dál a 401 řeší
   interceptor, takže service může vracet `T` místo `T | undefined`.
2. Přenes typy do `src/utils/types/`.
3. Přepiš komponentu na tailwind + shadcn, data přes `useQuery` /
   `useMutation`.
4. Zaregistruj routu v `src/Router.tsx` a odškrtni v tabulce výš.
5. Až bude sekce hotová, smaž ji z `web` a přepni tam odkazy z `<Link>` na
   `<a href="/admin/…">` (jiný build).

## Vztah k ostatním projektům

Sdílený kód (`axiosInstance`, `useAuth`, `RequireRole`, `token`, `redirect`,
typy uživatele) je ZÁMĚRNĚ duplikovaný s `editor/` — projekty jsou samostatné,
bez monorepa. Když měníš auth vrstvu, změň ji v obou.
