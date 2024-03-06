import { useEffect, useState } from "react";
import { Auth } from "../components/Landing/Auth";
import { useLocation } from "react-router-dom";

const Landing = () => {
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
    <div className="w-full">
      {authMode && <Auth authMode={authMode} />}
      <img src="/landingPage.svg" className="w-full" />
    </div>
  );
};

export default Landing;
