export const getNextPage = (currPage, totalPages) => {
  return currPage < totalPages ? currPage + 1 : currPage;
};

export const getPrevPage = (currPage) => {
  return currPage > 1 ? currPage - 1 : currPage;
};
export const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const fetchPaginatedData = async (
  page,
  itemsperPage,
  service,
  userName
) => {
  try {
    const offset = (page - 1) * itemsperPage;
    const response = await service.getTable(userName, itemsperPage, offset);
    if (response) {
      return {
        data: response.documents,
        pages: Math.ceil(response.total / itemsperPage),
      };
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { data: [], pages: 0 };
  }
};
