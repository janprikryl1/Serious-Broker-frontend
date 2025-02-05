import {useParams} from "react-router-dom";
import {FC} from "react";
import {FaRegEye} from "react-icons/fa6";
import {Button} from "../../../../Button.tsx";

export const MyPortfolioPreviewButton:FC = () => {
    const {id} = useParams();
    
    if (id !== undefined){
        return (
            <Button type="link" to={`/profile/my_portfolio_details/${id}`} style={{marginLeft: 10, padding:10}}><FaRegEye /></Button>
        )
    }
}