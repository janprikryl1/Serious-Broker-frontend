import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getCryptocurrencyById} from "../api/CryptocurrencyService.ts";
import {CryptoCurrencyCategoryType} from "../utils/types/CryptoCurrencyType.ts";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {SidebarSearch} from "../components/modules/article/SidebarSearch.tsx";
import {RecentPost} from "../components/modules/article/RecentPost.tsx";
import {ArticleSkeleton} from "../components/modules/article/ArticleSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";

export const CryptoCurrencyDetail:FC = () => {
    const {id} = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [cryptocurrency, setCryptocurrency] = useState<CryptoCurrencyCategoryType>();
    const [description, setDescription] = useState("");

    
    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
          try {
              const res = await getCryptocurrencyById(id);
              setCryptocurrency(res.data);
              const currentLang = i18n.language;
              const descriptionObject = JSON.parse(res.data.description);
              setDescription(currentLang === 'cs' ? descriptionObject.cs : descriptionObject.en);
          } catch (e) {
              console.error(e);
          }
        };
        fetchData();
    }, [id]);
    
    const goBack = () => {
        navigate("/crypto_currencies_list");
    };
    
    return (
       <>
           {cryptocurrency ? (
               <>
                   <TitleHeader title={cryptocurrency.name}/>
                   <div className="blog-details padding-top padding-bottom section-bg-color">
                       <div className="container">
                           <div className="blog-details__wrapper">
                               <div className="row g-5">
                                   <div className="col-lg-8">
                                       <h3>{cryptocurrency.name}</h3>
                                       <p>{cryptocurrency.symbol}</p>
                                       <p>{description}</p>
                                       <p>{cryptocurrency.website}</p>
                                       {cryptocurrency.totalSupply !== 0 && <p>{t("Total supply: ")}{cryptocurrency.totalSupply}{" "}{t("coins")}</p>}
                                       <img src={cryptocurrency.image} alt={cryptocurrency.name} width={300}/>
                                       <br />
                                       <Button variant="primary" style={{marginTop:30}} onClick={goBack}>{t("Back")}</Button>
                                   </div>
                                   <div className="col-lg-4 col-md-8  col-12">
                                       <div className="sidebar">
                                           <div className="row g-4">
                                               <div className="col-12">
                                                   <SidebarSearch />
                                               </div>
                                               <div className="col-12">
                                                   <RecentPost />
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </>
            ) : <ArticleSkeleton />}
       </>
    );
};