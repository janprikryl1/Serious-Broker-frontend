import { forwardRef } from "react";

export const CustomHeaderToggle = forwardRef(({ children, onClick }: any, ref: any) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="d-flex align-items-center cursor-pointer"
        style={{ cursor: "pointer" }}
    >
        {children}
    </div>
));