import {FC} from "react";
import {v4 as uuidv4} from "uuid";
import {useTranslation} from "react-i18next";

type Props = {
    acceptedFiles: File[];
}

export const ListOfDroppedImages:FC<Props> = ({acceptedFiles}) => {
    const {t} = useTranslation();

    return (
        <aside className="pt-4">
            <h4>{t("File")}:</h4>
            <ul>
                {acceptedFiles.map((file) => (
                    <li key={uuidv4()}>
                        {file.name} - {file.size} {t("bytes")}
                    </li>
                ))}
            </ul>
        </aside>
    )
}