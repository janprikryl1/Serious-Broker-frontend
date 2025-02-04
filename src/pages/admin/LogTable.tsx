import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TableLogType } from "../../utils/types/TableLogType.ts";
import { getAllLogs } from "../../api/adminService.ts";
import {Pagination} from "../../components/Pagiation.tsx";
import {TableLogSkeleton} from "../../components/modules/admin/TableLogSkeleton.tsx";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";

export const LogTable: FC = () => {
    const { t } = useTranslation();
    const [logs, setLogs] = useState<TableLogType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                const response = await getAllLogs(currentPage);
                if (!response) return;
                setLogs(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchLogs();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (         
        <div className="padding-bottom">
                <div className="service-details__wrapper">
                    <div className="service-details__item">
                        <div className="service-details__item-inner">
                            <div
                                className="service-details__content"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                {loading ? (
                                    <TableLogSkeleton />
                                ) : (
                                    <>
                                        <h1 className="card-title">{t("Table logs")}</h1>
                                        <p className="card-description">{t("Logs for migrating tables")}</p>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>{t("Table")}</th>
                                                    <th>{t("Action")}</th>
                                                    <th>{t("Created")}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {logs.map((log) => (
                                                    <tr key={log.id}>
                                                        <td>{log.id}</td>
                                                        <td>{log.tableName}</td>
                                                        <td>{log.action}</td>
                                                        <td>{toCzechDateFormat(log.created)}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};
