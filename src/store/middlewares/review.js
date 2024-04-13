import { TOAST_TYPES } from "../../constants/Toast";
import { fetchContent, postContent } from "../../services/api";
import {
  all_review_questions,
  review_interviewer,
} from "../../services/urls/review";
import { responseHandler } from "../../utils/api";
import { setLoading, setToastMessage } from "../slices/global";

export const fetchAllReviewQuestions = async (practiceAreaId) => {
  const res = await fetchContent(all_review_questions(practiceAreaId));
  console.log(`Review questions of: ${practiceAreaId}`, res);
  if (res.data) {
    return res.data;
  } else {
    return null;
  }
};

export const getOrCreateInterviewerReview = (data) => async (dispatch) => {
  dispatch(setLoading());
  const res = await postContent(review_interviewer(), data);
  console.log("Review interviewer response ", res);
  dispatch(setLoading(false));
  if (res.success) {
    return res.data;
  } else {
    dispatch(
      setToastMessage({
        type: TOAST_TYPES[1],
        message: res.data,
      })
    );
  }
};
