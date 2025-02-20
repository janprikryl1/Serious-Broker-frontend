import {FC} from "react";
import {useParams} from "react-router-dom";
import {CiEdit} from "react-icons/ci";
import {Button} from "../../../reusable/Button.tsx";

export const MyPortfolioEditButton:FC = () => {
    const {id} = useParams();
    
    return (
        <Button type="link" to={`/profile/edit_my_portfolio/${id}`} className="btn btn-outline-warning" style={{marginLeft: 10}}><CiEdit /></Button>
    )
}