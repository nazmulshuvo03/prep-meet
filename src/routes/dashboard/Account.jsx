import { useSelector } from "react-redux";

const Account = () => {
  const profile = useSelector((state) => state.user.profile);

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
    </div>
  );
};

export default Account;
