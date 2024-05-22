import { useDispatch, useSelector } from "react-redux";
import { NoData } from "../../NoData";
import { Input } from "../../Input";
import { useEffect, useState } from "react";
import { fetchProfiles } from "../../../store/middlewares/user";
import { uuidShortner } from "../../../utils/string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Label = ({ children = "", colSpan = 1 }) => (
  <div
    className={`col-span-${colSpan} text-ellipsis whitespace-nowrap overflow-hidden`}
  >
    {children}
  </div>
);

export const UserAdmin = () => {
  const dispatch = useDispatch();
  const [allProfile, setAllProfile] = useState();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState();

  const getProfiles = async () => {
    const profiles = await dispatch(fetchProfiles());
    setAllProfile(profiles);
  };

  console.log("!!!!!!!!!!!!", allProfile);

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    if (query && query.length && allProfile) {
      setFilteredData(() =>
        allProfile.filter((item) =>
          item.email.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredData(allProfile);
  }, [query, allProfile]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          className=""
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={"Search by email"}
          icon={<FontAwesomeIcon icon={faSearch} />}
        />
      </div>
      <div className="border border-primary my-2">
        <div className="border border-primary px-2 py-1 grid grid-cols-12 bg-primary text-white">
          <Label>User ID</Label>
          <Label colSpan={3}>Email</Label>
          <Label>Verified</Label>
          <Label>Username</Label>
          <Label>Medium</Label>
          <Label colSpan={2}>Timezone</Label>
          <Label>Unsubscribed</Label>
        </div>
        {filteredData && filteredData.length ? (
          <div className="">
            {filteredData.map((profile) => {
              return (
                <div
                  key={profile.id}
                  className="border border-primary px-2 py-1 grid grid-cols-12 hover:shadow-md"
                >
                  <div className="col-span-1">
                    {uuidShortner(profile.id, 3)}
                  </div>
                  <div className="col-span-3">{profile.email}</div>
                  <div className="col-span-1">
                    {profile.email_verified ? "Yes" : "No"}
                  </div>
                  <div className="col-span-1">{profile.userName}</div>
                  <div className="col-span-1">{profile.authMedium}</div>
                  <div className="col-span-2">{profile.timezone}</div>
                  <div className="col-span-1">
                    {profile.unsubscribed ? "Yes" : "No"}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};
