export const FilterBySearch = (state, data) => {
  return state.searchText === ""
    ? data
    : data.filter((user) =>
        user.name.toLowerCase().includes(state.searchText.toLowerCase())
      );
};

export const handleSelectedPage = (number, totalUsers, adminDispatch) => {
  const lastIndex = number * 10 <= totalUsers ? number * 10 : totalUsers;
  const firstIndex = (number - 1) * 10 + 1;
  adminDispatch({
    type: "SET_PAGE",
    payload: {
      number,
      firstIndex,
      lastIndex,
    },
  });
};

export const getAllRowsSelected = (adminState) => {
  const startingRow = adminState.indexOfFirst - 1;
  const endingRow = adminState.indexOfLast;

  const selectedRows = adminState?.users.slice(startingRow, endingRow);
  return selectedRows.every((user) => user.isChecked);
};

export const DeleteAllSelectedUsers = (users, adminDispatch) => {
  adminDispatch({ type: "DELETE_ALL", payload: { users } });
};

export const handlePreviousPage = (
  totalUsers,
  currentPage,
  indexOfFirst,
  adminDispatch
) => {
  const firstIndex = indexOfFirst - 10;
  const lastIndex =
    (currentPage - 1) * 10 <= totalUsers ? (currentPage - 1) * 10 : totalUsers;
  adminDispatch({
    type: "SET_PAGE",
    payload: { number: currentPage - 1, firstIndex, lastIndex },
  });
};

export const handleNextPage = (
  totalUsers,
  currentPage,
  indexOfLast,
  indexOfFirst,
  adminDispatch
) => {
  const lastIndex =
    indexOfLast + 10 <= totalUsers ? indexOfLast + 10 : totalUsers;
  const firstIndex = indexOfFirst + 10;

  console.log({ currentPage, lastIndex, firstIndex, totalUsers });
  adminDispatch({
    type: "SET_PAGE",
    payload: { number: currentPage + 1, firstIndex, lastIndex },
  });
};

export const handleJumpToFirstPage = (totalUsers, adminDispatch) => {
  const firstIndex = 1;
  const lastIndex = 10 <= totalUsers ? 10 : totalUsers;
  adminDispatch({
    type: "SET_PAGE",
    payload: { number: 1, firstIndex, lastIndex },
  });
};

export const handleJumpToLastPage = (totalUsers, totalPages, adminDispatch) => {
  const firstIndex = (totalPages - 1) * 10 + 1;
  const lastIndex =
    totalPages * 10 <= totalUsers ? totalPages * 10 : totalUsers;
  adminDispatch({
    type: "SET_PAGE",
    payload: { number: totalPages, firstIndex, lastIndex },
  });
};
