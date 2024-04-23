import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkExperience,
  deleteWorkExperience,
  editWorkExperience,
} from "../../store/middlewares/workExperience";
import { formatPostgresDate, htmlDateInputFormat } from "../../utils/timeDate";
import { Experience } from "./Experience";
import { MandatoryStar } from "../MandatoryStar";

const DEFAULT_DATA = {
  jobTitle: "",
  experienceId: null,
  companyId: null,
  country: "",
  startDate: null,
  endDate: null,
};

export const WorkExperience = ({ visit }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );
  const completionStatus = useSelector((state) => state.user.completionStatus);

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

  const handleDeleteClick = (id) => {
    dispatch(deleteWorkExperience(id));
  };

  return (
    <Experience
      {...{
        title: (
          <div>
            Work Experience{" "}
            {!completionStatus.workExperiences && <MandatoryStar />}
          </div>
        ),
        data: profile.workExperiences,
        formData,
        showInput,
        setShowInput,
        handleEditClick,
        handleDeleteClick,
        editItem,
        handleEditClose,
        handleChange,
        handleSubmit,
        visit,
      }}
    />
  );
};
