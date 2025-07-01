import { useTranslation } from "react-i18next";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useState, useMemo } from "react";
import { DragCloseDrawer } from "../reusable/DragCloseDrawer";
import greedIconUrl from "../../utils/icons/index/greed.svg";
import fearIconUrl from "../../utils/icons/index/fear.svg";
import {PhaseButton} from "./PhaseButton.tsx";
import "../../styles/sass/components/GreedFearStrategies.module.css.scss";

const greedOptions = [
    { text: "Don't buy, don't sell" },
    { text: "Buy less" },
    { text: "Buy normal" },
    { text: "Buy more of the same coin" },
    { text: "Buy something new" },
];

const fearOptions = [
    { text: "Buy more" },
    { text: "Buy normal" },
    { text: "Buy less" },
    { text: "Don't buy, don't sell" },
    { text: "Sell part or all" },
];

const initialSelections = greedOptions.reduce((acc, _, index) => {
    acc[index] = 'greed';
    return acc;
}, {} as { [key: number]: 'greed' | 'fear' });


export const GreedFearStrategies = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [selections, setSelections] = useState(initialSelections);

    const handleSelect = (rowIndex: number, side: 'greed' | 'fear') => {
        setSelections(prevSelections => ({
            ...prevSelections,
            [rowIndex]: side,
        }));
    };

    const resultText = useMemo(() => {
        const allSelections = Object.values(selections);
        const greedCount = allSelections.filter(side => side === 'greed').length;
        const fearCount = allSelections.filter(side => side === 'fear').length;

        if (greedCount > fearCount) {
            return 'You are more of a GREED investor';
        }
        if (fearCount > greedCount) {
            return 'You are more of a FEAR investor';
        }
        return 'You are a BALANCED investor';

    }, [selections]);


    return (
        <>
            <div className="greed-fear-container">
                <div className="gf-background-split"></div>

                <div className="gf-visual-content">
                    <div className="gf-bull-icon">
                        <img src={greedIconUrl} alt="Greed Icon" />
                    </div>
                    <div className="gf-bear-icon">
                        <img src={fearIconUrl} alt="Fear Icon" />
                    </div>

                    <div className="gf-options-overlay">
                        <div className="gf-options-column">
                            {greedOptions.map((option, index) => (
                                <PhaseButton
                                    key={`greed-${index}`}
                                    text={option.text}
                                    index={index}
                                    className="gf-option-button-left"
                                    isSelected={selections[index] === 'greed'}
                                    onClick={() => handleSelect(index, 'greed')}
                                />
                            ))}
                        </div>
                        <div className="gf-options-column">
                            {fearOptions.map((option, index) => (
                                <PhaseButton
                                    key={`fear-${index}`}
                                    text={option.text}
                                    index={index}
                                    className="gf-option-button-right"
                                    isSelected={selections[index] === 'fear'}
                                    onClick={() => handleSelect(index, 'fear')}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="gf-result-container">
                        <p className="gf-result-text">{t(resultText)}</p>
                    </div>

                    <div className="gf-text-block">
                        <h3 className="gf-title">
                            <span style={{marginLeft: '-1rem'}}>{t('GREED')}</span>
                            <span style={{marginRight: '0.5rem'}}>{t('FEAR')}</span>
                        </h3>
                        <div className="gf-subtitle-wrapper">
                            <p className="gf-subtitle" style={{marginLeft: '1rem'}}>{t('Optimism and rising prices')}</p>
                            <p className="gf-subtitle" style={{marginRight: '2rem'}}>{t('Pessimism and falling prices')}</p>
                        </div>
                    </div>
                </div>

                <div className="gf-header-content container">
                    <h2 className="index-section-head-title">{t("Don't let emotions drive your decisions", "Don't Let Emotions Drive Your Decisions")}</h2>
                    <p style={{ fontSize: 20, fontWeight: 400, marginBottom: 2 }}>
                        {t("In order for us to constantly optimize your portfolio, you can", "In order for us to constantly optimize your portfolio, you can")}
                        <span className="font-bold">{t(" select one option that describes you the best during each phase", " select one option that describes you the best during each phase")}</span>.
                    </p>
                    <span style={{ fontWeight: 200, cursor: 'pointer' }} className="mb-5" onClick={() => setOpen(true)}>
                        <FaRegCircleQuestion size={15} style={{ marginBottom: "2px", display: 'inline-block', marginRight: '5px' }}/>
                        {t("How do we optimize your portfolio?", "How do we optimize your portfolio?")}
                    </span>
                </div>
            </div>

            <DragCloseDrawer open={open} setOpen={setOpen}>
                <>
                    <h2>{t("How do we optimize your portfolio?")}</h2>
                    <p>...</p>
                </>
            </DragCloseDrawer>
        </>
    );
};