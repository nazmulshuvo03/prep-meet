import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteEducation,
  editEducation,
} from "../../../store/middlewares/education";
import { AddNew } from "./AddNew";

export const Display = ({ data }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [editMode, setEditMode] = useState(false);
  const [editProperties, setEditProperties] = useState({
    ...data,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProperties((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const fullData = {
      user_id: profile.id,
      ...editProperties,
    };
    dispatch(editEducation(data.id, fullData));
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteEducation(data.id));
  };

  return (
    <>
      {!editMode ? (
        <div className="border rounded-md px-2 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div>
                {data.degree}
                {" in "}
                {data.major}
              </div>
              <div>
                {data.institution}
                {", "}
                {data.year_of_graduation}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="cursor-pointer" onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faEdit} className="text-green-500" />
              </div>
              <div className="cursor-pointer" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AddNew
          data={editProperties}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
