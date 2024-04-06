export const InterviewerReview = ({ meeting }) => {
  return (
    <>
      {meeting && (
        <div>
          <h1>Interviewer Review</h1>
          <h1>{meeting.id}</h1>
        </div>
      )}
    </>
  );
};
