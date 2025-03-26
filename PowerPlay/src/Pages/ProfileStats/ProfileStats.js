import { useState } from "react";
import { service } from "../../appwrite/config";
import styles from "./ProfileStats.module.scss";
import { FaFilter } from "react-icons/fa";
import { useAppContext } from "../../Context";
import { usePaginatedData, useSearchFilter } from "./Customhooks";
import { formatDate, getNextPage, getPrevPage } from "./Helperfunction";
export function ProfileStats() {
  const { userName } = useAppContext();
  const [currPage, setCurrPage] = useState(1);
  const itemsperPage = 8;

  const { data, pages, isLoading } = usePaginatedData(
    userName,
    itemsperPage,
    service,
    currPage
  ); // custom hooks

  const { searchQuery, setSearchQuery, filteredData } = useSearchFilter(data); // custom hooks

  const nextPage = () => setCurrPage(getNextPage(currPage, pages));

  const prevPage = () => setCurrPage(getPrevPage(currPage));

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
                    <td>{formatDate(item.Date)}</td>
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
