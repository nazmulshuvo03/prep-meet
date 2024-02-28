import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PersonCard } from "../../components/Cards/PersonCard";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
// import { RangeSlider } from "../../components/Slider/RangeSlider";

// const EXPERIENCE_MIN_VALUE = 0;
// const EXPERIENCE_MAX_VALUE = 20;

export const AllPeople = ({
  queries = {},
  handleQuerySelect = () => {},
  handleResetQuery = () => {},
  // minExp = EXPERIENCE_MIN_VALUE,
  // maxExp = EXPERIENCE_MAX_VALUE,
  // handleExperienceSelect = () => {},
}) => {
  const people = useSelector((state) => state.user.people);
  const targetProfession = useSelector(
    (state) => state.profession.targetProfession
  );
  const companies = useSelector((state) => state.static.companies);

  return (
    <div className="py-2">
      <div className="flex justify-between items-center pb-4">
        <div className="flex gap-2">
          <Dropdown
            name={"companiesOfInterest"}
            value={queries["companiesOfInterest"] || ""}
            options={companies}
            onSelect={handleQuerySelect}
            defaultText={"Company of Interest"}
            allowSearch={false}
          />
          <Dropdown
            name={"focusAreas"}
            value={queries["focusAreas"] || ""}
            options={targetProfession ? targetProfession.skills : null}
            onSelect={handleQuerySelect}
            defaultText={"Focus Areas"}
            allowSearch={false}
          />
          <Dropdown
            name={"typesOfExperience"}
            value={queries["typesOfExperience"] || ""}
            options={targetProfession ? targetProfession.experienceTypes : null}
            onSelect={handleQuerySelect}
            defaultText={"Types of Experience"}
            allowSearch={false}
          />
        </div>
        <div>
          <Button onClick={handleResetQuery}>Reset</Button>
        </div>
      </div>
      {/* <div className="w-60">
        <RangeSlider
          label="Filter by years of experience"
          lowerValue={minExp}
          upperValue={maxExp}
          handleChange={handleExperienceSelect}
          min={EXPERIENCE_MIN_VALUE}
          max={EXPERIENCE_MAX_VALUE}
        />
      </div> */}
      <div className="grid grid-cols-3 gap-4">
        {people && people.length && typeof people !== "string"
          ? people.map((person) => (
              <Link
                key={person.id}
                className="flex gap-2"
                to={`/profile/${person.id}`}
              >
                <PersonCard data={person} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};
