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
import { MultiInputDropdown } from "../Dropdown/MultiInputDropdown";

export const PersonalAccount = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professionDropdownOptions = useSelector(
    (state) => state.profession.professionKeyPairs
  );
  const [skillOptions, setSkillOptions] = useState();
  const [expTypsOptions, setExpTypsOptions] = useState();

  const [state, setState] = useState({
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    gender: "",
    photoURL: "",
    linkedInProfile: "",
    profileHeadline: "",
    country: "",
    language: "",
    timezone: "",
    targetProfessionId: "",
    targetProfession: "",
    focusAreas: [],
    typesOfExperience: [],
    rolesOfInterest: null,
    stageOfInterviewPrep: null,
    workExperiences: null,
    education: null,
    companiesOfInterest: null,
    interviewExperience: null,
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

  useEffect(() => {
    if (
      professionDropdownOptions &&
      professionDropdownOptions.length &&
      state.targetProfessionId
    ) {
      const selectedProfession = professionDropdownOptions.filter(
        (option) => option.key === state.targetProfessionId
      )[0];
      if (selectedProfession) {
        setSkillOptions(selectedProfession.skills);
        setExpTypsOptions(selectedProfession.experienceTypes);
      }
    }
  }, [professionDropdownOptions, state.targetProfessionId]);

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
              <div className="py-2">
                <Input
                  placeholder={"User Name"}
                  name={"userName"}
                  value={state.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between gap-4">
                <div>{state.email}</div>
                <Dropdown
                  // label={"Language"}
                  name={"language"}
                  value={state.language}
                  options={LANGUAGE_DATA}
                  onSelect={handleChange}
                  defaultText="Language"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <Dropdown
              label={"Target Profession"}
              name={"targetProfessionId"}
              value={state.targetProfessionId}
              options={professionDropdownOptions}
              onSelect={handleChange}
              defaultText="Select an option"
            />
          </div>
          <div className="flex gap-4 justify-between">
            <MultiInputDropdown
              label="Focus Areas"
              name="focusAreas"
              value={state.focusAreas}
              options={skillOptions}
              onSelect={handleChange}
              defaultText={"Select upto 5"}
            />
            <MultiInputDropdown
              label="Types of Experience"
              name="typesOfExperience"
              value={state.typesOfExperience}
              options={expTypsOptions}
              onSelect={handleChange}
              defaultText={"Select upto 5"}
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
          <div className="flex justify-center items-center">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
