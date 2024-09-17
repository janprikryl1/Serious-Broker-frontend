import {FC, ReactNode} from "react";

type Props = {
    children: ReactNode;
    image: string;
};

export const Page:FC<Props> = ({children, image}) => {
    return (
        <div style={{position: 'relative', minHeight: '100vh'}}>
            <div
                className="overlay-background"
                style={{
                    backgroundImage: `url(${image})`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.5,
                    zIndex: 1,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div style={{position: 'relative', zIndex: 2}}>
                {children}
            </div>
        </div>
    );
};