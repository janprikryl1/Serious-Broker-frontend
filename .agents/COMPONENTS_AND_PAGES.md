# Komponenty a Stránky — Serious Broker Frontend

Tento dokument mapuje strukturu a zodpovědnost jednotlivých stránek a komponent aplikace.

---

## 📄 Přehled stránek (`src/pages/`)

### 1. Veřejné a obsahové stránky
- `Index.tsx` — Hlavní stránka (homepage) s bannery, představením strategií, grafy a novinkami.
- `About.tsx` — O projektu a týmu.
- `Overview.tsx` — Globální přehled trhu kryptoměn.
- `Contact.tsx` — Kontaktní formulář a sociální sítě.
- `Articles.tsx` — Výpis publikovaných článků s filtrací kategorií a vyhledáváním.
- `Article.tsx` — Detail konkrétního článku s komentáři a vícejazyčnou podporou.
- `SearchArticles.tsx` — Výsledky vyhledávání v článcích.
- `Glossary.tsx` — Slovník pojmů (kryptoměnová encyklopedie).
- `CryptoCurrenciesList.tsx` — Tabulka a seznam kryptoměn s řazením a živými daty.
- `CryptoCurrencyDetail.tsx` — Detail vybrané kryptoměny s grafy, statistikami a sentimentem.
- `Demos.tsx`, `Demo.tsx` — Interaktivní simulace a dema strategií.
- `CookiesInfo.tsx`, `GDPRInfo.tsx`, `CooperationInfo.tsx` — Informační a právní stránky.

### 2. Autentizační a onboardingové stránky
- `SignIn.tsx` — Přihlašovací formulář s validací.
- `Register.tsx` — Registrační formulář s kontrolou síly hesla.
- `VerifyAccount.tsx` — Aktivace účtu po kliknutí na ověřovací odkaz v e-mailu.
- `ForgottenPassword.tsx` — Formulář pro zaslání instrukcí k obnově hesla.
- `RecoverPassword.tsx` — Nastavení nového hesla s bezpečnostními klíči.
- `welcome/Welcome.tsx`, `welcome/WelcomePremium.tsx` — Uvítací průvodce po registraci / aktivaci prémiového účtu.

### 3. Uživatelský profil (`src/pages/profile/`)
- `Profile.tsx` / `ProfileOverview.tsx` — Přehled účtu a souhrnné statistiky.
- `Dashboard.tsx` — Hlavní klientský dashboard (vývoj investic, signály, portfolio).
- `ProfileEdit.tsx` — Editace osobních údajů a změna hesla.
- `ProfileSessions.tsx` — Seznam aktivních relací (zařízení, IP adresy, odhlášení zařízení).
- `ProfileAchievements.tsx` — Přehled odemčených a zbývajících achievementů.
- `ProfileMembership.tsx` — Stav členství, výhody tarifů, historie plateb.
- `MyPortfolio.tsx`, `EditMyPortfolio.tsx`, `MyPortfolioDetails.tsx` — Tvorba a sledování vlastního portfolia.
- `MyWatchList.tsx` — Seznam oblíbených a sledovaných mincí.
- `MyInvestmentPlans.tsx` — Seznam vytvořených investičních plánů.
- `MyTrafficLight.tsx` — Přehled vlastních nákupních/prodejních semaforů.
- **Investiční plán průvodce (`src/pages/profile/investment-plan/`)**:
  - `NewInvestmentPlanIntro.tsx` — Úvod do tvorby plánu
  - `NewInvestmentPlanName.tsx` — Pojmenování plánu
  - `NewInvestmentPlan.tsx` — Hlavní rozcestník
  - `NewPortfolio.tsx` / `ChooseExistingPortfolio.tsx` — Výběr nebo tvorba portfolia
  - `RecurringInvestment.tsx` — Nastavení pravidelné investice (DCA frekvence)
  - `InvestedAmount.tsx` — Nastavení výše investované částky
  - `TrafficLights.tsx` — Konfigurace signálů semaforu pro nákup/prodej

