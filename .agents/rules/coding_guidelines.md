---
description: Pravidla a instrukce pro vývoj a úpravu kódu v projektu Serious Broker Frontend
globs: ["src/**/*", "*.ts", "*.tsx", "*.json", "*.scss"]
always_on: true
---

# Pravidla pro úpravy kódu — Serious Broker Frontend

Při provádění změn v tomto repozitáři se řiď následujícími pravidly:

1. **Zachování integrity a funkčnosti**:
   - Vždy respektuj existující architekturu, providery a konvence pojmenování.
   - Před zásahem do routingu (`src/Router.tsx`) zkontroluj ochranu tras (`PROTECTED_ROUTES` v `src/utils/constants/index.ts`).

2. **TypeScript a importy**:
   - Všechny importy z lokálních TypeScript souborů musí obsahovat explicitní příponu (`.ts` nebo `.tsx`).
   - Definuj přesná rozhraní a typy v `src/utils/types/`. Nepoužívej `any`.

3. **Komunikace s API**:
   - Nikdy nezapisuj URL backendu natvrdo do komponent. Vždy importuj `backendUrl` z `src/env.ts`.
   - Všechna API volání organizuj v `src/utils/api/` jako samostatné exportované funkce.
   - Nezapomínej předat JWT token v hlavičce `Authorization: Bearer ${token}` pro chráněné endpointy.

4. **Lokalizace a texty v UI**:
   - Žádný statický uživatelský text nesmí být zapsán natvrdo v JSX bez podpory i18n.
   - Použij `useTranslation()` a doplň klíče do `czech/translation.json` i `english/translation.json`.

5. **Styly a design**:
   - Dodržuj design systém postavený na SCSS a Bootstrap 5.
   - Globální proměnné barev a breakpointů hledej v `src/styles/sass/abstracts/_variables.scss`.

6. **Bezpečnost a ověřování**:
   - Nikdy neukládej citlivé klíče nebo hesla do klientského kódu.
   - Využívej existující modální okna a validátory pro operace mazání a úpravy dat (`SweetAlert2`, `ConfirmModal`).
