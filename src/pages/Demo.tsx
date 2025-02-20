import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DemoType} from "../utils/types/demos/demoType.ts";
import Skeleton from "react-loading-skeleton";
import {getDemoById} from "../utils/api/demosService.ts";
import {DemoItem} from "../components/demo/DemoItem.tsx";

export const Demo:FC = () => {
    const {id} = useParams();
    const [demoData, setDemoData] = useState<DemoType>();
    
    useEffect(() => {
        if (!id) return;
        const loadDemo = async () => {
            try {
                const response = await getDemoById(id);
                setDemoData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        loadDemo();
    }, [id]);
    
    return (
        <div className="padding-bottom" style={{height: "100vh"}}>
            <div className="container">
                <div className="service-details__wrapper">
                    <div className="service-details__item">
                        <div className="service-details__item-inner">
                            <div
                                className="service-details__thumb mb-40"
                                data-aos="fade-up"
                                data-aos-duration="800"
                            >
                                {demoData ? (
                                    <h1 style={{fontSize: "50px"}}>{demoData.name}</h1>
                                    ) : (
                                    <Skeleton height={50} width={300} />
                                )}
                            </div>
                            <div
                                className="service-details__content"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                {demoData ? (
                                    <>
                                        <p>{demoData.description}</p>
                                        <DemoItem widgets={demoData.widgets} time_of_replace={demoData.time_of_replace}/>
                                    </>
                                ) : (
                                    <>
                                        <Skeleton count={3} />
                                        <Skeleton height={200} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};