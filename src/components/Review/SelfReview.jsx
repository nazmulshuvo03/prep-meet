export const SelfReview = ({ meeting, practiceAreaId }) => {
  return (
    <>
      {meeting && practiceAreaId && (
        <div>
          <h1>Self Review</h1>
          <h1>{meeting.id}</h1>
          <h1>{practiceAreaId}</h1>
        </div>
      )}
    </>
  );
};
