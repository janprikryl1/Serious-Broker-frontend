import {ChangeEvent, FC, useEffect, useState} from "react";
import {TitleHeader} from "../../components/modules/about/TitleHeader.tsx";
import {BinanceIndexAssetRecomBestPreviousType} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {getBinanceIndexAssetRecomBestPrevious} from "../../api/GraphsService.ts";
import {PositionGraphComponent} from "../../components/modules/graphs/PositionGraphComponent.tsx";
import {RecomDetail} from "../../components/modules/graphs/RecomDetail.tsx";
import {RecommendationSkeleton} from "./RecommendationSkeleton.tsx";
import Form from 'react-bootstrap/Form';
import {Col, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import { v4 as uuidv4 } from 'uuid';

export const Recommendation:FC = () => {
    const {t} = useTranslation();
    const [data, setData] = useState<BinanceIndexAssetRecomBestPreviousType[]>();
    const [orderBy, setOrderBy] = useState("");
    
    useEffect(() => {
        if (!orderBy) return;
        const getData = async () => {
            try {
                const res = await getBinanceIndexAssetRecomBestPrevious(orderBy);
                setData(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, [orderBy]);
    
    const handleOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(e.target.value);
        setData(undefined);
    }
    
    return (
        <>
            <TitleHeader title="Recommendation" />
            <div className="blog padding-top padding-bottom section-bg-color">
                <div className="container">
                    <Row className="justify-content-center align-items-center">
                        <Col xs="auto">
                        <Form.Select aria-label="Default select example" onChange={handleOrderBy} defaultValue={orderBy}>
                            <option value="">{t("Order by")}</option>
                            <option value="all_pos">{t("All positions")}</option>
                            <option value="all_sug">{t("All suggestions")}</option>
                            <option value="week_sug">{t("Week suggestions")}</option>
                            <option value="week_all">{t("Week all")}</option>
                            <option value="week_all_profit">{t("Week all profit")}</option>
                        </Form.Select>
                        </Col>
                    </Row>
                    {data ? (
                        <>
                            <PositionGraphComponent data={data} />
                            <div className="blog__wrapper">
                                <div className="row g-4">
                                    {data.map((item) => (
                                        <div key={uuidv4()} className="col-sm-6 col-lg-4">
                                            <RecomDetail data={item} /> 
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : <RecommendationSkeleton />}
                </div>
            </div>
        </>
    );
};