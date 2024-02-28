import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../../store/middlewares/user";
import { setDashboardQuery } from "../../store/slices/global";
import { queryObjectToString } from "../../utils/query";
import { deepEqual, isEmptyObject } from "../../utils/object";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { AllPeople } from "./AllPeople";
import { FavouritePeople } from "./FavouritePeople";

const EXPERIENCE_MIN_VALUE = 0;
const EXPERIENCE_MAX_VALUE = 20;

export const People = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const oldQuery = useSelector((state) => state.global.dashboardQuery);

  const [queries, setQueries] = useState({});
  const [minExp, setMinExp] = useState(EXPERIENCE_MIN_VALUE);
  const [maxExp, setMaxExp] = useState(EXPERIENCE_MAX_VALUE);
  const [searchValue, setSearchValue] = useState();

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

  useEffect(() => {
    if (searchValue && searchValue.length >= 3) {
      setQueries((prev) => ({ ...prev, name: searchValue }));
    } else if (searchValue && searchValue.length == 2) {
      setQueries((prev) => ({ ...prev, name: "" }));
    }
  }, [searchValue]);

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
        <AllPeople
          {...{
            queries,
            handleQuerySelect,
            handleResetQuery,
            minExp,
            maxExp,
            handleExperienceSelect,
          }}
        />
      ),
    },
    {
      id: 2,
      name: "Favourites",
      component: <FavouritePeople />,
    },
  ];

  return (
    <div className="p-6">
      <div className="text-4xl font-bold">People</div>
      <div className="pt-6">
        <HorizontalTabs
          data={TABS}
          allowSearch
          searchValue={searchValue}
          handleSearch={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};
