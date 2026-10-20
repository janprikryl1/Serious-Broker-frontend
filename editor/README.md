# Serious Broker — editor

Samostatný frontend editoru článků. Dřív žil v projektu `web`
(`src/pages/editor`, `src/components/editor`), teď je to vlastní Vite build
nasazený jako subpath `/editor/`.

Stack: React 19, Vite 7, Tailwind 4, shadcn/ui, TanStack Query, react-router 7.
**Žádný bootstrap, žádné MUI, žádný sweetalert2.**

## Spuštění

```bash
npm install
npm run dev        # localhost:5175
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
protože editor jede jako subpath stejné domény jako `web`, čte přesně ten
token, který tam zapsal login na webu — klíč `token`, viz
`src/utils/auth/token.ts`.

Tok:

1. `RequireRole` (v `src/App.tsx`) ověří roli přes `user/is_authenticated.php`.
   Pouští `editor`, `admin` i `manager` — kopíruje to původní chování ve webu.
2. Chybí token nebo přijde 401 → plná navigace na `/sign_in?redirect=<cesta>`
   veřejného webu. Musí to být `window.location`, ne react-router `navigate` —
   web je jiný build.
3. Web po přihlášení přečte `?redirect=` (validuje ho
   `web/src/utils/functions/safeRedirect.ts` proti open redirectu) a vrátí
   uživatele sem.
4. Přihlášený uživatel s nedostatečnou rolí dostane `Forbidden`, ne redirect —
   redirect na login by u přihlášeného uživatele jen cykloval.

### Dev: chodí se přes web, ne na tenhle port

`localhost:5173` a `localhost:5175` **nejsou** stejný origin (origin zahrnuje
i port), takže by se token nesdílel. Proto se tenhle projekt nespouští
samostatně k prohlížení — jde se na něj přes dev proxy ve `web/vite.config.ts`:

```bash
cd ../web && npm run dev     # 5173 — musí běžet
cd ../editor && npm run dev  # 5175
```

Pak **chodíš na `localhost:5173/editor/`**, nikdy na 5175 přímo. Když půjdeš
rovnou na 5175, guard tě pošle na `/sign_in`, který tady neexistuje, a uvidíš
jen vite hlášku *„The server is configured with a public base URL of
/editor/"*.

Proxy routuje per cestu: na tenhle build jdou jen zmigrované stránky, zbytek
`/editor/*` projde na `web`. Seznam je v `PANELS` ve `web/vite.config.ts` a
musí odpovídat příznakům `migrated` v `src/utils/constants/routes.ts`.

Bez proxy se dá token vložit ručně v devtools:
`localStorage.setItem("token", "<token z webu>")`.

### Pozor

Oddělení buildu **není** bezpečnostní opatření. `/editor/` je veřejně dostupný
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

Obsah `dist/` jde do `www/editor/`. `public/.htaccess` se nakopíruje s ním a
řeší SPA fallback pro deep linky (`RewriteBase /editor/`).

## Stav migrace

Hotový je skeleton: build, auth vrstva, layout s headerem, rozcestník.

Zbývá přenést stránky z `web/src/pages/editor`. Cesty v
`src/utils/constants/routes.ts` jsou ZÁMĚRNĚ shodné s původními, takže se URL
nemění a staré odkazy fungují dál.

| stránka ve `web`          | cesta                              | stav |
| ------------------------- | ---------------------------------- | ---- |
| `EditorIndex.tsx`         | `/`                                | ✅ (jako rozcestník) |
| `ArticleManagement.tsx`   | `articles`                         | ⬜   |
| `EditArticle.tsx`         | `articles/new`, `articles/edit/:id`| ⬜   |
| `ArticleComments.tsx`     | `article/comments/:id`             | ⬜   |
| `ArticleShare.tsx`        | `article/share/:id`                | ⬜   |
| `ArticleTranslate.tsx`    | `article/translate/:id`            | ⬜   |
| `TranslateEdit.tsx`       | `article/translations`, `…/:id`     | ⬜   |
| `PostEdit.tsx`            | `article/post/edit/:articleId/:id?`| ⬜   |
| `HighlightsList.tsx`      | `highlights`                       | ⬜   |
| `HighlightsEditor.tsx`    | `highlits/editor`, `…/:id`         | ⬜   |

Největší kus je `components/editor/articleManagement/` — šablony článků,
překlady a image upload. Patří k nim providery z `web/src/utils/providers/`,
které jsou výhradně editorové, takže se přenesou celé:
`ArticleCreateProvider`, `ArticleTranslateProvider`, `PostEditProvider`,
`HighlightProvider`.

### Čím nahradit staré závislosti

| ve `web`                          | tady                               |
| --------------------------------- | ---------------------------------- |
| `react-bootstrap`                 | tailwind + shadcn                  |
| `components/reusable/Button.tsx`  | `components/ui/button.tsx`         |
| `customSwal.ts` (sweetalert2)     | `sonner` + shadcn `AlertDialog`    |
| `ArticlesSkeleton`                | vlastní skeleton                   |
| `useState` + `useEffect` + fetch  | `useQuery`                         |

`react-hook-form` + `zod`, `react-dropzone`, `uuid` a `react-i18next`
zůstávají — jsou UI-agnostic a fungují dál. U providerů zvaž, jestli je po
přechodu na `useQuery` / `useMutation` ještě potřebuješ, nebo jestli stačí
server state v cache.

### Postup u jedné stránky

1. Přenes service z `web/src/utils/api/` do `src/utils/api/`. Vypusť
   `if (!token) return` — `RequireRole` nepustí nepřihlášeného dál a 401 řeší
   interceptor, takže service může vracet `T` místo `T | undefined`.
2. Přenes typy do `src/utils/types/`.
3. Přepiš komponentu na tailwind + shadcn, data přes `useQuery` /
   `useMutation`.
4. Zaregistruj routu v `src/Router.tsx` a odškrtni v tabulce výš.
5. Až bude sekce hotová, smaž ji z `web` a přepni tam odkazy z `<Link>` na
   `<a href="/editor/…">` (jiný build).

## Vztah k ostatním projektům

Sdílený kód (`axiosInstance`, `useAuth`, `RequireRole`, `token`, `redirect`,
typy uživatele) je ZÁMĚRNĚ duplikovaný s `admin/` — projekty jsou samostatné,
bez monorepa. Když měníš auth vrstvu, změň ji v obou.
