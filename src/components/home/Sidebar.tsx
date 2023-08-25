import { ThemeContext, themes } from "@/context/ThemeContext";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useState } from "react";
import {
  FaHome,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaUserAlt
} from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import AppDropdown from "../AppDropdown";
import { ModalContext } from "@/context/ModalContext";
import LogoutModal from "../modals/LogoutModal";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  {
    text: "Home",
    icon: <FaHome />,
    url: "/home"
  },
  {
    text: "Search",
    icon: <FaSearch />,
    url: "/search"
  },
  {
    text: "Profile",
    icon: <FaUserAlt />,
    url: "/user"
  },
  {
    text: "Create",
    icon: <IoPencil />,
    url: "/create"
  }
];

const Sidebar = () => {
  const themeContext = useContext(ThemeContext);
  const modalContext = useContext(ModalContext);

  function showLogoutModal() {
    modalContext.setModal(<LogoutModal />);
  }

  return (
    <aside className="px-2 py-4 flex flex-col justify-between h-screen fixed top-0">
      <div>
        {sidebarLinks.map(item => <SidebarButton {...item} key={item.text} />)}
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

export function SidebarButton({
  text,
  url,
  icon,
  isActive
}: {
  text: string;
  url: string;
  icon?: ReactNode;
  isActive?: boolean;
}) {
  const path = usePathname();
  const [active, setActive] = useState(false);
  useEffect(
    () => {
      setActive(path === url || path === url + "/");
    },
    [path, url]
  );
  return (
    <Link
      href={url}
      className={`dashboard-link mb-2 ${active ||
        (isActive &&
          "border-primary-dark dark:border-primary-light dim:border-primary-light border")}`}
    >
      {icon}
      <span>
        {text}
      </span>
    </Link>
  );
}
