export function adminReducer(state, { type, payload }) {
  switch (type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        users: payload.map((user) => ({
          ...user,
          isEdit: false,
          isChecked: false,
        })),
      };
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload ? { ...user, isEdit: true } : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };
    case "SAVE_EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? { ...payload, isEdit: false } : user
        ),
      };
    case "CANCEL_EDIT":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload ? { ...user, isEdit: false } : user
        ),
      };
    case "SELECTED_ROW":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id
            ? { ...user, isChecked: payload.checked }
            : user
        ),
      };
    case "SEARCH_USER":
      return {
        ...state,
        searchText: payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: payload.number,
        indexOfFirst: payload.firstIndex,
        indexOfLast: payload.lastIndex,
      };
    case "SELECT_ALL":
      if (state.searchText) {
        // let remainingUsers = state.users.map(
        //   (user, index) => index > payload.filteredUsers.length
        // );
        // console.log("Remaining", remainingUsers);
        let allUsers = payload.filteredUsers?.map((user, index) =>
          index < state.indexOfLast
            ? { ...user, isChecked: payload.checked }
            : user
        );
        return {
          ...state,
          users: state.users.map((user) =>
            allUsers.find((searched) => searched.id === user.id)
              ? { ...user, isChecked: payload.checked }
              : user
          ),
        };
      } else {
        return {
          ...state,
          users: state.users?.map((user, index) => {
            return index >= state.indexOfFirst - 1 && index < state.indexOfLast
              ? { ...user, isChecked: payload.checked }
              : user;
          }),
        };
      }

    case "DELETE_ALL":
      return {
        ...state,
        users: state.users?.filter(
          (user, index) =>
            !(
              index >= state.indexOfFirst - 1 &&
              index < state.indexOfLast &&
              user.isChecked
            )
        ),
      };
    default:
      return state;
  }
}
