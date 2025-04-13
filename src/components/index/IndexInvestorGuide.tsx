import {FC} from "react";
import LaptopAndBook from "../../utils/icons/index/laptop and book no plant.png";
import {Button} from "../reusable/Button.tsx";

export const IndexInvestorGuide:FC = () => {
    return (
        <div style={{backgroundColor: "#221f1c"}} className="py-5">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-sm-5 text-center text-sm-end mb-4 mb-sm-0">
                        <img src={LaptopAndBook} alt="Graph no bg" className="img-fluid" />
                    </div>
                    <div className="col-sm-4 text-center text-sm-start" style={{marginLeft: "5%"}}>
                        <h1 className="index-title" style={{color: "#ae9749"}}>Investor's guide</h1>
                        <h3 style={{fontSize:25, color: "#aaa7a0"}}>For Learners</h3>
                        <p style={{color: "white" ,fontSize:20}}>Clear and concise educational articles covering everything essential for independent investing.</p>
                        <div className="text-center mt-3">
                            <Button style={{fontWeight: 700}}>Learn Learning</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}