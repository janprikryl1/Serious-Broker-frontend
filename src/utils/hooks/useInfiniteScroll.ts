import { useEffect, useRef, useState, useCallback } from 'react';

type UseInfiniteScrollOptions = {
    totalPages: number;
    loading: boolean;
    threshold?: number;
    rootMargin?: string;
}

export const useInfiniteScroll = ({totalPages, loading, threshold = 1.0, rootMargin = '100px'}: UseInfiniteScrollOptions) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const resetPage = useCallback(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        if (!loaderRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && currentPage < totalPages) {
                    setCurrentPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin, threshold }
        );

        observerRef.current.observe(loaderRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, totalPages, currentPage, rootMargin, threshold]);

    return {
        currentPage,
        loaderRef,
        resetPage
    };
};