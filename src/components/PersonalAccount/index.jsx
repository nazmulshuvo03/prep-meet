import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Input";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { ProfileImage } from "../ProfileImage";
import { RadioButtonGroup } from "../RadioButtonGroup";
import { TextInput } from "../TextInput";
import COUNTRY_DATA from "../../assets/data/countries.json";
import TIMEZONE_DATA from "../../assets/data/timezones.json";
import GENDER_DATA from "../../assets/data/genders.json";
import LANGUAGE_DATA from "../../assets/data/languages.json";
import { updateUserData } from "../../store/middlewares/user";
import { fetchProfessions } from "../../store/middlewares/profession";

export const PersonalAccount = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professionDropdownOptions = useSelector(
    (state) => state.profession.keyLabelPairs
  );

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    profession: "",
    fieldOfInterest: "",
    currentCompany: "",
    yearsOfExperience: 0,
    photoURL: "",
    gender: "",
    country: "",
    timezone: "",
    profileHeadline: "",
    university: "",
    fieldOfStudy: "",
    degree: "",
    language: "",
  });

  const updateStateFromProfile = (currentState, profileData) => {
    return Object.keys(currentState).reduce((updatedState, key) => {
      updatedState[key] = profileData[key] || currentState[key];
      return updatedState;
    }, {});
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = COUNTRY_DATA.find(
      (option) => option["key"] === selectedValue
    );
    setState((prev) => ({
      ...prev,
      country: selectedOption.key,
      timezone: selectedOption.timezone,
    }));
  };

  const handleSave = () => {
    dispatch(updateUserData(profile.id, state));
  };

  useEffect(() => {
    if (profile) {
      const updatedState = updateStateFromProfile(state, profile);
      setState(updatedState);
    }
  }, [profile]);

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  console.log("account state: ", state);

  return (
    <div className="h-ful w-full px-4 py-2">
      {profile ? (
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-4">
            <ProfileImage />
            <div className="flex-1">
              <div className="flex justify-between gap-4">
                <Input
                  // label={"First Name"}
                  name={"firstName"}
                  value={state.firstName}
                  onChange={handleChange}
                />
                <Input
                  // label={"Last Name"}
                  name={"lastName"}
                  value={state.lastName}
                  onChange={handleChange}
                />
              </div>
              <Dropdown
                label={"Language"}
                name={"language"}
                value={state.language}
                options={LANGUAGE_DATA}
                onSelect={handleChange}
                defaultText="Select an option"
              />
              <div className="flex justify-between">
                <div>{state.email}</div>
                <div>Role: {state.role}</div>
              </div>
            </div>
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
              type={"number"}
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
              options={GENDER_DATA}
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
              onSelect={handleCountryChange}
              defaultText="Select an option"
            />
            <Dropdown
              label={"Timezone"}
              name={"timezone"}
              value={state.timezone}
              options={TIMEZONE_DATA}
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
          <div className="flex justify-center items-center">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
