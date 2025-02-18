import {Dispatch, FC, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {ArticleProps} from "../../../utils/types/article/ArticleProps.ts";
import {useTranslation} from "react-i18next";
import {toCzechDateFormat} from "../../../utils/constants/functions.ts";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {addToWatchList, removeFromWatchList} from "../../../api/watchListService.ts";
import {WatchListEnum} from "../../../utils/enums/WatchListEnum.ts";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";

type Props = {
    data: ArticleProps;
    link?: string;
    setData: Dispatch<SetStateAction<ArticleProps[]>>;
};

export const ArticleCard:FC<Props> = ({data, link = "article", setData}) => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    
    const handleAddToWatchList = async () => {
        try {
            const response = await addToWatchList(data.id, WatchListEnum.Article);
            if (response?.status === 200) {
                setData((prevData) => prevData.map((article) => article.id === data.id ? {...article, in_watchlist: true} : article));
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleRemoveFromWatchList = async () => {
        try {
            const response = await removeFromWatchList(data.id);
            if (response?.status === 200) {
                setData((prevData) => prevData.map((article) => article.id === data.id ? {...article, in_watchlist: false} : article));
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner blog__item-inner--style2">
                    <div className="blog__content">
                        <div className="blog__meta">
                            <span className="blog__meta-tag blog__meta-tag--style1">
                              {t(data.articleTypeOption)}
                            </span>
                            {data.premiumOnly &&
                                <span className="blog__meta-tag blog__meta-tag--style3">
                                    Premium
                                </span>
                            }
                            <button style={{background:"none", border:"none"}} disabled={user === undefined}>{!data.in_watchlist ? <FaRegBookmark style={{marginLeft: 10, marginBottom: 5}} onClick={handleAddToWatchList}/> : <FaBookmark style={{marginLeft: 10, marginBottom: 5}} onClick={handleRemoveFromWatchList} />}</button>
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