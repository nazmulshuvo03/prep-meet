import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../../redux/user/functions";

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile(userId));
    }
  }, [profile]);

  return (
    <div>
      <h1>Profile page</h1>
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
    </div>
  );
};

export default Profile;
