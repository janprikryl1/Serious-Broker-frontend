import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {Button, ButtonColor} from "../../../reusable/Button.tsx";
import {FiEdit3} from "react-icons/fi";

export const MyPortfolioEditButton:FC = () => {
    const {id} = useParams();
    
    return (
        <Button type="link" to={`/profile/edit_my_portfolio/${id}`} className="btn trk-btn" color={ButtonColor.transparent} style={{outline: "1px solid var(--secondary-color)", padding: "10px", borderRadius: "10px"}}>
            <FiEdit3 size={21} color={"var(--white-color)"}/>
        </Button>
    )
}