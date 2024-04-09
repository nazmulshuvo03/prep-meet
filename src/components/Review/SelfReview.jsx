import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { fetchAllReviewQuestions } from "../../store/middlewares/review";

export const SelfReview = ({ meeting, practiceAreaId }) => {
  const [questionType1, setQuestionsType1] = useState();
  const [questionType2, setQuestionsType2] = useState();

  const getAllQuestions = async () => {
    const response = await fetchAllReviewQuestions(practiceAreaId);
    if (response) {
      setQuestionsType1(response.type1);
      setQuestionsType2(response.type2);
    }
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
                { id: 3, name: "Not Applicable" },
              ]}
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
            />
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
};
