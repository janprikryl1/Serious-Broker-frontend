import {FC} from "react";
import {OutlineContainer} from "../reusable/OutlineContainer.tsx";

type Props = {
    title: string,
    value: string | number,
    bottom: string
}

export const AdminOverviewCard:FC<Props> = ({title, value, bottom}) => {
    return (
        <div className="col-md-6 stretch-card grid-margin mb-3">
            <OutlineContainer style={{margin: 0 }} bgColor={"var(--quaternary-color-transparent-50"}>
                <div className="card-body" style={{height: 210}}>
                    <h4 className="font-weight-normal mb-3">
                        {title} <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <p className="mb-5">{value}</p>
                    <p className="card-text">{bottom}</p>
                </div>
            </OutlineContainer>
        </div>
    )
}