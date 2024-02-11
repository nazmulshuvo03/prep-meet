import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataLabelFromKey } from "../utils/data";
import LANGUAGE_DATA from "../assets/data/languages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faClock,
  faFlag,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import {
  formatHourWithAMPM,
  getDateTimeStamp,
  getFormattedDateWithWeekday,
} from "../utils/timeDate";
import { Modal } from "../components/Modal";
import { MeetConfirmation } from "../components/PublicProfile/MeetConfirmation";
import { visitUserProfile } from "../store/middlewares/user";
import { visitUserAvailabilities } from "../store/middlewares/availability";
import { createMeeting } from "../store/middlewares/meeting";
import { data } from "autoprefixer";

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
  const userProfile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState();
  const [availabilities, setAvailabilities] = useState();
  const [meetingData, setMeetingData] = useState(false);
  const { userId } = useParams();

  const professionList = useSelector((state) => state.profession.keyLabelPairs);

  const fetchPublicProfile = async () => {
    const res = await dispatch(visitUserProfile(userId));
    setProfile(res);
  };

  const fetchAvailabilities = async () => {
    const res = await dispatch(visitUserAvailabilities(userId));
    setAvailabilities(res);
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

  const confirmMeet = async () => {
    const meetingPayload = {
      availabilityId: meetingData.availability.id, // the user whose page is visitng, is the meeting initiator
      acceptorId: userProfile.id, // meeting acceptor is the current logged in user
    };
    dispatch(createMeeting(meetingPayload));
    setMeetingData();
  };

  useEffect(() => {
    fetchPublicProfile();
    fetchAvailabilities();
  }, []);

  return (
    <div className="w-full h-full">
      <div>
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
      <div>
        {availabilities && availabilities.length ? (
          <div className="font-bold text-3xl text-primary">
            Select time to request a meeting
          </div>
        ) : (
          <div />
        )}
        <div>
          {availabilities && availabilities.length ? (
            availabilities.map((avl) => {
              return (
                <div key={avl.id} className="py-2">
                  <div className="mb-2 py-1 border-b-2 border-b-secondary font-medium text-xl text-secondary">
                    {getFormattedDateWithWeekday(new Date(parseInt(avl.day)))}
                  </div>
                  <div className="flex gap-2">
                    <div
                      key={avl.hour}
                      className={`cursor-pointer px-8 py-2 rounded-md text-white ${
                        avl.state === "BOOKED"
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-accent"
                      }`}
                      onClick={
                        avl.state !== "BOOKED"
                          ? () =>
                              setMeetingData({
                                availability: avl,
                                acceptor: profile,
                              })
                          : () => {}
                      }
                    >
                      {formatHourWithAMPM(avl.hour)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
      </div>
      {meetingData ? (
        <Modal handleClose={() => setMeetingData()}>
          <MeetConfirmation
            data={meetingData}
            handleClose={() => setMeetingData()}
            handleConfirm={confirmMeet}
          />
        </Modal>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Profile;
