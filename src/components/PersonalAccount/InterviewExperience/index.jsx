import { useState } from "react";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import { addInterviewExperience } from "../../../store/middlewares/interviewExperience";

const DEFAULT_DATA = {
  role: null,
  companyId: null,
};

export const InterviewExperience = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const { role, companyId } = formData;

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
      role,
      companyId,
    };
    dispatch(addInterviewExperience(fullData));
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>Interview Experiences</div>
        {profile.interviewExperiences &&
        profile.interviewExperiences.length > 0 ? ( // If there is no data added, input fields will be open by default
          <Button onClick={() => setShowInput((prev) => !prev)}>
            {showInput ? "Close" : "Add More"}
          </Button>
        ) : (
          <div />
        )}
      </div>
      {profile &&
      profile.interviewExperiences &&
      profile.interviewExperiences.length ? (
        profile.interviewExperiences.map((ie) => {
          return <Display data={ie} key={ie.id} />;
        })
      ) : (
        <AddNew
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {showInput && (
        <AddNew
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};