### 4. Grafy a analytika (`src/pages/graphs/`)
- `Assets.tsx` — Seznam analyzovaných aktiv.
- `AssetGraph.tsx` — Hlavní analytický graf aktiva.
- `AssetGraphCurrencyDetail.tsx` — Detailní pohled na měnu v rámci indexu.
- `Recommendation.tsx` — Doporučení nákupních/prodejních strategií.
- `RecommendationDetails.tsx` — Podrobná analýza konkrétního doporučení.

### 5. Editorská zóna (`src/pages/editor/`)
- `EditorOverview.tsx`, `EditorIndex.tsx` — Nástěnka editora.
- `ArticleManagement.tsx` — Seznam všech článků se stavy publikace.
- `EditArticle.tsx` — Vizuální editor článku (bloky obsahu, nadpisy, obrázky).
- `ArticleComments.tsx` — Moderace komentářů k článkům.
- `ArticleShare.tsx` — Příprava a sdílení článku na sociální sítě.
- `ArticleTranslate.tsx`, `TranslateEdit.tsx` — Překladové rozhraní do dalších jazyků.
- `PostEdit.tsx` — Úprava jednotlivých příspěvků.
- `HighlightsList.tsx`, `HighlightsEditor.tsx` — Rychlé aktuality a novinky.

### 6. Administrátorská zóna (`src/pages/admin/`)
- `AdminOverview.tsx` — Globální metrika systému a statistiky.
- `AdminUserManagement.tsx` — Správa uživatelů (role, blokace, reset hesla).
- `AdminNewsletterOverview.tsx` — Odesílání a správa newsletterů.
- `AdminGlossaryManagement.tsx` — Správa hesel ve slovníku.
- `AdminTableLog.tsx` — Auditní log změn a akcí v systému.
- `AdminFeedbackManagement.tsx` — Přehled zpětné vazby od uživatelů.
- `AdminAchievements.tsx` — Nastavení achievementů a pravidel.
- `AdminCoinSettings.tsx` — Parametry a metadata kryptoměn.
- `AdminChachedData.tsx` — Čištění a kontrola serverové mezipaměti.
- `AdminQRManagement.tsx` — Vytváření a sledování QR kódů pro kampaně.
- `AdminDemos.tsx`, `AdminDemoEdit.tsx` — Správa veřejných demo scénářů.
- `AdminBinanceIndexAbout.tsx` — Informace a správa Binance indexu.
- `AdminGenericTableData.tsx`, `AdminGenericTableDataEdit.tsx`, `AdminGenericTableResults.tsx` — Dynamické tabulky a správa datových sad.
- `AdminFormsOverview.tsx`, `AdminFormResponses.tsx`, `FormEvaulationSettings.tsx` — Tvorba a vyhodnocování uživatelských formulářů.

---

## 🧩 Hlavní komponentové bloky (`src/components/`)

| Složka | Obsah a Klíčové komponenty |
| :--- | :--- |
| `reusable/` | `PageLoader.tsx`, `Modal.tsx`, `Button.tsx`, `ConfirmModal.tsx`, `SkeletonLoaders`, `Pagination.tsx`, `Select.tsx`. |
| `navbar/` | `Header.tsx`, `Footer.tsx`, `NavigationLinks.tsx`, `UnverifiedHeaderInfo.tsx`, `UserMenu.tsx`. |
| `graphs/` | `BTFDTuningParameters.tsx`, `LightweightChartWrapper.tsx`, `AssetGraphPreview.tsx`, `KlineCandleStickChart.tsx`. |
| `trafficLight/` | `TrafficLightsComponent.tsx`, `TrafficLightIndicator.tsx`, `TrafficLightCard.tsx`. |
| `investmentPlan/` | `InvestmentPlanStepper.tsx`, `PlanSummaryCard.tsx`, `DCAFrequencyPicker.tsx`. |
| `article/` & `articles/` | `ArticleCard.tsx`, `ArticleDetails.tsx`, `CommentForm.tsx`, `Comments.tsx`, `SidebarSearch.tsx`. |
| `achievment/` | `AchievementAnimation.tsx`, `AchievmentAnimatedPath.tsx`, `AchievementBadge.tsx`. |
| `formQuestions/` | `UserFormFillModal.tsx`, `QuestionStep.tsx`, `FormRating.tsx`. |
