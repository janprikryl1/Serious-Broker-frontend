import {FC} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";

type Props = {
    data: any;
}

export const MyPortfolioCard:FC<Props> = ({data}) => {
    
    const handleDelete = (id: number) => {
        console.log(id);
    }
    
    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000" style={{maxWidth: "300px"}}>
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="10 style2">
                    <Link to={`/profile/edit_my_portfolio/${data.id}`}
                          className="link-underline-none">{data.title}</Link>
                </h5>

                    <p className="mb-15" style={{height: 100}}>{data.description}</p>

                    <div className="blog__writer">
                        <div className="blog__writer-designation d-flex align-items-center">
                            <Button
                                variant="danger"
                                className="ms-2 p-1"
                                onClick={() => handleDelete(data.id)}
                            >
                                <FaRegTrashAlt/>
                            </Button>
                            <Link to={`/profile/my_portfolio_details/${data.id}`}>
                                <Button
                                    variant="success"
                                    className="ms-2 p-1"
                                >
                                    <FaRegEdit/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}