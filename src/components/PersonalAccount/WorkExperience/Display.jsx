import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  convertISOUTCDayTimeToLocalDayTime,
  formatPostgresDate,
  htmlDateInputFormat,
} from "../../../utils/timeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteWorkExperience,
  editWorkExperience,
} from "../../../store/middlewares/workExperience";
import { AddNew } from "./AddNew";
import { setToastMessage } from "../../../store/slices/global";
import { TOAST_TYPES } from "../../../constants/Toast";

export const Display = ({ data }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professions = useSelector((state) => state.profession.items);
  const [editMode, setEditMode] = useState(false);
  const [editProperties, setEditProperties] = useState({
    jobTitle: data.profession_id,
    companyName: data.company_name,
    country: data.country,
    startDate: htmlDateInputFormat(data.start_date),
    endDate: htmlDateInputFormat(data.end_date),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProperties((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      const formattedStartDate = formatPostgresDate(editProperties.startDate);
      const formattedEndDate = formatPostgresDate(editProperties.endDate);

      if (formattedStartDate && formattedEndDate) {
        const fullData = {
          user_id: profile.id,
          profession_id: editProperties.jobTitle,
          company_name: editProperties.companyName,
          country: editProperties.country,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        };
        dispatch(editWorkExperience(data.id, fullData));
        setEditMode(false);
      }
    } catch (err) {
      dispatch(setToastMessage({ type: TOAST_TYPES[1], message: err.message }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteWorkExperience(data.id));
  };

  return (
    <>
      {!editMode ? (
        <div className="border rounded-md px-2 py-3">
          <div className="flex items-center justify-between">
            <div>
              {professions.find((prf) => prf.id === data.profession_id).name}
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
          <div>
            {data.company_name}
            {", "}
            {data.country}
          </div>
          <div>
            {convertISOUTCDayTimeToLocalDayTime(data.start_date).date}
            {" - "}
            {convertISOUTCDayTimeToLocalDayTime(data.end_date).date}
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
