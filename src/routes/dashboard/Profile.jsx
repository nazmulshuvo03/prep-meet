import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUserDoc } from "../../firebase/functions/user";
import { getDataLabelFromKey } from "../../utils/data";
import LANGUAGE_DATA from "../../assets/data/languages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faClock,
  faFlag,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";

const ProfileHighlightItem = ({ icon, value }) => {
  return (
    <>
      {value ? (
        <div className="flex gap-2">
          <span className="text-accent">
            {React.cloneElement(icon, { className: "h-4 w-4" })}
          </span>
          <span className="text-text font-medium text-base">{value}</span>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState();
  const { userId } = useParams();

  const professionList = useSelector((state) => state.profession.keyLabelPairs);

  const fetchPublicProfile = async () => {
    const res = await getSingleUserDoc(userId);
    setProfile(res);
  };

  const formattedProfession = (profile) => {
    return profile.profession
      ? `${getDataLabelFromKey({
          data: professionList,
          key: profile.profession,
        })}${
          profile.yearsOfExperience
            ? ` for ${profile.yearsOfExperience} years`
            : ""
        }`
      : "";
  };

  const formattedDegree = (profile) => {
    return profile.university
      ? `${profile.university} ${
          profile.degree
            ? `(${profile.degree}${profile.fieldOfStudy ? " in " : ""}${
                profile.fieldOfStudy
              })`
            : ""
        }`
      : "";
  };

  useEffect(() => {
    fetchPublicProfile();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {profile ? (
        <div>
          <div className="flex gap-4">
            <img
              src={profile.photoURL}
              alt="Profile photo"
              className="h-52 w-52 rounded-md"
            />
            <div className="flex-1">
              <div className="mb-4">
                <div className="font-semibold text-4xl text-text">
                  {profile.firstName} {profile.lastName}
                </div>
                <div className="font-extralight text-sm">
                  {formattedProfession(profile)}
                </div>
              </div>
              <div className="font-normal text-base text-text">
                <ProfileHighlightItem
                  icon={<FontAwesomeIcon icon={faBuildingColumns} />}
                  value={formattedDegree(profile)}
                />
                <ProfileHighlightItem
                  icon={<FontAwesomeIcon icon={faLanguage} />}
                  value={
                    profile.language
                      ? getDataLabelFromKey({
                          data: LANGUAGE_DATA,
                          key: profile.language,
                        })
                      : ""
                  }
                />
                <ProfileHighlightItem
                  icon={<FontAwesomeIcon icon={faFlag} />}
                  value={profile.country}
                />
                <ProfileHighlightItem
                  icon={<FontAwesomeIcon icon={faClock} />}
                  value={profile.timezone}
                />
              </div>
            </div>
          </div>
          {profile.profileHeadline ? (
            <div className="p-2 my-4 border text-accent rounded-md">
              {profile.profileHeadline}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
