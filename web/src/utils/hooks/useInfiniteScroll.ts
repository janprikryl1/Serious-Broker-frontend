import {useEffect, useRef, useState, useCallback, RefObject} from 'react';

type UseInfiniteScrollOptions = {
    totalPages: number;
    loading: boolean;
    threshold?: number;
    rootMargin?: string;
    root?: HTMLDivElement | null;
}

export const useInfiniteScroll = ({totalPages, loading, threshold = 1.0, rootMargin = '100px', root}: UseInfiniteScrollOptions) => {
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
            {
                root: root,
                rootMargin,
                threshold }
        );

        observerRef.current.observe(loaderRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, totalPages, currentPage, rootMargin, threshold, root]);

    return {
        currentPage,
        loaderRef,
        resetPage
    };
};