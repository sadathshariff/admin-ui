import "./Table.css";
import { Editable } from "./Editable";
import { useAdmin } from "../../context/adminContext";
import { getAllRowsSelected } from "../../context/utils";
export const Table = () => {
  const { adminDispatch, users, adminState } = useAdmin();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={getAllRowsSelected(adminState)}
                onChange={(e) =>
                  adminDispatch({
                    type: "SELECT_ALL",
                    payload: {
                      checked: e.target.checked,
                      filteredUsers: users,
                    },
                  })
                }
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {users.length !== 0 ? (
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                className={`${user.isChecked ? "selected-row" : ""}`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={user.isChecked}
                    onChange={(e) => {
                      adminDispatch({
                        type: "SELECTED_ROW",
                        payload: { checked: e.target.checked, id: user.id },
                      });
                    }}
                  />
                </td>
                {user.isEdit ? (
                  <Editable userData={user} />
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="action-btns"
                        onClick={() =>
                          adminDispatch({
                            type: "EDIT_USER",
                            payload: user.id,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="action-btns delete-btn"
                        onClick={() =>
                          adminDispatch({
                            type: "DELETE_USER",
                            payload: user.id,
                          })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>No Users Found</td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
};
