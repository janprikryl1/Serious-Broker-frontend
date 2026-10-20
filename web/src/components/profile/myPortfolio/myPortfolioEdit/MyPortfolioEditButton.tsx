import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {Button, ButtonColor} from "../../../reusable/Button.tsx";
import {FiEdit3} from "react-icons/fi";

export const MyPortfolioEditButton:FC = () => {
    const {id} = useParams();
    
    return (
        <Button
            type="link"
            to={`/profile/edit_my_portfolio/${id}`}
            className="btn trk-btn"
            color={ButtonColor.transparent}
            shadow={false}
            style={{
                padding: "6px",
                borderRadius: "8px",
                minWidth: "32px",
                width: "32px",
                height: "32px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 32px"
            }}
            fontColor="rgb(168 162 158)"
        >
            <FiEdit3 size={15} color={"currentColor"}/>
        </Button>
    )
}