import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { updateUserData } from "../../redux/user/functions";

const Account = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
  });

  const updateStateFromProfile = (currentState, profileData) => {
    return Object.keys(currentState).reduce((updatedState, key) => {
      updatedState[key] = profileData[key] || currentState[key];
      return updatedState;
    }, {});
  };

  useEffect(() => {
    if (profile) {
      const updatedState = updateStateFromProfile(state, profile);
      setState(updatedState);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateUserData(profile.id, state));
  };

  console.log("!!!!!!!!!!!!!", state);

  return (
    <div>
      <h1>Account page</h1>
      {profile ? (
        <div>
          <div>
            <label>Name</label>
            <span>
              {/* {firstName} {lastName} */}
              <Input
                name={"firstName"}
                value={state.firstName}
                onChange={handleChange}
              />
              <Input
                name={"lastName"}
                value={state.lastName}
                onChange={handleChange}
              />
            </span>
          </div>
          <div>
            <label>Email</label>
            <span>{state.email}</span>
          </div>
          <div>
            <label>Profession</label>
            <span>{state.profession}</span>
          </div>
          <div>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
