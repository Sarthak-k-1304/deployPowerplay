import { useEffect, useState } from "react";

export const usePaginatedData = (userName, itemsperPage, service, currPage) => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page) => {
    try {
      const offset = (page - 1) * itemsperPage;
      const response = await service.getTable(userName, itemsperPage, offset);
      if (response) {
        setData(response.documents);
        setPages(Math.ceil(response.total / itemsperPage));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currPage);
  }, [currPage]);

  return { data, pages, isLoading };
};

export const useSearchFilter = (data) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = searchQuery
    ? data.filter((item) => {
        const lowerQuery = searchQuery.toLowerCase().trim();

        // Format the date to a searchable string
        const formattedDate = new Date(item.Date)
          .toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toLowerCase()
          .replace(/,/g, "") // Remove commas
          .replace(/\s+/g, " "); // Collapse extra spaces

        // Combine game name and date into a single string
        const combinedString = `${item.Game.toLowerCase()} ${formattedDate}`;

        // Match the entire query as a **single sequence**
        return combinedString.includes(lowerQuery);
      })
    : data;

  return { searchQuery, setSearchQuery, filteredData };
};
