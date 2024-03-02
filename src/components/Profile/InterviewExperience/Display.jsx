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
        <div className="px-2 relative pb-3 flex justify-between items-start">
          <div>
            <div
              className="border-l-2 border-gray-200 absolute"
              style={{ height: "100%", top: 10, left: -2 }}
            />
            <div
              className="text-gray-300 absolute"
              style={{ fontSize: 30, top: -11, left: -5 }}
            >
              &middot;
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <div>
                {professions.find((prf) => prf.id === data.role)
                  ? professions.find((prf) => prf.id === data.role).name
                  : ""}
              </div>
            </div>
            <div className="text-sm font-medium">
              {companies &&
              companies.length &&
              companies.filter(
                (company) => company.id === parseInt(data.companyId)
              )[0]
                ? companies.filter(
                    (company) => company.id === parseInt(data.companyId)
                  )[0].name
                : ""}
              {", "}
              {data.country}
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <div className="cursor-pointer" onClick={() => setEditMode(true)}>
              <FontAwesomeIcon icon={faEdit} className="text-gray-400" />
            </div>
            <div className="cursor-pointer" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="text-gray-400" />
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
