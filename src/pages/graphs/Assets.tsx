import { FC, useEffect, useState } from "react";
import { TitleHeader } from "../../components/modules/about/TitleHeader.tsx";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import { useNavigate } from "react-router-dom";
import { getAllAssets } from "../../api/binanceIndexAssets.ts";
import { AssetType } from "../../utils/types/asset/AssetType.ts";
import { v4 as uuidv4 } from 'uuid';
import { AssetSkeleton } from "../../components/modules/graphs/asset/AssetSkeleton.tsx";
import {pageLimit, routes} from "../../utils/constants";
import {Pagination} from "../../components/Pagiation.tsx";
import {AssetLinkCard} from "../../components/modules/graphs/asset/AssetLinkCard.tsx";

export const Assets: FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [assets, setAssets] = useState<AssetType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getAssets = async () => {
            setLoading(true);
            const response = await getAllAssets(page, pageLimit);
            if (response) {
                setAssets(response.data.data);
                setTotalPages(response.data.totalPages);
            }
            setLoading(false);
        }
        getAssets();
    }, [page]);

    useEffect(() => {
        if (!user) {
            navigate(routes.home);
        }
    }, [user]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
            <TitleHeader title="Assets"/>
            {loading ? (
                <AssetSkeleton />
            ) : (
                <div className="blog padding-top padding-bottom section-bg-color">
                    <div className="container">
                        <div className="blog__wrapper">
                            <div className="row g-4">
                                {assets.map((asset) => (
                                    <AssetLinkCard id={asset.id} label={asset.name} details={asset.label} key={uuidv4()}/>
                                ))}
                            </div>
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
