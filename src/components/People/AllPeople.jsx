import { useSelector } from "react-redux";
import { PersonCard } from "../../components/PersonCard";
import { Dropdown } from "../../components/Dropdown";
import { NoData } from "../NoData";
// import { RangeSlider } from "../../components/Slider/RangeSlider";

// const EXPERIENCE_MIN_VALUE = 0;
// const EXPERIENCE_MAX_VALUE = 20;

export const AllPeople = ({
  queries = {},
  handleQuerySelect = () => {},
  showFilters = true,
  // minExp = EXPERIENCE_MIN_VALUE,
  // maxExp = EXPERIENCE_MAX_VALUE,
  // handleExperienceSelect = () => {},
  handleResetQuery = () => {},
}) => {
  const people = useSelector((state) => state.user.people);
  const targetProfession = useSelector(
    (state) => state.profession.targetProfession
  );
  const companies = useSelector((state) => state.static.companies);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );

  return (
    <div className="py-2 flex flex-col h-full">
      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-8 gap-2  pb-4">
          <Dropdown
            name={"companiesOfInterest"}
            value={queries["companiesOfInterest"] || ""}
            options={companies}
            onSelect={handleQuerySelect}
            defaultText={"Company"}
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
            defaultText={"Interview Type"}
            allowSearch={false}
          />
          <Dropdown
            name={"experienceLevel"}
            value={queries["experienceLevel"] || ""}
            options={experienceLevels}
            onSelect={handleQuerySelect}
            defaultText={"Target Level"}
            allowSearch={false}
          />
          <Dropdown
            name={"preparationStage"}
            value={queries["preparationStage"] || ""}
            options={preparationStages}
            onSelect={handleQuerySelect}
            defaultText={"Stage of Interviewing"}
            allowSearch={false}
          />
        </div>
      )}
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
      <div className="flex-1 overflow-y-auto">
        {people && people.length && typeof people !== "string" ? (
          <div className="grid grid-cols-1 gap-4">
            {people.map((person) => (
              <PersonCard key={person.id} data={person} />
            ))}
          </div>
        ) : (
          <NoData
            message="Oops! No matches found. Change filters and try again."
            size={120}
          />
        )}
      </div>
    </div>
  );
};
