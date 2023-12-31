import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user/functions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MenuLink = ({ children }) => (
  <div className="border-t py-3 px-3 font-light text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center">
    {children}
  </div>
);

export const ProfileMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.profile);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    history.push("/");
  };

  return (
    <div className="absolute top-12 right-1 bg-white border shadow-lg min-w-48 rounded-md">
      {user && (
        <div className="px-3 py-3">
          <div className="font-semibold text-lg">
            <span>{user.firstName}</span>
            <span> </span>
            <span>{user.lastName}</span>
          </div>
          <div className="font-light text-xs text-gray-500">{user.email}</div>
        </div>
      )}
      <MenuLink>
        <Link to="/account">Account Settings</Link>
      </MenuLink>
      <MenuLink>
        <Link to="/terms">Terms & Conditions</Link>
      </MenuLink>
      <MenuLink>
        <Link to="/privacy">Privacy Policy</Link>
      </MenuLink>
      <div
        className="bg-red-600 text-slate-50 rounded-t-md h-10 flex justify-center items-center font-semibold text-base shadow-md"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};
