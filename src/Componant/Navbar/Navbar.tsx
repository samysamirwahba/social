import  { useContext, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import Login from "./../../Pages/Login/Login";
export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const { userLogin, setuserLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  function LogOut() {
    localStorage.removeItem("user-token");
    setuserLogin(null);
    navigate("/Login");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Logo
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {userLogin ? (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/Profile"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={LogOut}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/Register"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setisOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isOpen}
            >
              {!isOpen ? <FaBars /> : <IoMdClose />}
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          <div className="flex flex-col gap-4">
            {userLogin ? (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/Profile"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={LogOut}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/Register"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
