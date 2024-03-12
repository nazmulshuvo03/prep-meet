import { useState } from "react";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  deleteEducation,
  editEducation,
} from "../../../store/middlewares/education";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../Modal";
import { IconButton } from "../../Button/IconButton";

const DEFAULT_DATA = {
  degree: "",
  major: "",
  institution: "",
  year_of_graduation: "",
};

export const Education = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [editItem, setEditItem] = useState();
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const fullData = {
      user_id: profile.id,
      ...formData,
    };
    if (editItem) {
      dispatch(editEducation(editItem, fullData));
      setEditItem();
    } else {
      dispatch(addEducation(fullData));
    }
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  const handleEditClick = (id) => {
    const data = profile.education.find((we) => we.id === id);
    setFormData({
      ...data,
    });
    setEditItem(data.id);
    setShowInput(true);
  };

  const handleEditClose = () => {
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteEducation(id));
  };

  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold uppercase">Education</div>
        {profile.education && profile.education.length > 0 ? ( // If there is no data added, input fields will be open by default
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
        {profile && profile.education && profile.education.length ? (
          profile.education.map((ed) => {
            return (
              <Display
                data={ed}
                key={ed.id}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
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
                {!editItem ? "Add" : "Edit"} Education
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
