import { useEffect, useState } from "react";
import { fetchPaginatedData } from "../Helperfunction";

export const usePaginatedData = (userName, itemsperPage, service, currPage) => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, pages } = await fetchPaginatedData(
        currPage,
        itemsperPage,
        service,
        userName
      );
      setData(data);
      setPages(pages);
      setIsLoading(false);
    };
    fetchData();
  }, [currPage, userName]);

  return { data, pages, isLoading };
};
