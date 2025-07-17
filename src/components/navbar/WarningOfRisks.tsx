import {FC} from "react";
import {useTranslation} from "react-i18next";

export const WarningOfRisks:FC = () => {
    const {t} = useTranslation();
    
    return (
        <>
            <p><strong>{t("WARNING OF RISKS")}</strong></p>
            <p>{t("Stejně jako u každého aktiva může hodnota digitálních aktiv výrazně kolísat a při nákupu, prodeji, držení nebo investování do digitálních aktiv existuje podstatné riziko ekonomické ztráty. Měli byste proto zvážit, zda je pro vás obchodování nebo držení digitálních aktiv vhodné s ohledem na vaši finanční situaci.")}</p>
            <p>{t("We are not your broker, intermediary, agent or advisor and we have no fiduciary relationship or obligation to you in connection with any transactions or other activities you undertake while using our Services. We do not provide investment or advisory advice of any kind, and no communication or information we provide to you is intended or should be construed as advice of any kind.")}</p>
            <p>{t("Je vaší odpovědností určit, zda je pro vás jakákoli investice, investiční strategie nebo související transakce vhodná podle vašich osobních investičních cílů, finanční situace a tolerance rizika, a jste zodpovědní za jakoukoli související ztrátu nebo odpovědnost. Nedoporučujeme, abyste jakékoli digitální aktivum kupovali, získávali, prodávali nebo drželi. Než se rozhodnete koupit, prodat nebo držet jakékoli digitální aktivum, měli byste se poradit se svým finančním poradcem. Neneseme odpovědnost za rozhodnutí, která učiníte o nákupu, výdělku, prodeji nebo držení digitálních aktiv na základě námi poskytnutých informací, včetně jakýchkoli ztrát, které vám v důsledku těchto rozhodnutí vzniknou.")}</p>
        </>
    );
}