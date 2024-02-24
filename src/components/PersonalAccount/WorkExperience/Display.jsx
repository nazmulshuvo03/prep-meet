import { useDispatch, useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../../utils/timeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteWorkExperience } from "../../../store/middlewares/userInfo";

export const Display = ({ data }) => {
  const dispatch = useDispatch();
  const professionDropdownOptions = useSelector(
    (state) => state.profession.professionKeyPairs
  );

  const handleDelete = () => {
    dispatch(deleteWorkExperience(data.id));
  };

  return (
    <div className="border rounded-md px-2 py-3">
      <div className="flex items-center justify-between">
        <div>
          {
            professionDropdownOptions.find(
              (prf) => prf.key === data.profession_id
            ).label
          }
        </div>
        <div className="cursor-pointer" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} className="text-red-500" />
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
  );
};
