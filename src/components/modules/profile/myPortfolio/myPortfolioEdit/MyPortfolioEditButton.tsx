import {FC} from "react";
import {Link, useParams} from "react-router-dom";
import {CiEdit} from "react-icons/ci";

export const MyPortfolioEditButton:FC = () => {
    const {id} = useParams();
    
    return (
        <Link to={`/profile/edit_my_portfolio/${id}`} className="btn btn-outline-warning"><CiEdit /></Link>
    )
}