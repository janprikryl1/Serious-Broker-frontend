import { Link } from "react-router-dom";

export const TitleLinks = () => {
    return (
        <section className="banner banner--style1">
            <div className="container">
                <div className="service-details__wrapper">
                    <div className="service-details__item">
                        <div className="service-details__item-inner">
                            <Link to="/articles">Articles</Link>
                        </div>
                    </div>
                </div>            
            </div>
        </section>
    );
};