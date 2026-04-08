import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useSearchParams} from "react-router-dom";
import {coinURL, routes} from "../../utils/constants";
import {InvestmentPlanLayout} from "../profile/myPortfolio/InvestmentPlanLayout.tsx";
import {CardContainer} from "../reusable/CardContainer.tsx";
import {AssetTable} from "../reusable/AssetTable.tsx";
import {AssetGraphPieChart} from "../graphs/asset/AssetGraphPieChart.tsx";
import {AssetSimpleGraph} from "../graphs/asset/AssetSimpleGraph.tsx";
import {getBinanceIndexAssetRecomBestPrevious} from "../../utils/api/GraphsService.ts";
import {BinanceIndexAssetRecomBestPreviousType} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {RecommendationGraphEnum} from "../../utils/enums/RecommendationGraphEnum.tsx";
import {TableColumn} from "../../utils/types/TableColumn.ts";
import {AssetType} from "../../utils/types/asset/AssetType.ts";
import {truncateText} from "../../utils/functions/functions.ts";
import {useInfiniteScroll} from "../../utils/hooks/useInfiniteScroll.ts";
import {NextStepButton} from "../reusable/NextStepButton.tsx";
import {FiEdit2, FiPlus} from "react-icons/fi";
import {IoIosClose,} from "react-icons/io";
import {Button} from "../reusable/Button.tsx";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import {SearchBar} from "../reusable/SearchBar.tsx";
import Lottie from "lottie-react";
import successAnim from "../../assets/success.json";
import {useMyPortfolioContext} from "../../utils/providers/MyPortfolioProvider.tsx";
import {AvailableCoinType} from "../../utils/types/myPortfolio/availableCoinType.ts";
import {CustomModal} from "../reusable/CustomModal.tsx";
import {useInvestmentPlanContext} from "../../utils/providers/InvestmentPlanProvider.tsx";
import {ToastColor, useToast} from "../../utils/providers/ToastProvider.tsx";
import {Assets} from "../../utils/types/asset/AssetDetailType.ts";

