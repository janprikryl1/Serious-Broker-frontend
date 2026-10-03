# Doménová logika a klíčové funkce — Serious Broker Frontend

Tento dokument vysvětluje obchodní a investiční logiku, algoritmy a specifické funkce platformy Serious Broker.

---

## 🚦 1. Semafory (Traffic Lights)

Systém semaforů slouží k automatizovanému vyhodnocování nákupních a prodejních příležitostí na kryptoměnovém trhu:

- **Zelená (Koupit / Buy)**: Trh se nachází v přeprodané oblasti nebo je sentiment extrémně negativní (vhodný moment pro nákup v rámci DCA či BTFD).
- **Žlutá (Čekat / Neutral)**: Trh je v rovnovážném stavu nebo konsoliduje; doporučuje se držet pozice a vyčkat na silnější signál.
- **Červená (Prodat / Sell / Riziko)**: Trh je přehřátý, indikátory vykazují překoupenost nebo dochází k divergencím; signál pro výběr zisku nebo redukci rizika.

### Nastavení parametrů semaforu
Uživatel i administrátor mohou definovat vlastní semafory na základě technických indikátorů (např. RSI, klouzavé průměry MA/EMA, Fear & Greed index) a přiřadit je ke konkrétním investičním plánům nebo aktivům.

---

## 📉 2. BTFD Strategie (Buy The Dip) & Tuning

Sekce `/graphs/BTFD` a komponenta `BTFDTuningParameters.tsx`:
- **Účel**: Simulace a optimalizace strategie nákupu při cenových propadech (dips).
- **Nastavitelné parametry**:
  - Hloubka propadu v % (pro spuštění nákupního příkazu).
  - Časové okno pro vyhodnocení propadu (1 den, 7 dní, 30 dní).
  - Multiplikátor investované částky (např. 1.5x při propadu o 10 %, 2x při propadu o 20 %).
  - Výpočet historické ziskovosti oproti čistému DCA (Dollar-Cost Averaging) nebo HODL.

---

## 📈 3. Binance Index & Tržní koše

- **Binance Index**: Představuje indexové portfolio top kryptoměn obchodovaných na burze Binance, vážených podle tržní kapitalizace.
- **Automatické rebalancování**: Systém vizualizuje poměry jednotlivých aktiv a změny ve složení indexu v čase.
- **Použití v plánu**: Uživatel si může při tvorbě investičního plánu vybrat buď investici do celého indexu (Binance Top koše), nebo si poskládat vlastní portfolio.

---

## 🎯 4. Průvodce investičním plánem (Investment Plan Wizard)

Vícekrokový proces tvorby plánu (řízený přes `InvestmentPlanProvider.tsx`):
1. **Pojmenování a popis**: Název plánu a jeho investiční cíl.
2. **Výběr portfolia**:
   - Vlastní portfolio (uživatelem vybrané mince a váhy).
   - Binance Index (předpřipravený diverzifikovaný koš).
3. **Pravidelná investice (Recurring Investment)**:
   - Frekvence: Denní, Týdenní (výběr dne v týdnu), Měsíční (výběr dne v měsíci).
   - Čas nákupu (hodina v UTC).
4. **Investovaná částka**: Výše vkladu v EUR/USD/CZK.
5. **Přiřazení semaforů**: Volitelné napojení na nákupní a prodejní signály semaforu.

---

## 🏆 5. Systém Achievementů (Gamifikace)

- **Mechanika**: `AchievementsProvider.tsx` na pozadí pravidelně (každých 60s) kontroluje nové odznaky a úspěchy uživatele přes `getAchievements()`.
- **Notifikace a animace**:
  - Při detekci nově splněného achievementu se spustí vizuální animace (`AchievementAnimation.tsx`) a zobrazí se notifikace s popisem a odměnou.
- **Příklady achievementů**:
  - První přihlášení a vyplnění profilu.
  - Vytvoření prvního portfolia a investičního plánu.
  - Přečtení stanoveného počtu vzdělávacích článků / lekcí ve slovníku.
  - Vyplnění investičního dotazníku.

---

## 📝 6. Uživatelský dotazník a hodnocení rizika

- **Form Questions**: Modální okno `UserFormFillModal.tsx` se automaticky nabízí novým uživatelům (`has_filled_form !== true`).
- **Kategorizace**: Otázky zjišťují zkušenosti uživatele, toleranci k riziku a investiční horizont.
- **Vyhodnocení (`FormEvaulationSettings.tsx`)**: Na základě bodového ohodnocení je uživateli doporučen odpovídající rizikový profil (Konzervativní / Vyvážený / Dynamický) a vhodná skladba aktiv.

---

## ✍️ 7. Editorské nástroje a správa obsahu

- **Blokový editor článků (`EditArticle.tsx`)**: Podpora strukturovaného obsahu (odstavce, nadpisy H1-H3, vložené obrázky, citace, odrážky).
- **Překladatelské centrum (`ArticleTranslate.tsx`, `TranslateEdit.tsx`)**: Správa lokalizovaných verzí článků a synchronizace změn.
- **Bleskové zprávy (Highlights)**: Rychlé tržní aktuality zobrazované v tickeru nebo infoboxu na hlavní stránce.
