import {FC} from "react";
import GraphNoBg from "../../utils/icons/index/graph_no_bg2.png";
import {Button} from "../reusable/Button.tsx";

export const IndexPersonalStrategy:FC = () => {
    return (
        <div style={{backgroundColor: "#221f1c"}} className="py-5">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-sm-5 text-center text-sm-end mb-4 mb-sm-0">
                        <img src={GraphNoBg} alt="Graph no bg" className="img-fluid" />
                    </div>
                    <div className="col-sm-4 text-center text-sm-start">
                        <h1 className="index-title" style={{color: "#ae9749"}}>Personal Strategy</h1>
                        <h3 style={{fontSize:25, color: "#aaa7a0"}}>For Individuals</h3>
                        <p style={{color: "white" ,fontSize:20}}>Personalized investment recommendations tailored to individual needs and market trends.</p>
                        <div className="text-center mt-3">
                            <Button style={{fontWeight:700}}>Learn More</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};