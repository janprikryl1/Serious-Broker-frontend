import {FC} from "react";
import {Link} from "react-router-dom";

export const ArticleCategories:FC = () => {
    return (
        <div className="sidebar__categorie">
            <div className="sidebar__head">
                <h6>Categories</h6>
            </div>
            <div className="sidebar__categorie-body">
                <div className="sidebar__categorie-content">
                    <ul>
                        <li className="active">
                            <Link to="" className="none">Large-cap stocks</Link>
                            <span>2</span>
                        </li>
                        <li>
                            <Link to="" className="none">Value stocks</Link>
                            <span>4</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};