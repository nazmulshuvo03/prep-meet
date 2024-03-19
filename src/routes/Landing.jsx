import { useEffect, useState } from "react";
import { Auth } from "../components/Landing/Auth";
import { useLocation } from "react-router-dom";
import { LandingPage } from "../components/LandingPage";

const Landing = ({ landingHowItWorksRef, landingFaqsRef }) => {
  const location = useLocation();
  const [authMode, setAuthMode] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get("auth");
    if (modeParam) {
      setAuthMode(modeParam);
    } else setAuthMode("");
  }, [location.search]);

  return (
    <div className="w-full h-full">
      {authMode && <Auth authMode={authMode} />}
      <LandingPage {...{ landingHowItWorksRef, landingFaqsRef }} />
    </div>
  );
};

export default Landing;
