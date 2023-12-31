import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { updateUserData } from "../../redux/user/functions";
import { Dropdown } from "../../components/Dropdown";
import { ProfileImage } from "../../components/ProfileImage";
import { RadioButtonGroup } from "../../components/RadioButtonGroup";
import { TextInput } from "../../components/TextInput";
import COUNTRY_DATA from "../../assets/data/countries.json";
import TIMEZONE_DATA from "../../assets/data/timezones.json";

const genderOptions = [
  { key: "male", value: "Male" },
  { key: "female", value: "Female" },
  { key: "not-disclose", value: "Do not want to disclose" },
];

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
    gender: "",
    country: "",
    timezone: "",
    profileHeadline: "",
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

  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = COUNTRY_DATA.find(
      (option) => option["name"] === selectedValue
    );
    setState((prev) => ({
      ...prev,
      country: selectedOption.name,
      timezone: selectedOption.fullZoneName,
    }));
  };

  const handleSave = () => {
    dispatch(updateUserData(profile.id, state));
  };

  console.log("@@@@@@@@@@ state: ", state);

  return (
    <div className="flex items-center justify-center">
      {profile ? (
        <div className="w-3/4">
          <ProfileImage />
          <div className="flex items-center justify-between gap-4">
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
          <div className="p-4">
            <RadioButtonGroup
              label="Gender"
              name={"gender"}
              options={genderOptions}
              selectedOption={state.gender}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Dropdown
              label={"Country"}
              name={"country"}
              value={state.country}
              options={COUNTRY_DATA}
              defaultKey="name"
              defaultLabel="name"
              onSelect={handleCountryChange}
              defaultText="Select an option"
            />
            <Dropdown
              label={"Timezone"}
              name={"timezone"}
              value={state.timezone}
              options={TIMEZONE_DATA}
              defaultKey="fullZoneName"
              defaultLabel="fullZoneName"
              onSelect={handleChange}
              defaultText="Select an option"
            />
          </div>
          <TextInput
            label="Profile Headline (Optional)"
            name={"profileHeadline"}
            placeholder={"Write the headline of your profile"}
            value={state.profileHeadline}
            setValue={handleChange}
          />
          <div>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
