import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { adminReducer } from "./adminReducer";
import { FilterBySearch } from "./utils";
const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  const [adminState, adminDispatch] = useReducer(adminReducer, {
    users: [],
    searchText: "",
    currentPage: 1,
    indexOfFirst: 1,
    indexOfLast: 10,
  });

  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (res.status === 200) {
        adminDispatch({ type: "GET_ALL_USERS", payload: res.data });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  const users = FilterBySearch(adminState, adminState.users).slice(
    adminState.indexOfFirst - 1,
    adminState.indexOfLast
  );

  return (
    <AdminContext.Provider value={{ adminState, adminDispatch, users }}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = () => useContext(AdminContext);

export { useAdmin, AdminProvider };
