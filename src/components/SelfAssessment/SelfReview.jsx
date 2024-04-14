import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import {
  createSelfReview,
  fetchAllReviewQuestions,
  getSelfReview,
} from "../../store/middlewares/review";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

export const SelfReview = ({ meeting, practiceAreaId }) => {
  const dispatch = useDispatch();
  const [questionType1, setQuestionsType1] = useState();
  const [questionType2, setQuestionsType2] = useState();
  const [answerType1, setAnswerType1] = useState();
  const [answerType2, setAnswerType2] = useState();
  const [note, setNote] = useState("");

  const getAllQuestions = async () => {
    const response = await dispatch(fetchAllReviewQuestions(practiceAreaId));
    if (response) {
      setQuestionsType1(response.type1);
      setQuestionsType2(response.type2);
    }
    const alreadyExists = await dispatch(
      getSelfReview({
        meetingId: meeting.id,
        skillId: practiceAreaId,
      })
    );
    if (alreadyExists) {
      setAnswerType1(alreadyExists.answerType1);
      setAnswerType2(alreadyExists.answerType2);
      setNote(alreadyExists.note || "");
    } else {
      setAnswerType1(Array.from({ length: response.type1.length }, () => 0));
      setAnswerType2(Array.from({ length: response.type2.length }, () => 0));
    }
  };

  const handleSubmit = async () => {
    const data = {
      meetingId: meeting.id,
      skillId: practiceAreaId,
      answerType1,
      answerType2,
      note,
    };
    dispatch(createSelfReview(data));
  };

  useEffect(() => {
    if (meeting && practiceAreaId) {
      getAllQuestions();
    }
  }, [meeting, practiceAreaId]);

  return (
    <>
      {meeting && practiceAreaId && (
        <div className="">
          <div className="w-full flex items-center justify-center gap-3 pt-4 pb-8">
            <div className="flex-1 border-t mx-2" />
            <div className="text-lg font-medium text-gray-600">
              Summarize your Interview Experience
            </div>
            <div className="flex-1 border-t mx-2" />
          </div>
          {questionType1 ? (
            <Questions
              questions={questionType1}
              answers={[
                { id: 1, name: "Yes" },
                { id: 2, name: "No" },
              ]}
              selections={answerType1}
              setSelections={setAnswerType1}
            />
          ) : (
            <div />
          )}
          {questionType2 ? (
            <Questions
              questions={questionType2}
              answers={[
                { id: 1, name: "Very Poor" },
                { id: 2, name: "" },
                { id: 3, name: "" },
                { id: 4, name: "" },
                { id: 5, name: "Excellent" },
              ]}
              selections={answerType2}
              setSelections={setAnswerType2}
            />
          ) : (
            <div />
          )}
          <div>
            <TextInput
              placeholder="Additional Note for future reference"
              rows="4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex justify-center" onClick={handleSubmit}>
            <Button>Submit</Button>
          </div>
        </div>
      )}
    </>
  );
};
