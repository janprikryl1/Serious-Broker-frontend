# Serious Broker Frontend

Monorepo-ish: čtyři samostatné Vite projekty (React + TypeScript), každý s
vlastním `package.json` a `node_modules`. V produkci se nasazují jako subpath
jedné domény, což je důležité — díky stejnému originu sdílí `localStorage`,
a tedy i přihlašovací token.

| projekt          | dev port | base / URL   | nasazení   | k čemu                       |
| ---------------- | -------- | ------------ | ---------- | ---------------------------- |
| `web`            | **5173** | `/`          | `www/`     | veřejný web + přihlášení     |
| `admin`          | **5174** | `/admin/`    | `www/admin/`    | administrace            |
| `editor`         | **5175** | `/editor/`   | `www/editor/`   | editor článků           |
| `internal-tools` | **5176** | `/internal/` | `www/internal/` | interní nástroje týmu   |

Porty jsou zafixované v `server.port` v `vite.config.ts` každého projektu.
Respektují `PORT` z prostředí, takže se dají přebít (CI, kontejner):
`PORT=6000 npm run dev`.

`web` má navíc `strictPort: true` — kdyby si při obsazeném 5173 tiše vzal jiný
port, přestala by sedět proxy (viz níže) a odkazy mezi projekty.

## Instalace

Každý projekt zvlášť:

```bash
cd web && npm install
cd ../admin && npm install
cd ../editor && npm install
cd ../internal-tools && npm install
```

## Spuštění

Spusť projekty, které potřebuješ, každý ve svém terminálu. `web` musí běžet
vždy — drží dev proxy, přes kterou jde všechno ostatní.

```bash
cd web && npm run dev              # 5173 — musí běžet
cd admin && npm run dev            # 5174
cd editor && npm run dev           # 5175
cd internal-tools && npm run dev   # 5176
```

> **Pak chodíš výhradně na `http://localhost:5173`.**
> Nikdy ne na 5174/5175/5176 přímo.

Když půjdeš na port panelu rovnou, nebude fungovat přihlášení ani přechody:
token leží v `localStorage`, který je per-origin, a origin zahrnuje port.
Panel na 5174 token webu z 5173 neuvidí, pošle tě na `/sign_in` — a ten na
jeho vlastním portu neexistuje, takže uvidíš jen vite hlášku
*„The server is configured with a public base URL of /admin/"*.

### Jak proxy routuje

Proxy ve `web/vite.config.ts` zajišťuje přístup ke všem subprojektům pod jednotným dev portem 5173:

```
localhost:5173/                  -> web
localhost:5173/admin/*           -> admin          (100 % zmigrováno na port 5174)
localhost:5173/editor/           -> editor         (zmigrován index na port 5175)
localhost:5173/editor/articles   -> web            (zbytek editoru zatím žije na webu)
localhost:5173/internal/*        -> internal-tools (samostatný projekt na portu 5176)
```

Administrace a interní nástroje jsou kompletně oddělené projekty. U editoru probíhá migrace postupně (strangler pattern).

Projekt, který neběží, vrátí na svých cestách **500** (`http proxy error`) —
stejně tak panel, který se ještě startuje. Stačí reload po naběhnutí.

## Přecházení mezi projekty

Každý projekt je samostatný build s vlastním routerem. Proto platí jediné
pravidlo:

| odkud kam | čím |
| --- | --- |
| v rámci jednoho projektu | `<Link>` (react-router) |
| mezi projekty | `<a href>` nebo `window.location` |

**`<Link>` mezi projekty nefunguje** a je to tichá chyba: `Link` nedělá HTTP
request, jen přepíše URL a hledá routu ve *svém* routeru. Nenajde ji, takže
skončíš na chybové stránce — a proxy se vůbec nezapojí, protože žádný request
neodešel. Plná navigace přes `href` naopak na server dojde a proxy ji pošle
na správný build.

Platí to i pro odkazy na nezmigrované stránky ze sidebaru nového panelu —
proto má `navRoutes` příznak `migrated`, podle kterého se vybere `Link`
nebo `<a>`.

Přihlášení je společné: login je ve `web`, token v `localStorage` na originu
5173. Panel, který token nenajde (nebo dostane 401), pošle uživatele na
`/sign_in?redirect=<cesta>`; web po přihlášení přečte `?redirect=` a vrátí ho
zpátky. Parametr se validuje ve `web/src/utils/functions/safeRedirect.ts`,
aby z loginu nešel udělat open redirect.

## Build

```bash
cd <projekt> && npm run build
```

Obsah `dist/` jde do složky podle tabulky výš. Panely mají v `public/.htaccess`
SPA fallback pro deep linky (`RewriteBase`), jinak by přímé URL dávalo 404.

Nový `admin` a `editor` se nasazují **až po dokončení migrace** — do té doby by
na `/admin/` a `/editor/` zastínily nezmigrované stránky, které jsou pořád
ve `web`. Stav migrace je v [admin/README.md](admin/README.md) a
[editor/README.md](editor/README.md).

## Lokální backend

Ve `web/src/env.ts` (a stejně v `admin/src/env.ts`, `editor/src/env.ts`) změň
`backendUrl` z `"https://api.serious.broker/"` na adresu lokálního backendu.

## Lint

`web` lintuje biome s tlumenými pravidly kvůli legacy kódu, ostatní tři biome
s presetem `recommended`. Formátuje prettier (v panelech s
`prettier-plugin-tailwindcss`), proto je biome formatter všude vypnutý.

```bash
npm run lint       # biome
npm run lint:fix
npm run format     # prettier
```
