import { useState } from "react";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { addEducation } from "../../../store/middlewares/education";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

const DEFAULT_DATA = {
  degree: "",
  major: "",
  institution: "",
  year_of_graduation: "",
};

export const Education = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
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
    dispatch(addEducation(fullData));
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold uppercase">Education</div>
        {profile.workExperiences && profile.workExperiences.length > 0 ? ( // If there is no data added, input fields will be open by default
          <Button
            className="!bg-transparent !text-gray-500 !p-0 text-2xl"
            onClick={() => setShowInput((prev) => !prev)}
          >
            {showInput ? (
              <FontAwesomeIcon icon={faClose} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </Button>
        ) : (
          <div />
        )}
      </div>
      <div className="pt-4 pb-2">
        {profile && profile.education && profile.education.length ? (
          profile.education.map((ed) => {
            return <Display data={ed} key={ed.id} />;
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
        <AddNew
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
