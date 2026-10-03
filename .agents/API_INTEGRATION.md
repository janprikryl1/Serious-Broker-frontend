# Integrace s Backend API — Serious Broker Frontend

Tento dokument slouží jako referenční příručka pro komunikaci s backendovým API a správu dat.

---

## 🌐 Konfigurace prostředí (`src/env.ts`)

API endpoint je definován v jediném souboru:

```typescript
// src/env.ts
export const backendUrl = "https://api.serious.broker/"; // Produkce
// export const backendUrl = "https://localhost/bakalarska_prace_backend/"; // Lokální vývoj
```

---

## 🔑 Autentizace a autorizace

1. **Ukládání tokenu**: JWT token je po úspěšném přihlášení či registraci uložen v prohlížeči pod klíčem:
   ```typescript
   localStorage.setItem("token", token);
   ```
2. **Autorizační hlavička**: Všechny požadavky vyžadující přihlášení předávají token v hlavičce:
   ```typescript
   headers: {
     Authorization: `Bearer ${token}`
   }
   ```
3. **Ověření relace**:
   - `isAuthenticated()` v `src/utils/api/authenticateService.ts` volá `user/is_authenticated.php`.
   - Vrací `{ status: string; admin: boolean; user: UserType }`.

---

## 📁 Katalog API služeb (`src/utils/api/`)

Všechny API funkce jsou organizovány v samostatných souborech podle domény:

| Soubor | Účel & Hlavní Endpointy |
| :--- | :--- |
| `authenticateService.ts` | Přihlášení (`login.php`), registrace (`register.php`), ověření tokenu, aktualizace údajů profilu. |
| `articleService.ts` | Načítání článků, detail článku, vyhledávání, filtrace kategorií, schvalování článků. |
| `articlePostService.ts` | Vytváření a úprava článků (bloky textu, nadpisy, vkládání médií). |
| `commentsService.ts` | Načítání a přidávání komentářů k článkům. |
| `translateService.ts` | Překlady článků do cizích jazyků, strojové a manuální překlady. |
| `translationsService.ts` | Správa překladových řetězců. |
| `highlightsService.ts` | Krátké bleskové zprávy / novinky (highlights). |
| `CryptocurrencyService.ts` | Seznam kryptoměn, detail mince, tržní kapitalizace, cenové změny. |
| `adminCryptocurrencyService.ts` | Administrátorská správa coinů, přiřazování tagů a parametrů. |
| `GraphsService.ts` | Data pro historické a interaktivní grafy, cenové svíce (Kline data). |
| `ATHService.ts` | Data a výpočty historických maxim (All-Time High). |
| `binanceAPIService.ts` | Integrace s Binance API (živé ceny, indexy). |
| `binanceIndexAboutService.ts`| Správa informací o Binance indexu v administraci. |
| `binanceIndexAssets.ts` | Aktiva zařazená v Binance indexu. |
| `assetCalculatorService.ts` | Výpočty výnosů pro různá aktiva. |
| `bitcoinCalculatorService.ts`| Kalkulačka ziskovosti a DCA pro Bitcoin. |
| `assetGraphPreviewService.ts`| Náhledy grafů aktiv na domovské stránce a v přehledu. |
| `investmentPlanService.ts` | Vytváření, editace a načítání investičních plánů uživatele. |
| `myPortfolioService.ts` | Správa portfolií, evidence transakcí, statistiky a vývoj hodnoty. |
| `watchListService.ts` | Sledované kryptoměny uživatele (přidání, odebrání, seznam). |
| `trafficLightsService.ts` | Semafory – indikátory tržního sentimentu (nákupní/prodejní signály). |
| `achievementService.ts` | Achievement systém – kontrola splnění cílů, odemykání odznaků. |
| `membershipService.ts` | Úrovně členství uživatelů a předplatné. |
| `profileSessionService.ts` | Správa aktivních přihlášených zařízení a relací uživatele. |
| `feedbackService.ts` | Odesílání a administrátorská správa uživatelských zpětných vazeb. |
| `formsService.ts` | Dynamické dotazníky a formuláře pro uživatele (včetně vyhodnocení). |
| `genericTableService.ts` | Generický tabulkový systém pro administraci (CRUD operace nad tabulkami). |
| `glossaryService.ts` | Slovník pojmů (vytváření, úprava a zobrazení hesel). |
| `newsletterService.ts` | Přihlášení k odběru newsletteru. |
| `newslettersEmailsService.ts`| Správa e-mailových kampaní a odesílání v administraci. |
| `qrService.ts` | Generování a správa QR kódů. |
| `imageService.ts` | Nahrávání a správa obrázků pro články a obsah. |
| `dashboardService.ts` | Agregovaná data pro uživatelský a administrátorský dashboard. |
| `chachedDataAPI.ts` | Správa a invalidace serverové cache. |
| `adminService.ts` | Globální administrátorské operace a správa uživatelů. |
| `forgottenPasswordService.ts`| Žádost o reset hesla a ověření klíčů. |
| `verifyAccountService.ts` | Potvrzení e-mailové adresy tokenem. |

---

## 🖼️ Statické URL pro multimédia (`src/utils/constants/index.ts`)

| Konstanta | Cílová URL |
| :--- | :--- |
| `imageURL` | `https://api.serious.broker/article/images/` |
| `coinURL` | `https://api.serious.broker/cryptocurrency_list/images/` |
| `glossaryImagesURL` | `https://api.serious.broker/glossary/images/` |
| `qrCodeImagesURL` | `https://api.serious.broker/qr_codes/qr/` |
| `formImagesURL` | `https://api.serious.broker/form_questions/` |

---

## 🛠️ Vzor implementace API volání

Při vytváření nové API služby dodržuj tento vzor:

```typescript
import axios from "axios";
import { backendUrl } from "../../env.ts";
import { MyResponseType } from "../types/...";

export const fetchMyData = async (param: string) => {
    const token = localStorage.getItem("token");
    
    return await axios.get<MyResponseType>(`${backendUrl}my_endpoint.php`, {
        params: { param },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
};

export const updateMyData = async (payload: MyPayloadType) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized");

    return await axios.post<MyResponseType>(`${backendUrl}my_update_endpoint.php`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
};
```
