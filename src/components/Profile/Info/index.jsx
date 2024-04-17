import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { UserName } from "./UserName";
import { Target } from "./Target";
import { AdditionalInfo } from "../Reviews/AdditionalInfo";
import { useState } from "react";
import { IconButton } from "../../Button/IconButton";
import { uploadFile } from "../../../store/middlewares/file";
import { updateUserData } from "../../../store/middlewares/user";

export const Info = ({ visit = false }) => {
  const dispatch = useDispatch();
  const [newPP, setNewPP] = useState();
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );

  const handlePPSubmit = async () => {
    const formData = new FormData();
    formData.append("file", newPP);
    const imageData = await dispatch(uploadFile(formData));
    dispatch(updateUserData(profile.id, { photoURL: imageData.Location }));
    setNewPP();
  };

  return (
    <div className="bg-white p-2 h-fit w-full flex flex-col shadow-md">
      <div className="flex-1 md:p-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-4 md:px-4 flex gap-2 justify-between md:flex-col">
            <div className="flex items-center justify-start">
              <div className="flex flex-col items-center">
                <label>
                  <img
                    src={newPP ? URL.createObjectURL(newPP) : profile.photoURL}
                    alt={"Person Profile Image"}
                    className="h-16 w-16 md:h-32 md:w-32 rounded-md my-2"
                  />
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    name="photoURL"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setNewPP(file);
                    }}
                  />
                </label>
                {newPP ? (
                  <div className="flex items-center gap-4">
                    <IconButton
                      onClick={handlePPSubmit}
                      className="!bg-green-400 !px-2 !py-1 rounded-full"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </IconButton>
                    <IconButton
                      onClick={() => setNewPP()}
                      className="!bg-gray-400 !px-2.5 !py-1 rounded-full"
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                  </div>
                ) : (
                  <div />
                )}
                <div className="flex gap-2 font-semibold text-base md:text-lg">
                  {!visit ? (
                    <>
                      <span>{profile.firstName}</span>
                      <span>{profile.lastName}</span>
                    </>
                  ) : (
                    <span>{profile.userName}</span>
                  )}
                </div>
                <div className="text-xs md:text-sm font-normal text-gray-500">
                  {profile.country}
                </div>
              </div>
            </div>
            <div className="pt-5">
              {!visit && profile.email ? (
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    className="text-xs text-gray-500"
                    icon={faEnvelope}
                  />
                  <div className="text-xs md:text-base text-gray-500">
                    {profile.email}
                  </div>
                </div>
              ) : (
                ""
              )}
              <UserName visit={visit} />
            </div>
          </div>
          <Target visit={visit} />
        </div>
      </div>
      <div className="flex justify-end items-center mt-4">
        <AdditionalInfo reviews={profile.reviews} />
      </div>
    </div>
  );
};
