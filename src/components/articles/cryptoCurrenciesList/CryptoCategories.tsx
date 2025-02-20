import {FC, useEffect, useState} from "react";
import {CategoryType} from "../../../utils/types/CategoryType.ts";
import {getAllCategories} from "../../../utils/api/CryptocurrencyService.ts";
import {CryptoCategoriesSkeleton} from "../CryptoCategoriesSkeleton.tsx";

export const CryptoCategories:FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);
    
    return (
        categories  ? (
            categories.map((category) => (
                <div className="blog__writer" style={{marginTop: 50}}>
                    <div className="blog__writer-designation">
                        <div>
                            <strong>{category.name}</strong>
                            <span style={{marginLeft: 10}}>{category.currencies}</span>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <CryptoCategoriesSkeleton />
        )
    );
};