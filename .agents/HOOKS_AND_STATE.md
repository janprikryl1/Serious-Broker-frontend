# Custom Hooky a Správa stavu — Serious Broker Frontend

Tento dokument poskytuje přehled všech vlastních React hooků (`src/utils/hooks/`) a Context Providerů (`src/utils/providers/`).

---

## 🪝 Přehled Custom Hooků (`src/utils/hooks/`)

Vždy před psaním nové logiky ověř, zda již neexistuje odpovídající hook:

| Hook | Popis a návratové hodnoty |
| :--- | :--- |
| `useAssets.ts` | Načítání seznamu aktiv, filtrace, řazení a stránkování. |
| `useAssetGraph.ts` | Příprava a formátování časových řad pro grafy aktiv (svíčkové/čárové grafy). |
| `useAssetGraphCurrencyDetailDate.ts` | Správa zvoleného časového rozsahu a agregace dat pro detail měny. |
| `useBitcoinProfitCalculator.ts` | Výpočty kalkulačky návratnosti investice do Bitcoinu (historické zisky, DCA simulace). |
| `useChartComponent.ts` | Inicializace a konfigurace TradingView Lightweight Charts / ApexCharts instancí. |
| `useEarningIn.ts` | Výpočet odhadovaného výnosu v různých časových horizontech a měnách. |
| `useGetDemoCoinmarketcupTop10.ts` | Získání tržních dat pro Top 10 mincí používaných v demo ukázkách. |
| `useHandleSetPathOfImage.ts` | Pomocná logika pro práci s relativními a absolutními cestami k nahraným obrázkům. |
| `useInfiniteScroll.ts` | Detekce doscrollu na konec seznamu pro plynulé načítání další stránky. |
| `useLastGraphComponentData.ts` | Načtení a transformace nejnovějších cenových bodů pro mini grafy v přehledech. |
| `useListFilesModal.ts` | Správa stavu a výběru souborů v modálním okně správce médií. |
| `useModal.tsx` | Univerzální hook pro otevírání, zavírání a přepínání stavu libovolného modálního okna. |
| `useMostProfitableLastSelectedPeriod.ts` | Výpočet a označení nejvýnosnějšího období v grafech. |
| `useNewsletter.ts` | Zpracování registrace e-mailu do newsletteru včetně validace a toast hlášek. |
| `useOverviewTableChartStyles.ts` | Dynamické CSS styly a barevná škála pro minigrafy v tabulce přehledu. |
| `useRecoverPassword.ts` | Správa formuláře obnovy hesla, validace hesel a odeslání požadavku na API. |
| `useRegister.ts` | Registrační proces, kontrola síly hesla, validace vstupů a přesměrování. |
| `useRenderProfitDetails.tsx` | Formátování a renderování ziskových/ztrátových ukazatelů (+% / -%). |
| `useSignIn.ts` | Přihlašovací logika, uložení tokenu do `localStorage` a inicializace stavu uživatele. |
| `useTrafficLightForm.ts` | Správa a validace formuláře pro nastavení parametrů semaforu. |
| `useTranslateAnimate.ts` | Animace a přechody při přepínání jazykových mutací a překladů. |
| `useTranslateSubjects.ts` | Načítání a správa témat a kategorií pro překlady. |
| `useVerifyAccount.ts` | Zpracování tokenu pro ověření e-mailu a zobrazení stavu ověření. |

---

## 🏛️ Přehled Context Providerů (`src/utils/providers/`)

Pro přístup k jednotlivým stavům používej příslušné custom hooky:

```typescript
// Příklad použití uživatelského kontextu:
import { useUserContext } from "../utils/providers/providerUser.tsx";

const { user, logout, setFilledForm } = useUserContext();
```

| Provider | Hook pro konzumaci | Poskytovaná data & akce |
| :--- | :--- | :--- |
| `providerUser.tsx` | `useUserContext()` | `user` (profil přihlášeného uživatele), `setUser`, `logout`, `setFilledForm`. |
| `ToastProvider.tsx` | `useToast()` | `showToast(message, type)`, správa notifikačních bublin. |
| `ThemeProvider.tsx` | `useTheme()` | `theme` (`light` / `dark`), `toggleTheme`. |
| `AchievementsProvider.tsx`| `useAchievements()` | `achievements`, `unreadAchievements`, `markAchievementAsRead`. |
| `InvestmentPlanProvider.tsx`| `useInvestmentPlan()` | Všechny mezistavy tvorby plánu (`name`, `frequency`, `amount`, `portfolio`, `saveChanges`). |
| `ArticleCreateProvider.tsx` | `useArticleCreate()` | Bloky článku, nadpisy, nahrané obrázky, jazykové verze před publikací. |
| `ArticleTranslateProvider.tsx`| `useArticleTranslate()` | Původní vs. přeložený text článku, synchronizace překladů. |
| `DemoProvider.tsx` | `useDemoContext()` | Nastavení parametrů demo simulace, virtuální portfolio. |
| `GenericTablesProvider.tsx` | `useGenericTables()` | Schéma tabulky, sloupce, řádky, filtry, CRUD operace v adminu. |
| `HighlightProvider.tsx` | `useHighlight()` | Seznam bleskových zpráv, aktivní položka pro úpravu. |
| `TrafficLightProvider.tsx` | `useTrafficLight()` | Aktivní konfigurace semaforů uživatele, prahové hodnoty. |
| `MyPortfolioProvider.tsx` | `useMyPortfolio()` | Seznam držených mincí v portfoliu, přepočty hodnot, nákupní ceny. |
| `UserDetailsProvider.tsx` | `useUserDetails()` | Formulářová data úpravy profilu, nastavení zabezpečení. |
