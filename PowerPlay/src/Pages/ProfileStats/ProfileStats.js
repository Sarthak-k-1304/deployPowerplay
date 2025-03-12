import { useEffect, useState } from "react";
import { service } from "../../appwrite/config";
import styles from "./ProfileStats.module.scss";
import { FaFilter } from "react-icons/fa";
import { useAppContext } from "../../Context";
export function ProfileStats() {
  const { userName } = useAppContext();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsperPage = 8;

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

  const fetchData = async (page) => {
    try {
      const offset = (page - 1) * itemsperPage;
      const response = await service.getTable(userName, itemsperPage, offset);
      if (response) {
        setData(response.documents);
        console.log(response.total);
        setPages(Math.ceil(response.total / itemsperPage));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(currPage);
  }, [currPage]);

  const nextPage = () => {
    if (currPage < pages) setCurrPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currPage > 1) setCurrPage((prev) => prev - 1);
  };

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.heading}>My Stats</h2>
      <div className={styles.controls}>
        <div className={styles.filterIcon}>
          <FaFilter />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.tableWrapper}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          <table className={styles.statsTable}>
            <thead>
              <tr>
                <th>Game</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Game}</td>
                    <td>{item.Won}</td>
                    <td>{item.Lost}</td>
                    <td>
                      {new Date(item.Date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      borderCollapse: "collapse",
                      textAlign: "center", // Centers text horizontally
                      padding: "1rem", // Adds padding for better spacing
                      color: "red",
                    }}
                  >
                    There is no data to show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.pagination}>
        <span
          className={`${styles.pageNav} ${
            currPage === 1 ? styles.disabled : ""
          }`}
          onClick={prevPage}
        >
          &lt; Prev
        </span>
        <span className={styles.pageInfo}>
          Page {currPage} of {pages}
        </span>
        <span
          className={`${styles.pageNav} ${
            currPage === pages ? styles.disabled : ""
          }`}
          onClick={nextPage}
        >
          Next &gt;
        </span>
      </div>
    </div>
  );
}
