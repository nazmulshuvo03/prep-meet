import { useState } from "react";
import { Button } from "../Button";
import { Stars } from "../Stars";
import { TextInput } from "../TextInput";

export const InterviewerReview = ({ meeting }) => {
  const [punctuality, setPunctuality] = useState(0);
  const [preparedness, setPreparedness] = useState(0);
  const [depthOfFeedback, setDepthOfFeedback] = useState(0);

  return (
    <>
      {meeting && (
        <div className="flex flex-col items-center w-full">
          <div className="w-full flex items-center justify-center gap-3 pt-4 pb-8">
            <div className="flex-1 border-t mx-2" />
            <div className="text-lg font-medium text-gray-600">
              Rate your Experience with John Doe as Interviewer
            </div>
            <div className="flex-1 border-t mx-2" />
          </div>
          <div className="text-base text-gray-500 font-light">
            <div className="pb-3">
              <div>Name: John Doe</div>
              <div>Interview Date and Time: March5, 2024</div>
            </div>
            <div className="pb-5">
              <div className="flex gap-2 items-center">
                Punctuality:{" "}
                <Stars
                  color="blue"
                  value={punctuality}
                  setValue={setPunctuality}
                />
              </div>
              <div className="flex gap-2 items-center">
                Question Preparedness:{" "}
                <Stars
                  color="blue"
                  value={preparedness}
                  setValue={setPreparedness}
                />
              </div>
              <div className="flex gap-2 items-center">
                Depth of Feedback:{" "}
                <Stars
                  color="blue"
                  value={depthOfFeedback}
                  setValue={setDepthOfFeedback}
                />
              </div>
            </div>
            <div className="pb-6">
              <TextInput placeholder="Additional Comments" rows="4" />
            </div>
            <div className="flex justify-center">
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
