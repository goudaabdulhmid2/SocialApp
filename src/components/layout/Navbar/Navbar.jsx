
import {
  Button,
  Avatar,
  Dropdown,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const publicLinks = [
  { label: "Home", to: "/" },
  { label: "Profile", to: "/profile" },
];

const authLinks = [
  { label: "Login", to: "/login", isPrimary: false },
  { label: "Register", to: "/register", isPrimary: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { token, removeToken, removeUsreData} = useContext(AuthContext);

  const handleUserAction = (action) => {
    if (action === "logout") {
      setIsMenuOpen(false);
      removeToken()
      removeUsreData()
      navigate("/login");
      return;
    }

    if (action === "profile") {
      setIsMenuOpen(false);
      navigate("/profile");
    }
  };

  const linkClassName = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-emerald-100 text-emerald-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    ].join(" ");

  const authButtonClassName = (isPrimary) =>
    [
      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
      isPrimary
        ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 hover:bg-emerald-700"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
    ].join(" ");

  const menuActionClassName = (isPrimary) =>
    [
      "inline-flex w-full items-center justify-start rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
      isPrimary
        ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 hover:bg-emerald-700"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900",
    ].join(" ");

  return (
    <header className="border-b border-emerald-100/70 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-inherit">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-200">
            SA
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
              SocialApp
            </span>
            <span className="text-xs text-slate-500">Connect and share</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {token ? (
            <>
              {publicLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClassName}>
                  {item.label}
                </NavLink>
              ))}

              <Dropdown placement="bottom-end">
                <Dropdown.Trigger className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-2 py-1.5 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50">
                  <span className="flex items-center gap-2">
                    <Avatar size="sm" color="success" className="h-9 w-9">
                      <Avatar.Fallback className="text-sm font-semibold">
                        HM
                      </Avatar.Fallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium text-slate-700 lg:inline">
                      Hamid
                    </span>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Popover>
                  <Dropdown.Menu aria-label="User actions">
                    <Dropdown.Item
                      key="profile"
                      onPress={() => handleUserAction("profile")}
                    >
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="logout"
                      className="text-danger"
                      onPress={() => handleUserAction("logout")}
                    >
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </>
          ) : (
            authLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={authButtonClassName(item.isPrimary)}
              >
                {item.label}
              </Link>
            ))
          )}
        </nav>


        <Button
          type="button"
          variant="light"
          className="md:hidden"
          onPress={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-emerald-100 bg-white px-4 pb-4 pt-3 md:hidden">
          <div className="grid gap-2">
            {token ? (
              <>
                {publicLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        "rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-100",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
                  <div className="mb-3 flex items-center gap-3">
                    <Avatar size="sm" color="success" className="h-10 w-10">
                      <Avatar.Fallback className="text-sm font-semibold">
                        HM
                      </Avatar.Fallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Hamid</p>
                      <p className="text-xs text-slate-500">Account menu</p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Button
                      type="button"
                      variant="light"
                      className="w-full justify-start bg-white font-medium text-slate-700"
                      onPress={() => {
                        setIsMenuOpen(false);
                        handleUserAction("profile");
                      }}
                    >
                      My Profile
                    </Button>
                    <Button
                      type="button"
                      variant="solid"
                      className="w-full justify-start bg-rose-600 font-semibold text-white hover:bg-rose-700"
                      onPress={() => {
                        setIsMenuOpen(false);
                        handleUserAction("logout");
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid gap-2 pt-2">
                {authLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={menuActionClassName(item.isPrimary)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
