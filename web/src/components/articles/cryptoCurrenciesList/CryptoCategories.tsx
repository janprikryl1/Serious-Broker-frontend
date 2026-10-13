import {FC, useEffect, useState} from "react";
import {getAllCategories} from "../../../utils/api/CryptocurrencyService.ts";
import {CryptoCategoriesSkeleton} from "../CryptoCategoriesSkeleton.tsx";
import {CategoryType} from "../../../utils/types/asset/CategoryType.ts";

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
        categories ? (
            categories.map((category) => (
                <div key={category.id} className="blog__writer mt-5">
                    <div className="blog__writer-designation">
                        <div>
                            <strong>{category.name}</strong>
                            <span className="ms-2">{category.currencies}</span>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <CryptoCategoriesSkeleton />
        )
    );
};