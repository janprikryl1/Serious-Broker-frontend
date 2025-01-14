import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaArrowCircleRight} from "react-icons/fa";
import {Button} from "react-bootstrap";

type Props = {
    title: string;
    id: number;
}

export const DemoLinkCard:FC<Props> = ({title, id}) => {
    const navigate = useNavigate();
    
    return (
        <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder">
                <div className="card-body">
                    <h4 className="font-weight-normal mb-3">
                        <Link to={`/demo/${id}`} className="link-underline-none">{title} <i className="mdi mdi-chart-line mdi-24px float-right"></i></Link>
                    </h4>
                    <h2 className="mb-5"><Button onClick={() => navigate(`/demo/${id}`)}><FaArrowCircleRight /></Button></h2>
                </div>
            </div>
        </div>
    )
};