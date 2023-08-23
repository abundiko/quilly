import { ThemeContext, themes } from "@/context/ThemeContext";
import Link from "next/link";
import { useContext } from "react";
import {
  FaHome,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaUserAlt
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import AppDropdown from "../AppDropdown";
import { ModalContext } from "@/context/ModalContext";
import LogoutModal from "../modals/LogoutModal";

const Sidebar = () => {
  const themeContext = useContext(ThemeContext);
  const modalContext = useContext(ModalContext);

  function showLogoutModal() {
    modalContext.setModal(<LogoutModal />);
  }

  return (
    <aside className="px-2 py-4 flex flex-col justify-between h-screen fixed top-0">
      <div>
        <Link href="/home" className="dashboard-link mb-2">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link href="/search" className="dashboard-link mb-2">
          <FaSearch />
          <span>Search</span>
        </Link>
        <Link href="/profile" className="dashboard-link mb-2">
          <FaUserAlt />
          <span>Profile</span>
        </Link>
        <Link href="/settings" className="dashboard-link mb-2">
          <IoSettingsSharp />
          <span>Settings</span>
        </Link>
      </div>
      <div>
        <AppDropdown
          title={
            <button className="dashboard-link mb-2 w-full">
              <FaMoon />
              <span>Theme</span>
            </button>
          }
          items={themes}
          onUpdate={e => themeContext.setTheme(e)}
        />
        <button
          className="dashboard-link mb-2 w-full app-text-error"
          onClick={showLogoutModal}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
