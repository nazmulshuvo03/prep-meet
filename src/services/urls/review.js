export const all_review_questions = (practiceAreaId) =>
  `/review/questions/${practiceAreaId}`;
export const review_interviewer = () => `/review/interviewer`;
export const review_self = (meetingId, skillId) =>
  `/review/self/${meetingId}/${skillId}`;
