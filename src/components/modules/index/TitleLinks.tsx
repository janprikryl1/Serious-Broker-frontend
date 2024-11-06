import { Link } from "react-router-dom";

export const TitleLinks = () => {
    return (
        <div className="container">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <h4 className="card-title">
                            <Link to="/articles">Articles</Link>
                        </h4>                        
                    </div>
                </div>
            </div>            
        </div>
    );
};