import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user/functions";
import { Button } from "../../components/Button";
import { useHistory } from "react-router-dom";

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) => state.user.profile);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    history.push("/");
  };

  return (
    <div>
      <h1>Account page</h1>
      {profile ? (
        <div>
          <div>
            <label>Name</label>
            <span>
              {profile.firstName} {profile.lastName}
            </span>
          </div>
          <div>
            <label>Email</label>
            <span>{profile.email}</span>
          </div>
          <div>
            <label>Profession</label>
            <span>{profile.profession}</span>
          </div>
        </div>
      ) : null}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Account;
