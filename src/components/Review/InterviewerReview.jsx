import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { Stars } from "../Stars";
import { TextInput } from "../TextInput";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { createInterviewerReview } from "../../store/middlewares/review";

export const InterviewerReview = ({ meeting, interviewer }) => {
  const dispatch = useDispatch();
  const [punctuality, setPunctuality] = useState(0);
  const [preparedness, setPreparedness] = useState(0);
  const [depthOfFeedback, setDepthOfFeedback] = useState(0);
  const [comments, setComments] = useState("");

  const submitReview = async () => {
    const data = {
      meetingId: meeting.id,
      interviewerId: interviewer.id,
      punctuality,
      preparedness,
      depthOfFeedback,
      comments,
    };
    dispatch(createInterviewerReview(data));
  };

  return (
    <>
      {meeting && interviewer && (
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
              {interviewer.firstName && (
                <div>
                  Name: {interviewer.firstName} {interviewer.lastName}
                </div>
              )}
              {interviewer.userName && (
                <div>Username: {interviewer.userName}</div>
              )}
              <div>Email: {interviewer.email}</div>
              <div>
                Interview Date and Time:{" "}
                {
                  convertISOUTCDayTimeToLocalDayTime(meeting.dayHourUTC)
                    .dateMonthView
                }
              </div>
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
              <TextInput
                placeholder="Additional Comments"
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <div className="flex justify-center" onClick={submitReview}>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
