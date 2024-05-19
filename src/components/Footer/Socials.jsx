import { NavLink } from "react-router-dom";
import { faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShareProfile } from "../ShareProfile";
import { useSelector } from "react-redux";

export const FooterSocials = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <div className="flex gap-2">
      <NavLink
        to={{
          pathname: "https://twitter.com/candidacefyi",
        }}
        target="_blank"
      >
        <FontAwesomeIcon icon={faXTwitter} />
      </NavLink>
      <NavLink
        to={{
          pathname: "https://www.linkedin.com/company/candidace-fyi",
        }}
        target="_blank"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </NavLink>
      {profile && <ShareProfile />}
    </div>
  );
};
