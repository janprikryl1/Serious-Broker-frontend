import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWhereCoinInAsset } from "../../../utils/api/binanceIndexAssets.ts";
import { routes } from "../../../utils/constants";

export const AssetGraphWhereToFindCurrency: FC = () => {
    const { index_label } = useParams();
    const [whereCoinInAsset, setWhereCoinInAsset] = useState<{ label: string, name: string }[]>();

    useEffect(() => {
        if (index_label === undefined) return;
        (async () => {
            try {
                const response = await getWhereCoinInAsset(index_label);
                if (!response) return;
                setWhereCoinInAsset(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [index_label]);

    return (
        <div className="accordion" id="assetAccordion">
            <div className="accordion-item">
                <h2 className="accordion-header pb-2" id="assetAccordionHeader">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#assetAccordionCollapse"
                        aria-expanded="false"
                        aria-controls="assetAccordionCollapse"
                    >
                        Ve kterých setech se mince vyskytuje?
                    </button>
                </h2>
                <div
                    id="assetAccordionCollapse"
                    className="accordion-collapse collapse"
                    aria-labelledby="assetAccordionHeader"
                    data-bs-parent="#assetAccordion"
                >
                    <div className="accordion-body" style={{ textAlign: "left" }}>
                        {whereCoinInAsset && whereCoinInAsset.length > 0
                            ? whereCoinInAsset.map((item) => (
                                <Link
                                    to={`${routes.assetGraphURL}${item.name}`}
                                    key={item.label}
                                    style={{ display: "block", marginBottom: 8 }}
                                >
                                    <span style={{ fontWeight: "bold" }}>
                                        {item.label}{" "}
                                        <span style={{ fontSize: "0.85em", color: "#888" }}>({item.name})</span>
                                    </span>
                                </Link>
                            ))
                            : <span className="text-muted">Žádné záznamy.</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
