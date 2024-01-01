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

const languageOptions = [
  { key: "english", label: "English" },
  { key: "french", label: "French" },
  { key: "spanish", label: "Spanish" },
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
    fieldOfInterest: "",
    currentCompany: "",
    yearsOfExperience: "",
    photoURL: "",
    gender: "",
    country: "",
    timezone: "",
    profileHeadline: "",
    university: "",
    fieldOfStudy: "",
    degree: "",
    language: "english",
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
    <div className="flex items-center justify-center w-full h-full">
      {profile ? (
        <div className="w-3/4 flex flex-col gap-4">
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
          <div className="flex gap-4 justify-between items-center">
            <Dropdown
              label={"Current Profession"}
              name={"profession"}
              value={state.profession}
              options={professionDropdownOptions}
              onSelect={handleChange}
              defaultText="Select an option"
            />
            <Dropdown
              label={"Field of interest"}
              name={"fieldOfInterest"}
              value={state.fieldOfInterest}
              options={professionDropdownOptions}
              onSelect={handleChange}
              defaultText="Select an option"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Input
              label={"Current Company"}
              name={"currentCompany"}
              value={state.currentCompany}
              onChange={handleChange}
            />
            <Input
              label={"Years of experience"}
              name={"yearsOfExperience"}
              value={state.yearsOfExperience}
              onChange={handleChange}
            />
          </div>
          <div>
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
          <div className="flex justify-between items-center gap-2">
            <Input
              label={"University"}
              name={"university"}
              value={state.university}
              onChange={handleChange}
            />
            <Input
              label={"Field of study"}
              name={"fieldOfStudy"}
              value={state.fieldOfStudy}
              onChange={handleChange}
            />
            <Input
              label={"Degree"}
              name={"degree"}
              value={state.degree}
              onChange={handleChange}
            />
          </div>
          <div>
            <Dropdown
              label={"Language"}
              name={"language"}
              value={state.language}
              options={languageOptions}
              onSelect={handleChange}
              defaultText="Select an option"
            />
          </div>
          <div className="flex justify-center items-center">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
