import { useDispatch, useSelector } from "react-redux";
import { NoData } from "../../NoData";
import { Input } from "../../Input";
import { useEffect, useState } from "react";
import { deleteUserData, fetchProfiles } from "../../../store/middlewares/user";
import { uuidShortner } from "../../../utils/string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleExclamation,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../Modal";
import { ProfileModal } from "./ProfileModal";
import { getDataLabelFromKey } from "../../../utils/data";

const Label = ({ children = "", colSpan = 1 }) => (
  <div
    className={`col-span-${colSpan} text-sm text-ellipsis whitespace-nowrap overflow-hidden`}
  >
    {children}
  </div>
);

export const UserAdmin = () => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);

  const [allProfile, setAllProfile] = useState();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [selectedProfile, setSelectedProfile] = useState();

  const getProfiles = async () => {
    const profiles = await dispatch(fetchProfiles());
    setAllProfile(profiles);
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteUserData(userId));
    setFilteredData(() => allProfile.filter((item) => item.id !== userId));
    setSelectedProfile();
  };

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
    <div className="flex flex-col gap-2">
      <Input
        className=""
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Search by email"}
        icon={<FontAwesomeIcon icon={faSearch} />}
      />
      <div className="border border-primary px-2 py-1 grid grid-cols-12 bg-primary text-white">
        <Label>User ID</Label>
        <Label colSpan={3}>Email</Label>
        <Label colSpan={2}>Target Profession</Label>
        <Label>Username</Label>
        <Label>Medium</Label>
        <Label colSpan={2}>Timezone</Label>
        <Label>Unsubscribed</Label>
      </div>
      <div style={{ height: "70vh", overflowY: "auto" }}>
        {filteredData && filteredData.length ? (
          <>
            {filteredData.map((profile) => {
              return (
                <div
                  key={profile.id}
                  className="border border-primary px-2 py-1 grid grid-cols-12 text-sm hover:shadow-md cursor-pointer"
                  onClick={() => setSelectedProfile(profile)}
                >
                  <div className="col-span-1">
                    {uuidShortner(profile.id, 3)}
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    {profile.email}{" "}
                    {profile.email_verified ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="!text-green-500"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="!text-red-500"
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    {getDataLabelFromKey(
                      professions,
                      profile.targetProfessionId
                    )}
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
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <NoData className="!w-40 !h-40" />
          </div>
        )}
      </div>
      {selectedProfile && (
        <Modal
          handleClose={() => setSelectedProfile()}
          className="w-full h-full"
        >
          <ProfileModal data={selectedProfile} handleDelete={handleDelete} />
        </Modal>
      )}
    </div>
  );
};
