import {useState, useCallback} from 'react'

const usePagination = (initialPage: number, limit: number, count: number) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const getMaxPages = useCallback(() => Math.ceil(count / limit), [count, limit]);

  const goToNextPage = () => {
    if((currentPage * limit) <= count) {
        setCurrentPage(currentPage + 1);
    }
  }

  const goToPrevPage = () => {
    if(currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
  }

  const goToPage = (page: number) => {
    if(page > 1 && page < getMaxPages()) {
        setCurrentPage(page);
    }
  }

  return {
    next: goToNextPage,
    prev: goToPrevPage,
    toPage: goToPage,
    currentPage,
    getMaxPages
  } as const;
}

export default usePagination