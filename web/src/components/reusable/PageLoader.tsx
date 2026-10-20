import {FC, ReactNode, Suspense} from "react";
import {Preloader} from "../../Preloader.tsx";

type Props = {
    children: ReactNode;
}

export const PageLoader:FC<Props> = ({children}) => {
    return (
        <Suspense fallback={<Preloader />}>
            {children}
        </Suspense>
    );
}