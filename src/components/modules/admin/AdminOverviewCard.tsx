import {FC} from "react";

type Props = {
    title: string,
    value: string | number,
    bottom: string
}

export const AdminOverviewCard:FC<Props> = ({title, value, bottom}) => {
    return (
        <div className="col-md-4 stretch-card grid-margin mb-3">
            <div className="card bg-gradient-danger card-img-holder">
                <div className="card-body" style={{height: 210}}>
                    <h4 className="font-weight-normal mb-3">
                        {title} <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <p className="mb-5">{value}</p>
                    <p className="card-text">{bottom}</p>
                </div>
            </div>
        </div>
    )
}