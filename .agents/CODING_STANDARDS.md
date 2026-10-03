# Kódovací standardy a konvence — Serious Broker Frontend

Tento dokument stanovuje pravidla pro psaní a údržbu kódu v projektu Serious Broker Frontend.

---

## 💎 TypeScript standardy

1. **Explicitní typování**:
   - Všechny React komponenty typuj jako funkcionální komponenty:
     ```tsx
     import { FC } from 'react';

     interface Props {
       title: string;
       isActive?: boolean;
       onSelect: (id: number) => void;
     }

     export const MyComponent: FC<Props> = ({ title, isActive = false, onSelect }) => {
       return <div>{title}</div>;
     };
     ```
   - Nepoužívej typ `any`. Pokud typ není v daný moment přesně znám, použij `unknown` nebo vytvoř odpovídající rozhraní v `src/utils/types/`.

2. **Umístění typových definic**:
   - Společné a datové typy patří do `src/utils/types/<domena>/`.
   - Enumy patří do `src/utils/enums/`.
   - Lokální Props specifické pro jednu komponentu mohou být v souboru komponenty.

3. **Přípony v importech**:
   - V tomto projektu je zavedena konvence uvádět explicitní přípony souborů při importech (`.ts`, `.tsx`).
     ```typescript
     // Správně v tomto projektu:
     import { backendUrl } from "../../env.ts";
     import { UserType } from "../types/user/userTypes.ts";
     import { PageLoader } from "./components/reusable/PageLoader.tsx";
     ```

---

## 🎨 Stylování a CSS / SCSS

1. **SASS / SCSS architektura** (`src/styles/sass/`):
   - `abstracts/`: Proměnné (`_variables.scss`), mixiny (`_mixins.scss`), funkce.
   - `base/`: Typografie, animace, globální pravidla.
   - `components/`: Styly pro konkrétní komponenty (`_button.scss`, `_modal.scss`, `_traffic-light.scss`).
   - `pages/`: Styly specifické pro celé stránky.
2. **Bootstrap 5 & utility**:
   - Využívej Bootstrap 5 grid systém (`container`, `row`, `col-*`) a utility třídy (`d-flex`, `align-items-center`, `gap-3`, `mb-4` apod.).
3. **MUI Joy / X-Charts / Emotion**:
   - Komponenty z `@mui/joy` nebo `@mui/x-charts` integruj v souladu s tématem v `ThemeProvider.tsx`.

---

## 🌍 Lokalizace (i18n)

Aplikace je plně vícejazyčná (čeština `cs` jako výchozí, angličtina `en`).

1. **Použití v komponentách**:
   ```tsx
   import { useTranslation } from "react-i18next";

   export const Header = () => {
     const { t } = useTranslation();
     return <h1>{t('header.welcome_title')}</h1>;
   };
   ```
2. **Přidávání překladů**:
   - Nové textové řetězce vždy vkládej do obou překladových souborů:
     - `src/utils/translations/czech/translation.json`
     - `src/utils/translations/english/translation.json`
   - Klíče strukturuj hierarchicky (např. `"profile": { "settings": "Nastavení" }`).

---

## 📋 Formuláře a validace

1. **React Hook Form & Zod**:
   - Složitější formuláře stavěj na `react-hook-form` s integrací `zod` schémat:
     ```typescript
     // src/utils/formSchemas/exampleSchema.ts
     import { z } from "zod";

     export const exampleSchema = z.object({
       email: z.string().email("Neplatný formát e-mailu"),
       amount: z.number().min(100, "Minimální částka je 100")
     });

     export type ExampleFormData = z.infer<typeof exampleSchema>;
     ```
2. **Notifikace výsledků**:
   - Úspěšné akce a chyby oznamuj uživateli přes `react-hot-toast` (`toast.success()`, `toast.error()`) nebo `SweetAlert2` pro potvrzovací dialogy.

---

## ⚡ Výkon a optimalizace

1. **Lazy Loading**:
   - Nové stránky do `Router.tsx` vždy registruj pomocí `lazy(() => import(...))` a obal do `<PageLoader>`.
2. **Vite Preload konfigurace**:
   - Soubor `vite.config.ts` obsahuje pravidla pro optimalizaci preloading chunků. Při přidávání velkých modulů zvaž, zda patří do `excludedPaths`.
3. **Custom Hooky**:
   - Složitou logiku načítání dat, výpočtů a stavů odděluj do custom hooků v `src/utils/hooks/`.
