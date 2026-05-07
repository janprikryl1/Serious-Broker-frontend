import React, {FC} from "react";
import {IoIosArrowDown} from "react-icons/io";

type Props = {
  isOpen: boolean,
  size: number
}

export const AccordionToggleIcon: FC<Props> = ({ isOpen, size }) => {
  return (
    <div style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
      <IoIosArrowDown size={size} color="var(--secondary-color)"/>
    </div>
  );
};