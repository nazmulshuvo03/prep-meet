import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AddNew } from "./AddNew";
import {
  deleteInterviewExperience,
  editInterviewExperience,
} from "../../../store/middlewares/interviewExperience";

export const Display = ({ data }) => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);

  const [editMode, setEditMode] = useState(false);
  const [editProperties, setEditProperties] = useState({
    role: data.role,
    companyId: data.companyId,
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
      role: editProperties.role,
      companyId: editProperties.companyId,
    };
    dispatch(editInterviewExperience(data.id, fullData));
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteInterviewExperience(data.id));
  };

  return (
    <>
      {!editMode ? (
        <div className="border rounded-md px-2 py-3">
          <div className="flex items-center justify-between">
            <div>{professions.find((prf) => prf.id === data.role)?.name}</div>
            <div className="flex gap-2">
              <div className="cursor-pointer" onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faEdit} className="text-green-500" />
              </div>
              <div className="cursor-pointer" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              </div>
            </div>
          </div>
          <div>
            {companies &&
              companies.length &&
              companies.filter(
                (company) => company.id === parseInt(data.companyId)
              )[0]?.name}
            {", "}
            {data.country}
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
