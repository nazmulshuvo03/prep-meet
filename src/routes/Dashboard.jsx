import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LANGUAGE_DATA from "../assets/data/languages.json";
import COUNTRY_DATA from "../assets/data/countries.json";

import { fetchPeople } from "../store/middlewares/user";
import { PersonCard } from "../components/Cards/PersonCard";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { RangeSlider } from "../components/Slider/RangeSlider";

const EXPERIENCE_MIN_VALUE = 0;
const EXPERIENCE_MAX_VALUE = 20;

const Dashboard = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.user.people);
  const professionDropdownOptions = useSelector(
    (state) => state.profession.keyLabelPairs
  );

  const [queries, setQueries] = useState({});
  const [minExp, setMinExp] = useState(EXPERIENCE_MIN_VALUE);
  const [maxExp, setMaxExp] = useState(EXPERIENCE_MAX_VALUE);

  useEffect(() => {
    if (queries) {
      const queryString = Object.keys(queries)
        .filter((key) => queries[key])
        .map((key) => `${key}=${encodeURIComponent(queries[key])}`)
        .join("&");
      dispatch(fetchPeople(queryString));
    }
  }, [queries]);

  const handleQuerySelect = (e) => {
    const { name, value } = e.target;
    setQueries((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleExperienceSelect = (values, i) => {
    setMaxExp(values[1]);
    setMinExp(values[0]);
    setQueries((prev) => ({
      ...prev,
      yearsOfExperience_lte: values[1],
      yearsOfExperience_gte: values[0],
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <div className="flex gap-2">
          <Dropdown
            name={"profession"}
            value={queries["profession"] || ""}
            options={professionDropdownOptions}
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
          <Button
            onClick={() => {
              setQueries({});
              setMinExp(EXPERIENCE_MIN_VALUE);
              setMaxExp(EXPERIENCE_MAX_VALUE);
            }}
          >
            Reset
          </Button>
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

export default Dashboard;
