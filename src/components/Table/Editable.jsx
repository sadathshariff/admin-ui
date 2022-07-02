import { useState } from "react";
import "./Table.css";
import { useAdmin } from "../../context/adminContext";
export const Editable = ({ userData }) => {
  const [userEdit, setUserEdit] = useState(userData);
  const { adminDispatch } = useAdmin();

  return (
    <>
      <td>
        <input
          type="text"
          value={userEdit.name}
          name="name"
          className="input"
          onChange={(e) => setUserEdit({ ...userEdit, name: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          value={userEdit.email}
          name="email"
          className="input"
          onChange={(e) => setUserEdit({ ...userEdit, email: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          value={userEdit.role}
          name="role"
          className="input"
          onChange={(e) => setUserEdit({ ...userEdit, role: e.target.value })}
        />
      </td>
      <td>
        <button
          className="action-btns"
          onClick={() =>
            adminDispatch({ type: "SAVE_EDIT_USER", payload: userEdit })
          }
        >
          Save
        </button>
        <button
          className="action-btns cancel-btn"
          onClick={() =>
            adminDispatch({ type: "CANCEL_EDIT", payload: userEdit.id })
          }
        >
          Cancel
        </button>
      </td>
    </>
  );
};
