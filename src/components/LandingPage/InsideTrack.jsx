export const InsideTrack = () => {
  return (
    <div
      className="flex flex-col md:flex-row py-14 bg-white"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="flex-1 flex items-center justify-start">
        <div>
          <div className="text-4xl font-semibold py-4">
            The Inside Track on Landing Your Dream Job
          </div>
          <div className="py-4 text-lg font-normal flex flex-col gap-3">
            <div className="flex items-center gap-6">
              <img
                src="/images/landingPage/box.svg"
                alt="icon"
                className="h-4 w-4"
              />
              Find peers with experience at your target companies
            </div>
            <div className="flex items-center gap-6">
              <img
                src="/images/landingPage/box.svg"
                alt="icon"
                className="h-4 w-4"
              />
              Filter by role, experience level, and interviewing goals to find
              your ideal practice partner
            </div>
            <div className="flex items-center gap-6">
              <img
                src="/images/landingPage/box.svg"
                alt="icon"
                className="h-4 w-4"
              />
              Practice unlimited number of mock interviews on your schedule
            </div>
            <div className="flex items-center gap-6">
              <img
                src="/images/landingPage/box.svg"
                alt="icon"
                className="h-4 w-4"
              />
              Get valuable feedback to identify strengths and improvement areas
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src="/images/landingPage/image2.png"
          alt="Landing Your Dream Job"
        />
      </div>
    </div>
  );
};
