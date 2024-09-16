import {FC} from "react";
import {useTranslation} from "react-i18next";

export const Comments:FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="blog-details__comment" data-aos="fade-up" data-aos-duration="1000">
            <div className="sidebar">
                <div className="sidebar__comment">
                    <div className="sidebar__head">
                        <h3>{t("Comments")}</h3>
                    </div>
                    <div className="sidebar__comment-body">
                        <ul>
                            <li className="sidebar__comment-item">
                                <div className="comment">
                                    <div className="comment__inner">
                                        <div className="comment__head">
                                            <div className="comment__author">
                                                <div className="comment__author-info">
                                                    <h6 className="mb-0">Chris Scott <span>19 Dec 2024 , at 04:00 pm</span></h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="comment__body">
                                            <div className="comment__body-inner">
                                                <p className="mb-0">Example comment</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};