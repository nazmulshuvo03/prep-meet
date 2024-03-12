import { useSelector } from "react-redux";
import { PersonCard } from "../../components/PersonCard";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
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
    <div className="py-2 flex flex-col h-full">
      <div className="flex justify-between items-center pb-4">
        <div className="flex w-full gap-2">
          <div className="flex-1 grid grid-cols-5 gap-2">
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
              options={
                targetProfession ? targetProfession.experienceTypes : null
              }
              onSelect={handleQuerySelect}
              defaultText={"Types of Experience"}
              allowSearch={false}
            />
          </div>
          {Object.keys(queries).length ? (
            <div>
              <Button
                onClick={handleResetQuery}
                className={"!bg-transparent !text-gray-500 text-2xl"}
              >
                <FontAwesomeIcon icon={faRotateLeft} />
              </Button>
            </div>
          ) : (
            ""
          )}
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
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {people && people.length && typeof people !== "string"
            ? people.map((person) => (
                <PersonCard key={person.id} data={person} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
