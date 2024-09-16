import {FC} from "react";
import {Link} from "react-router-dom";

export const RecentPost:FC = () => {
    return (
        <div className="sidebar__recentpost">
            <div className="sidebar__head">
                <h6>Recent Post</h6>
            </div>
            <div className="sidebar__recentpost-body">
                <ul>
                    <li>
                        <div className="sidebar__recentpost-item">
                            <div className="sidebar__recentpost-inner">
                                <div className="sidebar__recentpost-content">
                                    <p><Link to="blog-details" className="none">Real Estate Investing</Link></p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};