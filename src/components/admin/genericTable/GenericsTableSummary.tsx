import {FC} from "react";
import {useGenericTablesContext} from "../../../utils/providers/GenericTablesProvider.tsx";
import {Button} from "../../reusable/Button.tsx";
import {useTranslation} from "react-i18next";

export const GenericsTableSummary: FC = () => {
    const {t} = useTranslation();
    const { query, table, uploadQuery, generatedQuery } = useGenericTablesContext();
    
    return (
        <div className="container-fluid mt-3">
            <h3>{t("Summary and SQL Query")}</h3>
            <p><strong>{t("Target table")}:</strong> <code>{table}</code></p>

            <div className="card">
                <div className="card-header">
                    <h4>{t("Generated SQL")}:</h4>
                </div>
                <div className="card-body">
                    <pre
                        style={{
                            backgroundColor: '#282c34',
                            color: '#abb2bf',
                            padding: '15px',
                            borderRadius: '0.25rem',
                            overflowX: 'auto',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                            maxHeight: '300px',
                            overflowY: 'auto'
                        }}
                    >
                        {generatedQuery}
                    </pre>
                </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
                <Button
                    onClick={uploadQuery}
                    disabled={!query || Object.keys(query).length === 0 || !table}
                    className="btn btn-primary"
                >
                    {t("Save query")}
                </Button>
            </div>
        </div>
    );
}