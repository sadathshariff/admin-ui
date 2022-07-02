import "./App.css";
import { Pagination, Table } from "./components";
import { useAdmin } from "./context/adminContext";
import { DeleteAllSelectedUsers } from "./context/utils";

function App() {
  const { adminState, adminDispatch, users } = useAdmin();

  const handleChange = (e) => {
    adminDispatch({ type: "SEARCH_USER", payload: e.target.value });
    const lastIndex =
      adminState.users?.length >= 10 ? 10 : adminState.users.length % 10;
    adminDispatch({
      type: "SET_PAGE",
      payload: { number: 1, firstIndex: 1, lastIndex },
    });
  };
  return (
    <div className="App">
      <div className="container">
        <div className="main-container">
          <nav className="navbar">
            <input
              type="text"
              value={adminState.searchText}
              placeholder="Search User by Name"
              onChange={(e) => handleChange(e)}
              className="input-search"
            />
            <button
              className="delete-all-btn"
              onClick={() => DeleteAllSelectedUsers(users, adminDispatch)}
            >
              Delete Selected
            </button>
          </nav>
          <Table />
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default App;