export const NewPortfolioComponent: FC = () => {
    const { t } = useTranslation();
    const currentStep = 0;
    const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    // const [data, setData] = useState<BinanceIndexAssetRecomBestPreviousType[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const initialOrderType = (searchParams.get("orderBy") as RecommendationGraphEnum) || RecommendationGraphEnum.CMC_RANK;
    const initialSortDirection = (searchParams.get("direction") as 'asc' | 'desc') || 'asc';
    const initialSearchQuery = searchParams.get("searchQuery") || "";
    const initialIncludeCurrencies = searchParams.get("includeCurrencies")
        ? searchParams.get("includeCurrencies")!.split("|")
        : [];
    const [orderType, setOrderType] = useState<RecommendationGraphEnum>(initialOrderType);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
    const [includeCurrencies, setIncludedCurrencies] = useState<string[]>(initialIncludeCurrencies);
    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
    const [selectedRowId, setSelectedRowId] = useState<number | string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({totalPages, loading, root: scrollContainer});
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [portfolioName, setPortfolioName] = useState<string>("New Portfolio");
    const [invalidAllocation, setInvalidAllocation] = useState(false);
    const [showPortfolioModal, setShowPortfolioModal] = useState(false);
    const [showFinalModal, setShowFinalModal] = useState(false);

    const {
        availableCoins,
        name,
        setName: setContextName,
        asset,
        setAsset: setContextAsset,
        saveChanges,
        isLoading: isSaving
    } = useMyPortfolioContext();

    const {
        setIsCustomPortfolio,
        setUserPortfolioId,
        setBinanceAssetId
    } = useInvestmentPlanContext();

    const { showToast } = useToast();

    const handleClosePortfolioModal = () => setShowPortfolioModal(false);
    const handleShowPortfolioModal = () => setShowPortfolioModal(true);
    const handleCloseFinalModal = () => setShowFinalModal(false);
    const handleShowFinalModal = () => setShowFinalModal(true);

    const getMarketCapValue = (item: any) => {
        const rawValue = item?.marketCap ?? item?.marketcap ?? 0;
        return Number.isFinite(rawValue) ? rawValue : 0;
    };

    const sortedAvailableCoins = useMemo(() => {
        return [...availableCoins].sort((a, b) => getMarketCapValue(b) - getMarketCapValue(a));
    }, [availableCoins]);

    const sortedSelectedAssets = useMemo(() => {
        return [...asset].sort((a, b) => getMarketCapValue(b) - getMarketCapValue(a));
    }, [asset]);

    const formatMarketCap = (value?: number) => {
        const normalized = Number.isFinite(value as number) ? (value as number) : 0;
        return `${normalized.toLocaleString("cs-CZ", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €`;
    };

    const simpleColumns: TableColumn<AvailableCoinType>[] = [
        {
            key: "name",
            header: t("Title"),
            classNameRow: "table-cell-name-long",
            classNameHeader: "table-header-cell-name-long",
            render: a => {
                return (
                    <div style={{display: "flex", alignItems: "center"}} className={"simple-asset-table-crypto-logos-container gap-3"}>
                        <div className="crypto-logo">
                            <img src={`${coinURL}/${a.photo}`}/>
                        </div>
                        <div>{a.name}</div>
                        <div style={{color: "var(--gray-2-color"}}>{a.symbol}</div>
                    </div>
                )
            }
            // value: a => a.name
        },
        {
            key: "marketCap",
            header: t("Market Capitalisation"),
            classNameRow: "table-cell-name-long",
            classNameHeader: "table-header-cell-name-long",
            render: a => formatMarketCap(getMarketCapValue(a)),
            // value: a => a.name
        },
    ]

    /*const fetchData = useCallback(async (pageToFetch: number, isReset: boolean = false) => {
        if (isFetchingRef.current) return;
        if (!isReset && pageToFetch > totalPages) return;

        isFetchingRef.current = true;
        setLoading(true);
        try {
            const res = await getBinanceIndexAssetRecomBestPrevious(
                orderType,
                pageToFetch,
                sortDirection,
                { includeCurrencies, searchQuery }
            );

            if (res && res.data) {
                setData((prev) => (isReset ? res.data.data : [...prev, ...res.data.data]));
                setTotalPages(res.data.totalPages);
                console.log(res.data);
            }
        } catch (e) {
            console.error("Error fetching recommendations:", e);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [orderType, sortDirection, includeCurrencies, searchQuery, totalPages]);*/

    /*useEffect(() => {
        resetPage();
        fetchData(1, true);
    }, [orderType, sortDirection, searchQuery]);

    // load more pages
    useEffect(() => {
        if (currentPage === 1 || currentPage > totalPages) return;

        setLoadingPage(true);
        fetchData(currentPage, false)
            .finally(() => {
                setLoadingPage(false);
            });
    }, [currentPage]);*/

    const handleRowClick = (asset: AvailableCoinType) => {
        const id = asset.id;

        setSelectedRowIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(existingId => existingId !== id);
            }
            else {
                return [...prevIds, id];
            }
        })
    }

    const handleAllocationChange = (id: number, value: string) => {
        const numValue = value === "" ? 0 : parseFloat(value);

        setContextAsset(prevAssets =>
            prevAssets.map(asset => {
                if (asset.id === id) {
                    return { ...asset, allocation: numValue };
                }

                return asset;
            })
        );
    }

    const handleRemoveAsset = (symbol: string) => {
        setContextAsset(prevAssets =>
            prevAssets.filter(asset => asset.asset_label !== symbol)
        );
    }

    useEffect(() => {
        let sum = 0;
        asset.map(asset => sum += asset.allocation);

        sum != 100 ? setInvalidAllocation(true) : setInvalidAllocation(false);
    }, [asset]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setSearchParams(prev => {
            if (value) prev.set("searchQuery", value);
            else prev.delete("searchQuery");
            return prev;
        });
    };

    const addAssets = () => {
        const selectedItems = availableCoins.filter(item => selectedRowIds.includes(item.id));

        const newAssets: Assets[] = selectedItems.map(item => ({
            id: item.id,
            asset_label: item.symbol,
            name: item.name,
            allocation: 1,
            photo: item.photo,
            marketCap: getMarketCapValue(item)
        }));

        setContextAsset(prevAssets => {
            const uniqueNewAssets = newAssets.filter(newAsset =>
                !prevAssets.some(existing => existing.asset_label === newAsset.asset_label)
            );

            return [...prevAssets, ...uniqueNewAssets];
        });

        console.log(selectedItems);

        setSelectedRowIds([]);
        handleClosePortfolioModal();
    }

