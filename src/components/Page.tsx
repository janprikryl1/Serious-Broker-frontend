import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    image: string;
};

export const Page: FC<Props> = ({ children, image }) => {
    return (
        <div style={{ position: "relative", display: 'flex', flexDirection: 'column',maxHeight: "100%", }}>
            <div
                className="overlay-background"
                style={{
                    backgroundImage: `url(${image})`,
                    position: "absolute",
                    top: "-10%",
                    left: 0,
                    width: "100%",
                    height: "67%",
                    maxHeight: "135vh",
                    opacity: 0.6,
                    zIndex: 1,
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                }}
            />
            <div style={{ position: "relative", zIndex: 2, flex: 1 }}>
                {children}
            </div>
        </div>
    );
};
