import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LANGUAGE_DATA from "../../assets/data/languages.json";
import COUNTRY_DATA from "../../assets/data/countries.json";
import TIMEZONE_DATA from "../../assets/data/timezones.json";

import { fetchPeople } from "../../redux/user/functions";
import { PersonCard } from "../../components/Cards/PersonCard";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { RangeSlider } from "../../components/Slider/RangeSlider";

const EXPERIENCE_MIN_VALUE = 0;
const EXPERIENCE_MAX_VALUE = 20;

const Dashboard = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.user.people);
  const professionDropdownOptions = useSelector(
    (state) => state.profession.keyLabelPairs
  );

  const [queries, setQueries] = useState([]);
  const [minExp, setMinExp] = useState(EXPERIENCE_MIN_VALUE);
  const [maxExp, setMaxExp] = useState(EXPERIENCE_MAX_VALUE);

  useEffect(() => {
    if (queries) {
      dispatch(fetchPeople(queries));
    }
  }, [queries]);

  const handleQuerySelect = (e) => {
    setQueries((prev) => {
      const updatedQueries = [...prev];
      const existingIndex = updatedQueries.findIndex(
        (item) => Object.keys(item)[0] === e.target.name
      );

      if (existingIndex !== -1) {
        updatedQueries[existingIndex] = { [e.target.name]: e.target.value };
      } else {
        updatedQueries.unshift({ [e.target.name]: e.target.value, rel: "==" });
      }
      return updatedQueries;
    });
  };

  const handleExperienceSelect = (values, i) => {
    setMaxExp(values[1]);
    setMinExp(values[0]);
    const relations = [">=", "<="];
    setQueries((prev) => {
      const updatedQueries = [...prev];
      for (let j = 0; j <= i; j++) {
        const existingIndex = updatedQueries.findIndex(
          (item) =>
            Object.keys(item)[0] === "yearsOfExperience" &&
            item["rel"] === relations[j]
        );

        if (existingIndex !== -1) {
          updatedQueries[existingIndex] = {
            yearsOfExperience: values[j],
            rel: relations[j],
          };
        } else {
          updatedQueries.unshift({
            yearsOfExperience: values[j],
            rel: relations[j],
          });
        }
      }
      return updatedQueries;
    });
  };

  const getCurrentValue = (label) => {
    if (queries && queries.length) {
      const foundObject = queries.find(
        (item) => Object.keys(item)[0] === label
      );
      return foundObject ? foundObject[label] : "";
    } else return "";
  };

  console.log("!!!!!!!!!!!!!!!!!", queries);

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <div className="flex gap-2">
          <Dropdown
            name={"profession"}
            value={getCurrentValue("profession")}
            options={professionDropdownOptions}
            onSelect={handleQuerySelect}
            defaultText={"Filter by Profession"}
          />
          <Dropdown
            name={"language"}
            value={getCurrentValue("language")}
            options={LANGUAGE_DATA}
            onSelect={handleQuerySelect}
            defaultText={"Filter by Language"}
          />
          <Dropdown
            name={"country"}
            value={getCurrentValue("country")}
            options={COUNTRY_DATA}
            onSelect={handleQuerySelect}
            defaultText={"Filter by Country"}
          />
          <Dropdown
            name={"timezone"}
            value={getCurrentValue("timezone")}
            options={TIMEZONE_DATA}
            onSelect={handleQuerySelect}
            defaultText={"Filter by Timezone"}
          />
        </div>
        <div>
          <Button onClick={() => setQueries([])}>Reset</Button>
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
        {people && people.length
          ? people.map((person) => (
              <Link
                key={person.id}
                className="flex gap-2"
                to={`/dashboard/${person.id}`}
              >
                <PersonCard data={person} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
