import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {ChachedDataType} from "../../utils/types/ChachedDataType.ts";
import {FaRegTrashAlt} from "react-icons/fa";
import {deleteChachedData, downloadFile, getAllChachedData} from "../../utils/api/chachedDataAPI.ts";
import {TableLogSkeleton} from "../../components/admin/TableLogSkeleton.tsx";
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";

export const AdminChachedData:FC = () => {
    const { t } = useTranslation();
    const [logs, setLogs] = useState<ChachedDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchChachedData = async () => {
            setLoading(true);
            try {
                const response = await getAllChachedData();
                if (!response) return;
                setLogs(response.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchChachedData();
    }, []);

    const handleDownload = async (name: string) => {
        try {
            const response = await downloadFile(name);
            if (response !== undefined && response.status === 200) {
                const jsonString = JSON.stringify(response.data, null, 2);
                const blob = new Blob([jsonString], { type: "application/json" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Failed to download chached data"),
            });
            console.error("Error downloading chached data:", error);
        }
    };

    
    const handleDelete = async (name: string) => {
        try {
            const response = await deleteChachedData(name);
            if (response !== undefined && response.status === 200) {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Chached data deleted"),
                    text: t("Chached data deleted successfully"),
                });
                setLogs(logs.filter(item => item.name !== name));
            }
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Failed to delete chached data"),
            });
            console.error("Error deleting chached data:", error);
        }
    }

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
                                    <h1 className="card-title">{t("Chached data")}</h1>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>{t("Filename")}</th>
                                                <th>{t("Created")}</th>
                                                <td>{t("Action")}</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {logs.map((log) => (
                                                <tr key={log.name}>
                                                    <td><Button color={ButtonColor.transparent} onClick={() => handleDownload(log.name)}>{log.name}</Button></td>
                                                    <td>{toCzechDateFormat(log.created_at)}</td>
                                                    <td><Button color={ButtonColor.red} onClick={() => handleDelete(log.name)}><FaRegTrashAlt /></Button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}