import {FC} from "react";

type Props = {
    title: string,
    value: string | number,
    bottom: string
}

export const AdminOverviewCard:FC<Props> = ({title, value, bottom}) => {
    return (
        <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder">
                <div className="card-body" style={{height: 250}}>
                    <h4 className="font-weight-normal mb-3">
                        {title} <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">{value}</h2>
                    <h6 className="card-text">{bottom}</h6>
                </div>
            </div>
        </div>
    )
}