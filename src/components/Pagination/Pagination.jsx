import "./Pagination.css";
import { useAdmin } from "../../context/adminContext";
import {
  handleNextPage,
  handlePreviousPage,
  handleSelectedPage,
} from "../../context/utils";

export const Pagination = () => {
  const { adminState, adminDispatch, users } = useAdmin();
  const { currentPage, indexOfFirst, indexOfLast, searchText } = adminState;
  const totalUsers =
    searchText !== "" ? users?.length : adminState?.users.length;
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / 10);

  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(index);
  }
  return (
    <>
      <div className="pagination-div">
        <button
          onClick={() =>
            handlePreviousPage(
              totalUsers,
              currentPage,
              indexOfFirst,
              adminDispatch
            )
          }
          disabled={currentPage === 1 || totalUsers === 0}
          className="side-btns"
        >
          Prev
        </button>
        <ul className="paginate-list">
          {pageNumbers.map((num) => (
            <li key={num}>
              <button
                onClick={() =>
                  handleSelectedPage(num, totalUsers, adminDispatch)
                }
                className={`${
                  num === currentPage ? "current-page-btn" : ""
                } paginate-btn`}
              >
                {num}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            handleNextPage(
              totalUsers,
              currentPage,
              indexOfLast,
              indexOfFirst,
              adminDispatch
            )
          }
          disabled={currentPage === totalPages || totalUsers === 0}
          className="side-btns"
        >
          Next
        </button>
      </div>
    </>
  );
};
