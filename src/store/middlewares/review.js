import { fetchContent } from "../../services/api";
import { all_review_questions } from "../../services/urls/review";

export const fetchAllReviewQuestions = async (practiceAreaId) => {
  const res = await fetchContent(all_review_questions(practiceAreaId));
  console.log(`Review questions of: ${practiceAreaId}`, res);
  if (res.data) {
    return res.data;
  } else {
    return null;
  }
};
