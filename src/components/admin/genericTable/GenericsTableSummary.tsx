import { FC, useState, useRef } from "react";
import { useGenericTablesContext } from "../../../utils/providers/GenericTablesProvider.tsx";
import { Button } from "../../reusable/Button.tsx";
import { useTranslation } from "react-i18next";
import {CiEdit} from "react-icons/ci";

export const GenericsTableSummary: FC = () => {
    const { t } = useTranslation();
    const { query, table, uploadQuery, generatedQuery, setGeneratedQuery } = useGenericTablesContext();
    const [isEditingQuery, setIsEditingQuery] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleEditQueryClick = () => {
        setIsEditingQuery(true);
        setTimeout(() => textareaRef.current?.focus(), 0);
    };

    const handleQueryBlur = () => {
        setIsEditingQuery(false);
    };

    const handleQueryKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setIsEditingQuery(false);
        }
    };

    return (
        <div className="container-fluid mt-3">
            <h3>{t("Summary and SQL Query")}</h3>

            <p><strong>{t("Target table")}:</strong> <code>{table}</code></p>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">{t("Generated SQL")}:</h4>
                    <button
                        onClick={handleEditQueryClick}
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        aria-label={t("Edit SQL")}
                    >
                        <CiEdit />
                    </button>
                </div>
                <div className="card-body">
                    {isEditingQuery ? (
                        <textarea
                            ref={textareaRef}
                            value={generatedQuery}
                            onChange={(e) => setGeneratedQuery(e.target.value)}
                            onBlur={handleQueryBlur}
                            onKeyDown={handleQueryKeyDown}
                            style={{
                                width: "100%",
                                backgroundColor: '#282c34',
                                color: '#abb2bf',
                                padding: '15px',
                                borderRadius: '0.25rem',
                                border: '1px solid #ccc',
                                fontFamily: "monospace",
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                minHeight: '150px',
                                resize: "vertical"
                            }}
                        />
                    ) : (
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
                    )}
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
};
