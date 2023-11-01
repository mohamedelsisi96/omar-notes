import { useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";
import { writeNote } from "./../../utils/Note";
import { NoteContext } from "../../Context/NoteContext";
export default function Sidebar({ isMinimized, setIsMinimized }) {
  let navigate = useNavigate();

  let { LogOutUser, token } = useContext(UserContext);
  let { mynotes, setMynotes } = useContext(NoteContext);

  function goLogout() {
    LogOutUser();
    navigate("/login");
  }

  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button
          onClick={() => writeNote({ mynotes, setMynotes })}
          className="btn btn-main text-capitalize w-100 mb-3"
        >
          <i className="fa-solid fa-plus me-2"></i>
          {isMinimized ? "" : "New Note"}
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {isMinimized ? "" : "Home"}
            </NavLink>
          </li>

          <li>
            <span onClick={goLogout} className="pointer">
              <i className="bi bi-box-arrow-left me-2"></i>
              {isMinimized ? "" : "Log Out"}
            </span>
          </li>
          <li></li>
        </ul>
        <div
          className={`${style.change} shadow pointer`}
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <i
            className={`fa-solid ${
              isMinimized ? "fa-chevron-right" : "fa-chevron-left"
            }   `}
          ></i>
        </div>
      </nav>
    </>
  );
}
