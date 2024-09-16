import {FC} from "react";
import {Link} from "react-router-dom";
import {ArticleProps} from "../../../utils/types/article/ArticleProps.ts";
import {toCzechDateFormat} from "../../../utils/constants";

type Props = {
    data: ArticleProps;
};

export const ArticleCard:FC<Props> = ({data}) => {
    return (
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner blog__item-inner--style2">
                    <div className="blog__content">
                        <h5 className="10 style2">
                            <Link to={`/article/${data.id}`} className="none">{data.title}</Link>
                        </h5>

                        <p className="mb-15">{data.description}</p>

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