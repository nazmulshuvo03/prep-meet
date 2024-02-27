import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LANGUAGE_DATA from "../../assets/data/languages.json";
import COUNTRY_DATA from "../../assets/data/countries.json";

import { fetchPeople } from "../../store/middlewares/user";
import { PersonCard } from "../../components/Cards/PersonCard";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { RangeSlider } from "../../components/Slider/RangeSlider";
import { setDashboardQuery } from "../../store/slices/global";
import { queryObjectToString } from "../../utils/query";
import { deepEqual, isEmptyObject } from "../../utils/object";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";

const EXPERIENCE_MIN_VALUE = 0;
const EXPERIENCE_MAX_VALUE = 20;

export const People = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const people = useSelector((state) => state.user.people);
  const oldQuery = useSelector((state) => state.global.dashboardQuery);
  const professions = useSelector((state) => state.profession.items);

  const [queries, setQueries] = useState({});
  const [minExp, setMinExp] = useState(EXPERIENCE_MIN_VALUE);
  const [maxExp, setMaxExp] = useState(EXPERIENCE_MAX_VALUE);

  useEffect(() => {
    if (oldQuery) {
      setQueries(oldQuery);
      setMaxExp(oldQuery["yearsOfExperience_lte"]);
      setMinExp(oldQuery["yearsOfExperience_gte"]);
    }
  }, [oldQuery]);

  useEffect(() => {
    if (queries) {
      if (!isEmptyObject(queries) && !deepEqual(queries, oldQuery)) {
        dispatch(setDashboardQuery(queries));
      }
      const queryString = queryObjectToString(queries);
      if (profile) {
        dispatch(fetchPeople(profile.id, queryString));
        history.push(`/dashboard?${queryString}`);
      }
    }
  }, [queries, oldQuery, profile]);

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

  const handleResetQuery = () => {
    setQueries({});
    setMinExp(EXPERIENCE_MIN_VALUE);
    setMaxExp(EXPERIENCE_MAX_VALUE);
    dispatch(setDashboardQuery(""));
  };

  const TABS = [
    {
      id: 1,
      name: "All",
      component: (
        <div>
          <h1>All</h1>
        </div>
      ),
    },
    {
      id: 2,
      name: "Favourites",
      component: (
        <div>
          <h1>Favourites</h1>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="text-4xl font-bold">People</div>
      <div className="pt-6">
        <HorizontalTabs data={TABS} allowSearch />
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
    </div>
  );
};
