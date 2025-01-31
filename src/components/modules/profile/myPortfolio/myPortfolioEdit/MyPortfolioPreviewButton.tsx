import {Link, useParams} from "react-router-dom";
import {FC} from "react";
import {FaRegEye} from "react-icons/fa6";

export const MyPortfolioPreviewButton:FC = () => {
    const {id} = useParams();
    
    return (
        <Link to={`/profile/my_portfolio_details/${id}`} className="btn btn-outline-warning" style={{marginLeft: 10}}><FaRegEye /></Link>
    )
}