import {FC} from "react";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";
import {GlossaryItemOverview} from "../../reusable/GlossaryItemOverview.tsx";

export const GlossaryOverview:FC = () => {
    const {data} = useIndexDataContext();

    return (
        <GlossaryItemOverview data={data.DYOR} />
    );
};