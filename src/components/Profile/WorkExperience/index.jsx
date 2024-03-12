import { useState } from "react";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkExperience,
  editWorkExperience,
} from "../../../store/middlewares/workExperience";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import {
  formatPostgresDate,
  htmlDateInputFormat,
} from "../../../utils/timeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../Modal";
import { IconButton } from "../../Button/IconButton";

const DEFAULT_DATA = {
  jobTitle: "",
  experienceId: null,
  companyId: null,
  country: "",
  startDate: null,
  endDate: null,
};

export const WorkExperience = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [editItem, setEditItem] = useState();
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const { jobTitle, experienceId, companyId, country, startDate, endDate } =
    formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const formattedStartDate = formatPostgresDate(startDate);
    const formattedEndDate = formatPostgresDate(endDate);

    const fullData = {
      user_id: profile.id,
      jobTitle: jobTitle,
      experienceId: experienceId,
      companyId: companyId,
      country: country,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
    if (editItem) {
      dispatch(editWorkExperience(editItem, fullData));
      setEditItem();
    } else {
      dispatch(addWorkExperience(fullData));
    }
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  const handleEditClick = (id) => {
    const data = profile.workExperiences.find((we) => we.id === id);
    setFormData({
      jobTitle: data.jobTitle,
      experienceId: data.experienceId,
      companyId: data.companyId,
      country: data.country,
      startDate: htmlDateInputFormat(data.startDate),
      endDate: data.endDate ? htmlDateInputFormat(data.endDate) : null,
    });
    setEditItem(data.id);
    setShowInput(true);
  };

  const handleEditClose = () => {
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold uppercase">Experience</div>
        {profile.workExperiences && profile.workExperiences.length > 0 ? ( // If there is no data added, input fields will be open by default
          <Button
            className="!bg-transparent !text-gray-500 !p-0 text-2xl"
            onClick={() => setShowInput(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        ) : (
          <div />
        )}
      </div>
      <div className="pt-4 pb-2">
        {profile &&
        profile.workExperiences &&
        profile.workExperiences.length ? (
          profile.workExperiences.map((wp) => {
            return (
              <Display
                key={wp.id}
                data={wp}
                handleEditClick={handleEditClick}
              />
            );
          })
        ) : (
          <AddNew
            data={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      {showInput && (
        <Modal className="w-2/3 h-1/2">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between pb-4">
              <div className="text-lg font-semibold uppercase">
                {!editItem ? "Add" : "Edit"} Experience
              </div>
              <IconButton onClick={handleEditClose}>
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-gray-500 text-2xl"
                />
              </IconButton>
            </div>
            <AddNew
              data={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
