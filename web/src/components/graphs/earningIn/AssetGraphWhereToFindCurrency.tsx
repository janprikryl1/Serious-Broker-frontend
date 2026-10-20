import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
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
        <Accordion id="assetAccordion">
            <Accordion.Item eventKey="0">
                <Accordion.Header className="pb-2">
                    Ve kterých setech se mince vyskytuje?
                </Accordion.Header>
                <Accordion.Body style={{ textAlign: "left" }}>
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
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
