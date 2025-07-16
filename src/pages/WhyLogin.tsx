import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";

export const WhyLogin:FC = () => {
  return (
    <>
        <TitleHeader title={"Why to login?"} />
        <div className="container">
        <p>Důvody... </p>
        <p>1. Portolio...</p>
        </div>
      </>
  );
};