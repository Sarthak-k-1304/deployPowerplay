import { formatDate } from "../Helperfunction";
import { useState } from "react";

export const useSearchFilter = (data) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = searchQuery
    ? data.filter((item) => {
        const lowerQuery = searchQuery.toLowerCase().trim();

        // Format the date to a searchable string
        const formattedDate = formatDate(item.Date)
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
