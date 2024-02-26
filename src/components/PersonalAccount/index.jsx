import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Input";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { ProfileImage } from "../ProfileImage";
import { RadioButtonGroup } from "../RadioButtonGroup";
import { TextInput } from "../TextInput";
import { MultiInputDropdown } from "../Dropdown/MultiInputDropdown";
import { WorkExperience } from "./WorkExperience";
import COUNTRY_DATA from "../../assets/data/countries.json";
// import TIMEZONE_DATA from "../../assets/data/timezones.json";
import GENDER_DATA from "../../assets/data/genders.json";
import LANGUAGE_DATA from "../../assets/data/languages.json";
import { updateUserData } from "../../store/middlewares/user";
import { Education } from "./Education";

export const PersonalAccount = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professions = useSelector((state) => state.profession.items);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );
  const companies = useSelector((state) => state.static.companies);
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
    targetProfessionId: null,
    targetProfession: "",
    focusAreas: [],
    typesOfExperience: [],
    experienceLevel: null,
    preparationStage: null,
    companiesOfInterest: [],
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
    if (professions && professions.length && state.targetProfessionId) {
      const selectedProfession = professions.filter(
        (option) => option.id === state.targetProfessionId
      )[0];
      if (selectedProfession) {
        setSkillOptions(selectedProfession.skills);
        setExpTypsOptions(selectedProfession.experienceTypes);
      }
    }
  }, [professions, state.targetProfessionId]);

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
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <Dropdown
              label={"Target Profession"}
              name={"targetProfessionId"}
              value={state.targetProfessionId || ""}
              options={professions}
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
          <div className="flex gap-4 justify-between">
            <Dropdown
              label={"Experience Level"}
              name={"experienceLevel"}
              value={state.experienceLevel || ""}
              options={experienceLevels}
              onSelect={handleChange}
              defaultText="Select an option"
            />
            <Dropdown
              label={"Preparation Stage"}
              name={"preparationStage"}
              value={state.preparationStage || ""}
              options={preparationStages}
              onSelect={handleChange}
              defaultText="Select an option"
            />
          </div>
          <WorkExperience />
          <Education />
          <MultiInputDropdown
            label="Companies of Interest"
            name="companiesOfInterest"
            value={state.companiesOfInterest}
            options={companies}
            onSelect={handleChange}
            defaultText={"Select upto 5"}
          />
          <div className="flex justify-center items-center">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
