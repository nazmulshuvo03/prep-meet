import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LANGUAGE_DATA from "../../assets/data/languages.json";
import COUNTRY_DATA from "../../assets/data/countries.json";
import { PersonCard } from "../../components/Cards/PersonCard";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { RangeSlider } from "../../components/Slider/RangeSlider";

const EXPERIENCE_MIN_VALUE = 0;
const EXPERIENCE_MAX_VALUE = 20;

export const AllPeople = ({
  queries = {},
  handleQuerySelect = () => {},
  handleResetQuery = () => {},
  minExp = EXPERIENCE_MIN_VALUE,
  maxExp = EXPERIENCE_MAX_VALUE,
  handleExperienceSelect = () => {},
}) => {
  const people = useSelector((state) => state.user.people);
  const professions = useSelector((state) => state.profession.items);

  console.log("@@@@@@@@", typeof people);

  return (
    <div className="py-2">
      <div className="flex justify-between items-center pb-4">
        <div className="flex gap-2">
          <Dropdown
            name={"profession"}
            value={queries["profession"] || ""}
            options={professions}
            onSelect={handleQuerySelect}
            defaultText={"Filter by Profession"}
          />
          <Dropdown
            name={"language"}
            value={queries["language"] || ""}
            options={LANGUAGE_DATA}
            onSelect={handleQuerySelect}
            defaultText={"Filter by Language"}
          />
          <Dropdown
            name={"country"}
            value={queries["country"] || ""}
            options={COUNTRY_DATA}
            onSelect={handleQuerySelect}
            defaultText={"Filter by Country"}
          />
        </div>
        <div>
          <Button onClick={handleResetQuery}>Reset</Button>
        </div>
      </div>
      <div className="w-60">
        <RangeSlider
          label="Filter by years of experience"
          lowerValue={minExp}
          upperValue={maxExp}
          handleChange={handleExperienceSelect}
          min={EXPERIENCE_MIN_VALUE}
          max={EXPERIENCE_MAX_VALUE}
        />
      </div>
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