import { FC, useEffect, useState } from "react";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import { useNavigate } from "react-router-dom";
import { TitleHeader } from "../../components/modules/about/TitleHeader.tsx";
import { getMostProfitableAssets } from "../../api/binanceIndexAssets.ts";
import { AssetSkeleton } from "../../components/modules/graphs/asset/AssetSkeleton.tsx";
import { AssetCard } from "../../components/modules/graphs/asset/AssetCard.tsx";
import { AssetDetailType } from "../../utils/types/asset/AssetDetailType.ts";
import {pageLimit, routes} from "../../utils/constants";
import {Pagination} from "../../components/Pagiation.tsx";

export const MostProfitableAssets: FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [assets, setAssets] = useState<AssetDetailType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getAssets = async () => {
            setLoading(true);
            const response = await getMostProfitableAssets(page, pageLimit);
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
        <div>
            <TitleHeader title="Most Profitable Assets"/>
            {loading ? (
                <AssetSkeleton />
            ) : (
                <div className="blog padding-top padding-bottom section-bg-color">
                    <div className="container">
                        <div className="blog__wrapper">
                            <div className="row g-4">
                                {assets.map((asset) => (
                                    <AssetCard id={asset.id} label={asset.asset_label} details={asset.index_label} key={asset.id}/>
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
        </div>
    );
};
