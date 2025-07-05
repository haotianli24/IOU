import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogIn, LayoutDashboard, Users, History, UserIcon } from "lucide-react"; // Added relevant icons
import logo from "../../assets/iou_blue.png";
import { auth } from "../../../firebase";
import { User } from "firebase/auth";

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white text-gray-800 py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-14 w-auto" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-8">
            {[
              { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
              { path: "/social", label: "Social", icon: <Users /> },
              { path: "/history", label: "History", icon: <History /> },
            ].map((tab) => (
              <li key={tab.path}>
                <NavLink
                  to={tab.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-xl flex items-center space-x-2 transition-colors ${
                      isActive
                        ? "bg-teal text-white shadow-md"
                        : "hover:bg-teal/20 text-gray-800"
                    }`
                  }
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {user ? (
          <Link
            to="/profile" // Directs to the profile page
            className="flex items-center space-x-2 bg-teal text-white text-xl px-4 py-2 rounded-md hover:bg-darker-blue transition-colors"
          >
            <UserIcon size={20} /> {/* User icon */}
            <span>Profile</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-2 bg-middle-blue text-white px-4 py-2 rounded-md hover:bg-darker-blue transition-colors"
          >
            <LogIn size={20} />
            <span>Login</span>
          </Link>
        )}


      </div>
    </header>
  );
}
