import { useState, useCallback, useMemo } from 'react'

type Options = {
    initialPage?: number,
    maxCount: number,
    pageSize?: number,
}

const usePagination = ({
    initialPage = 1,
    maxCount,
    pageSize = 20,
}: Options): {
    readonly currentPage: number;
    readonly maxPageNumber: number;
    readonly goToNextPage: () => void;
    readonly goToPrevPage: () => void;
    readonly goToPage: (pageNumber: number) => void;
} => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const maxPageNumber = useMemo(() => Math.ceil(maxCount / pageSize), [pageSize, maxCount]);

    const goToNextPage = useCallback(() => {
        if (currentPage < maxPageNumber) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, maxPageNumber]);

    const goToPrevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage]);

    const goToPage = useCallback((pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= maxPageNumber && currentPage !== pageNumber) {
            setCurrentPage(pageNumber);
        }
    }, [currentPage, maxPageNumber]);

    return {
        currentPage,
        maxPageNumber,
        goToNextPage,
        goToPrevPage,
        goToPage,
    } as const;
}

export default usePagination