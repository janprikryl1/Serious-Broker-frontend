import {TableColumn} from "../../utils/types/TableColumn.ts";
import {Link} from "react-router-dom";
import {Accordion, AccordionContext, useAccordionButton} from "react-bootstrap";
import React, {useContext} from "react";

type ActiveRowValue = string | number | (string | number)[] | null;

type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    rowLink?: (row: T) => string;
    onRowClick?: (row: T) => void;
    activeRowIds?: ActiveRowValue;
    className?: string;
    useAccordion?: boolean;
    renderDetail?: (row: T) => React.ReactNode;
    getRowId?: (row: T) => string | number;
};

                                                // arrow element           line index
function CustomToggle({ children, eventKey }: { children: React.ReactNode, eventKey: string }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    const { activeEventKey } = useContext(AccordionContext);

    const isCurrentEventKey = Array.isArray(activeEventKey)
        ? activeEventKey.includes(eventKey)
        : activeEventKey === eventKey;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                decoratedOnClick(e);
            }}
            style={{ cursor: "pointer" }}
            className={`accordion-toggle-wrapper ${isCurrentEventKey ? "is-open" : "is-closed"}`}
        >
            {children}
        </div>
    );
}

const isRowActive = (currentId: string | number, activeSelection: ActiveRowValue): boolean => {
    if (activeSelection === null || activeSelection === undefined) {
        return false;
    }

    if (Array.isArray(activeSelection)) {
        return activeSelection.includes(currentId);
    }

    return activeSelection === currentId;
};

export function AssetTable<T>({ data, columns, rowLink, className, useAccordion, renderDetail, onRowClick, activeRowIds, getRowId }: TableProps<T>) {
    return (
        <div className={`asset-table ${className ?? ""}`}>

            {/* Expandable table lines */}
            <Accordion alwaysOpen>

                {/* Header */}
                <div className="table-header-row d-flex align-items-stretch fw-bold">
                    {columns.map(col => (
                        <div
                            key={col.key}
                            className={`table-header-cell ${col.classNameHeader ?? ""}`}
                        >
                            {col.header}
                        </div>
                    ))}
                </div>

                {/* Body */}
                <div className="asset-table-body">
                    {data.map((row, index) => {
                        const eventKey = index.toString();
                        const currentRowId = getRowId ? getRowId(row) : ((row as any).id ?? index);
                        if (!activeRowIds) return;
                        const isActive = isRowActive(currentRowId, activeRowIds);

                        const content = (
                            <div>

                                {/* Table line */}
                                {/*{useAccordion ? }*/}
                                <Accordion.Item eventKey={eventKey} key={index} className={`table-row d-flex align-items-stretch ${isActive ? 'table-row-active' : ''}`}>
                                        {columns.map(col => (
                                            <div
                                                key={col.key}
                                                className={`table-cell ${col.classNameRow ?? ""}`}
                                            >
                                                {col.key === "arrow" ? (
                                                    <CustomToggle eventKey={eventKey}>
                                                        {col.render(row)}
                                                    </CustomToggle>
                                                ) : (
                                                    col.render(row)
                                                )}
                                            </div>
                                        ))}
                                </Accordion.Item>

                                {/* Collapsed content */}
                                <Accordion.Collapse eventKey={eventKey}>
                                    <div className={"accordion-content"}>
                                        {renderDetail ? renderDetail(row) : null}
                                    </div>
                                </Accordion.Collapse>

                            </div>
                        );

                        if (rowLink) {
                            return (
                                <Link key={currentRowId} to={rowLink(row)} className="table-row-link">
                                    {content}
                                </Link>
                            );
                        }

                        if (onRowClick) {
                            return (
                                <div
                                    key={currentRowId}
                                    onClick={() => onRowClick(row)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {content}
                                </div>
                            );
                        }

                        // Default
                        return <div key={currentRowId}>{content}</div>;
                    })}
                </div>
            </Accordion>

        </div>
    );
}