import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { updateUserData } from "../../redux/user/functions";
import { Dropdown } from "../../components/Dropdown";
import { ProfileImage } from "../../components/ProfileImage";

const Account = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professionDropdownOptions = useSelector(
    (state) => state.profession.keyLabelPairs
  );

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    photoURL: "",
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

  return (
    <div>
      {profile ? (
        <div>
          <ProfileImage />
          <div>
            <Input
              label={"First Name"}
              name={"firstName"}
              value={state.firstName}
              onChange={handleChange}
            />
            <Input
              label={"Last Name"}
              name={"lastName"}
              value={state.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <span>{state.email}</span>
          </div>
          <div>
            <Dropdown
              label={"Profession"}
              name={"profession"}
              value={state.profession}
              options={professionDropdownOptions}
              onSelect={handleChange}
              defaultText="Select an option"
            />
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