/*    const createPortfolio = async () => {
        if (invalidAllocation) return;

        setContextName(portfolioName);
        const assetsForContext = asset.map(item => ({
            id: item.id,
            name: item.name,
            asset_label: item.asset_label,
            photo: item.photo,
            allocation: item.allocation / 100,
        }));
        setContextAsset(assetsForContext);

        const response = await saveChanges();

        setIsCustomPortfolio(true);
        setBinanceAssetId(null);

        if (response.data && response.data.data && response.data.data.id) {
            setUserPortfolioId(response.data.data.id);
        } else {
            console.warn("Nezabudni priradiť ID nového portfólia do setUserPortfolioId()");
        }

        handleShowFinalModal();
    }*/

    const createPortfolio = async () => {
        if (invalidAllocation) return;

        // 1. Uložíme si pôvodné hodnoty (celé čísla), aby sme ich vedeli vrátiť
        const originalAssets = [...asset];

        // 2. Prevedieme na desatinné čísla pre DB
        const decimalAssets = asset.map(item => ({
            ...item,
            allocation: item.allocation / 100,
        }));

        // 3. Nastavíme desatinné čísla do kontextu, aby ich saveChanges videl
        setContextAsset(decimalAssets);

        showToast(t("Saving portfolio..."), ToastColor.gold);

        try {
            const response = await saveChanges();

            if (response && (response.status === 200 || response.status === 201)) {
                showToast(t("Portfolio saved successfully"), ToastColor.green);

                setIsCustomPortfolio(true);
                setBinanceAssetId(null);
                if (response.data?.data?.id) setUserPortfolioId(response.data.data.id);

                handleShowFinalModal();
            }
        } catch (error) {
            showToast(t("Error while saving portfolio, please try again"), ToastColor.red);
        } finally {
            // 5. 🟢 KĽÚČOVÝ KROK: Vrátime pôvodné celé čísla späť do UI
            // Použijeme pôvodnú premennú, aby sme sa vyhli opätovnému deleniu/násobeniu
            setContextAsset(originalAssets);
        }
    }

    useEffect(() => {
        setContextName(portfolioName);
    }, []);

    return (
        <>
            <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
                <h3 style={{marginBottom: "-15px"}}>{t("Create New Portfolio")}</h3>
                <Link to={routes.profile.newInvestmentPlanExistingPortfolio} className="link-underline">{t("Choose from Existing Portfolios instead")}</Link>

                <CardContainer
                    color="var(--tertiary-color)"
                    style={{marginBottom: "5px", border: invalidAllocation ? "2px solid var(--red-on-primary-color)" : "2px solid transparent"}}
                >
                    <div style={{display: "flex", alignItems: "center"}}>
                        <input
                            type="text"
                            className="form-control borderless"
                            value={name}
                            onChange={(e) => setContextName(e.target.value)}
                            style={{fontSize: "20px", width: "70%"}}
                        />
                        <FiEdit2 style={{marginLeft: "15px"}} size={25} color={"var(--secondary-color)"} />
                    </div>
                    <div style={{color: "var(--gray-2-color"}}>{t("Name")}</div>

                    {/* Show selected assets */}
                    <div className={"asset-table style-2 mt-3"}>
                        <div className="table-header-row d-flex align-items-stretch fw-bold">
                            <div className={`table-header-cell table-header-cell-name-long`}>
                                {t("Name")}
                            </div>
                            <div className={`table-header-cell table-header-cell-name-long`}>
                                {t("Allocation")}
                            </div>
                        </div>

                        <div className="asset-table-body">
                            {sortedSelectedAssets.map(asset => (
                                <>
                                    <div key={asset.id} className={`table-row d-flex align-items-stretch`}>
                                        {/* Logo, name, symbol */}
                                        <div className={"table-cell table-cell-name-long"}>
                                            <img
                                                src={`${coinURL}/${asset.photo}`}
                                                style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                                            />
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <p style={{margin: "0 15px 0 0"}}>{asset.name}</p>
                                                <p style={{margin: 0, color: "var(--gray-2-color"}}>{asset.asset_label}</p>
                                            </div>
                                        </div>

                                        {/* Allocation input */}
                                        <div className="d-flex align-items-center gap-2" style={{ justifyContent: "flex-end" }}>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={asset.allocation}
                                                onChange={(e) => handleAllocationChange(asset.id, e.target.value)}
                                                className="form-control borderless"
                                                style={{ width: "50px", textAlign: "end" }}
                                            />
                                            <span className="">%</span>
                                        </div>

                                        {/* Delete button */}
                                        <div style={{ width: "40px", display: "flex", justifyContent: "flex-end" }}>
                                            <button
                                                className="btn btn-link p-0"
                                                onClick={() => handleRemoveAsset(asset.asset_label)}
                                            >
                                                <IoIosClose size={30} color={"var(--secondary-color)"} />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                    {/* Add new button */}
                    <div className={"d-flex justify-content-center mt-3"}>
                        <button
                            className="btn btn-no-outline p-0"
                            onClick={handleShowPortfolioModal}
                        >
                            <div className={"d-flex align-items-center gap-2"}>
                                <FiPlus size={23} />
                                <span style={{fontSize: "20px"}}>{t("Add new")}</span>
                            </div>
                        </button>
                    </div>

                </CardContainer>
                <div style={{marginLeft: "30px", color: invalidAllocation ? "var(--red-on-primary-color" : "transparent"}}>{t("Allocation must be 100% in total.")}</div>

                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: "30px"}}>
                    <Button disabled={invalidAllocation} onClick={createPortfolio}>{t("Create")}</Button>
                </div>
            </InvestmentPlanLayout>

            {/* Portfolio Modal */}
            <Modal
                show={showPortfolioModal}
                onHide={handleClosePortfolioModal}
                size="lg"
                centered
                contentClassName="custom-modal"
                backdropClassName="custom-backdrop"
            >
                <Modal.Header className="custom-modal-header">
                    <Modal.Title>{t("Select Assets")}</Modal.Title>
                    <div className="ms-auto me-3">
                        <SearchBar value={searchQuery} onChange={handleSearchChange} />
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <div className="scrollable-table-container" ref={setScrollContainer}>
                        {availableCoins.length > 0 ? (
                            <>
                                <AssetTable
                                    data={sortedAvailableCoins}
                                    columns={simpleColumns}
                                    className={"style-2"}
                                    onRowClick={handleRowClick}
                                    getRowId={(row) => row.id}
                                    activeRowIds={selectedRowIds}
                                />

                                {loadingPage && (
                                    <div className="text-center p-3" style={{ color: "var(--gray-1-color)" }}>
                                        Loading...
                                    </div>
                                )}

                            </>
                        ) : (
                            loading ?
                                <div className="text-center p-5 no-data-found">{t("Loading data...")}</div> :
                                <div className="text-center p-5 no-data-found">{t("No data found")}</div>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer className="custom-modal-footer">
                    <Button onClick={addAssets}>{t("Add")}</Button>
                </Modal.Footer>
            </Modal>

            {/* Final modal */}
            <CustomModal title={`Portfolio ${portfolioName} created`} type={'success'} showModal={showFinalModal} closeModal={handleCloseFinalModal}>
                <NextStepButton currentStep={currentStep} currentStepFinished={!invalidAllocation} link={routes.profile.newInvestmentPlanRecurringInvestment} />
            </CustomModal>
        </>
    );
}





