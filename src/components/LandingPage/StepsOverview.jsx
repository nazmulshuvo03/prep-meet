export const StepsOverview = ({ reference }) => {
  return (
    <div
      className="flex flex-col-reverse md:flex-row items-center py-14 bg-white"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
      ref={reference}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-6">
        <div>
          <div className="text-3xl font-bold py-1">
            Sign Up and Connect with Peers
          </div>
          <div className="text-base font-light py-1">
            Create an account and start connecting with professionals in your
            field. Book practice sessions around your schedule.
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold py-1">
            Schedule and Practice Interviews
          </div>
          <div className="text-base font-light py-1">
            Take turns being the interviewee and the interviewer. Get
            perspectives from diverse candidates.
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold py-1">
            Get Honest, Valuable Feedback
          </div>
          <div className="text-base font-light py-1">
            Get specific feedback to improve your skills. Track your progress
            over time and identify growth areas.
          </div>
        </div>
      </div>
      <div>
        <img
          src="/images/landingPage/image3.png"
          alt="Landing Your Dream Job"
        />
      </div>
    </div>
  );
};
