import {FC, useEffect, useState, useRef, useCallback} from "react";
import {getAllCryptocurrencies, getSearchCryptocurrencies} from "../../../utils/api/CryptocurrencyService.ts";
import {CryptoCurrencyType} from "../../../utils/types/asset/CryptoCurrencyType.ts";
import {CryptoCurrenciesSkeleton} from "./CryptoCurrenciesSkeleton.tsx";
import {useInfiniteScroll} from "../../../utils/hooks/useInfiniteScroll.ts";
import "../../../styles/sass/components/crypto_currencies.scss";
import {OutlineContainer} from "../../reusable/OutlineContainer.tsx";
import {SearchBar} from "../../reusable/SearchBar.tsx";
import {coinURL, routes} from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";

const PAGE_SIZE = 52;

export const CryptoCurrencies: FC = () => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const [cryptocurrencies, setCryptocurrencies] = useState<(CryptoCurrencyType & { stylized_image?: string })[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);
  const {currentPage, loaderRef} = useInfiniteScroll({totalPages, loading});

  const fetchData = useCallback(async (reset: boolean = false) => {
    if (isFetchingRef.current || (currentPage > totalPages && !reset)) return;
    isFetchingRef.current = true;
    setLoading(true);
    try {
      const res = searchValue
        ? await getSearchCryptocurrencies(searchValue, reset ? 1 : currentPage, PAGE_SIZE)
        : await getAllCryptocurrencies(reset ? 1 : currentPage, PAGE_SIZE);
      const nextPageData = res.data.data as (CryptoCurrencyType & { stylized_image?: string })[];
      setCryptocurrencies((prev) => (reset ? nextPageData : [...prev, ...nextPageData]));
      setTotalPages(res.data.totalPages || 1);
    } catch (e) {
      console.error("Error fetching cryptocurrencies:", e);
    }
    setLoading(false);
    isFetchingRef.current = false;
  }, [currentPage, searchValue, totalPages]);

  useEffect(() => {
    fetchData(true);
  }, [searchValue]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);


  return (
    <div>
      <div className="d-flex justify-content-center mb-5 mt-5">
        <SearchBar value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "0px",
          padding: "0 15px"
        }}
      >
        {cryptocurrencies.length > 0 ? (
          cryptocurrencies.map((crypto) => (
            <OutlineContainer
              key={crypto.id}
              style={{
                cursor: "pointer",
                margin: "15px",
                borderRadius: "12px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                overflow: "hidden"
              }}
              bgColor={"var(--quaternary-color-transparent-50)"}
              onClick={() => navigate(user
                ? `${routes.graphsRecommendationDetailURL}/${crypto.symbol}`
                : routes.register
              )}
              enableHover={true}
            >
              <img
                src={crypto.stylized_image ? `${coinURL}/${crypto.stylized_image}` : "src/utils/icons/coins/base_gold.png"}
                alt={crypto.name}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: "15px"
                }}
                onError={(e) => (e.currentTarget.src = "/fallback-coin.png")}
              />
              <h4
                style={{
                  marginBottom: "5px",
                  width: "100%",
                  textAlign: "center",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: "0 5px",
                  fontSize: "1.2rem"
                }}
                title={crypto.name}
              >
                {crypto.name}
              </h4>
              <span
                className={"gray-2-color-text"}
                style={{
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                  {crypto.symbol}
              </span>
            </OutlineContainer>
          ))
        ) : (
          <CryptoCurrenciesSkeleton/>
        )}
      </div>

      <div ref={loaderRef} style={{width: "100%", height: "50px", display: "flex", justifyContent: "center"}}>
        {loading && <div className="spinner-border text-light" role="status"></div>}
      </div>
    </div>
  );
};