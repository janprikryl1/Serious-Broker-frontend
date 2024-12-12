import {FC} from "react";
import {Link} from "react-router-dom";
import {ArticleProps} from "../../../utils/types/article/ArticleProps.ts";
import {useTranslation} from "react-i18next";
import {toCzechDateFormat} from "../../../utils/constants/functions.ts";

type Props = {
    data: ArticleProps;
    link?: string;
};

export const ArticleCard:FC<Props> = ({data, link = "article"}) => {
    const {t} = useTranslation();
    
    return (
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner blog__item-inner--style2">
                    <div className="blog__content">
                        <div className="blog__meta">
                            <span className="blog__meta-tag blog__meta-tag--style1">
                              {t(data.articleTypeOption)}
                            </span>
                            {data.premiumOnly === "1" &&
                                <span className="blog__meta-tag blog__meta-tag--style3">
                                    Premium
                                </span>
                            }
                        </div>
                        <h5 className="10 style2">
                            <Link to={`/${link}/${data.id}`} className="link-underline-none">{data.title}</Link>
                        </h5>

                        <p className="mb-15" style={{height: 100}}>{data.description}</p>

                        <div className="blog__writer">
                            <div className="blog__writer-designation">
                                <p>{data.user_firstname} {data.user_surname} <span>{toCzechDateFormat(data.changed)}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};