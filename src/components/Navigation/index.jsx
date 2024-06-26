import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Button } from "../Button";
import { ProfileAvatar } from "../ProfileAvatar";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { TabNavigation } from "./TabNavigation";
import { Drawer } from "../Drawer";
import { Banner } from "../Banner";
import { isAllTrue } from "../../utils/object";
import { completionRemaining } from "../../utils/profile";
import { Auth } from "../Landing/Auth";
import { resendVerificationEmail } from "../../store/middlewares/auth";
import { GoogleAuth } from "../Landing/GoogleAuth";
import { Notification } from "../Notification";
import { Message } from "../Message";

export const Navigation = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const profile = useSelector((state) => state.user.profile);
  const completionStatus = useSelector((state) => state.user.completionStatus);

  const [authMode, setAuthMode] = useState("");
  const [openTabNavs, setOpenTabNavs] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get("auth");
    if (modeParam) {
      setAuthMode(modeParam);
    } else setAuthMode("");
  }, [location.search]);

  const isDashboard = () => {
    const dashboardRoutes = ["/people", "/profile", "/progress", "/interviews"];
    return dashboardRoutes.includes(location.pathname);
  };

  const navLinks = [
    ...(isDashboard()
      ? []
      : [
          // { to: "/about-us", name: "About Us" },
          // {
          //   name: "How it works",
          //   type: "button",
          //   clickHandler: scrollToHowItWorks,
          // },
          // { name: "FAQs", type: "button", clickHandler: scrollToFaqs },
          ...(isAuthenticated ? [] : []),
        ]),
  ];

  const handleLoginClick = () => {
    history.push({
      search: "?auth=login",
    });
  };

  const handleResendClick = async () => {
    await dispatch(resendVerificationEmail());
  };

  return (
    <>
      <Banner
        text={
          <a
            href="https://forms.gle/WFMQhmP98HdyQwXy6"
            target="_blank"
            className="hover:underline"
          >
            This website is currently under active construction. Please inform
            us of any anomalies or issues you encounter
            <span className="text-blue-600 px-1 font-semibold">here</span>.
            Thank you for your patience.
          </a>
        }
      />
      {completionStatus && !isAllTrue(completionStatus) && (
        <Banner
          className="!bg-red-800 !text-white !font-normal"
          text={`Profile is not complete at this moment. You will have to provide ${completionRemaining(
            completionStatus
          )}.`}
        />
      )}
      {profile && !profile.email_verified && (
        <Banner
          className="!bg-cyan-600 !text-white !font-normal"
          text={
            <div>
              Email address is not verified yet. Please check email inbox or
              <span
                onClick={handleResendClick}
                className="text-blue-800 px-1 font-semibold cursor-pointer"
              >
                click here
              </span>
              to resend it
            </div>
          }
        />
      )}
      {authMode && <Auth authMode={authMode} />}
      {!isAuthenticated && <GoogleAuth useOneTap />}
      <div className="bg-primary flex justify-between w-full h-16 items-center px-5 z-10">
        {isAuthenticated && (
          <div className="visible md:hidden">
            <IconButton onClick={() => setOpenTabNavs((prev) => !prev)}>
              <FontAwesomeIcon icon={faBars} className="text-text h-4 w-4" />
            </IconButton>
          </div>
        )}
        <div className="text-3xl font-semibold opacity-75 h-full">
          <NavLink to={"/profile"} className="text-gray-900 h-full">
            <img
              src={"/images/logo_full.svg"}
              alt="Candidace Logo"
              style={{ height: "100%", width: "100%" }}
            />
          </NavLink>
        </div>
        <div className="flex gap-8 items-center">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.type && link.type === "button") {
                return (
                  <Button
                    className="h-fit rounded-lg !text-slate-950 dark:text-slate-50 !font-normal !p-0 !bg-transparent"
                    key={link.name}
                    onClick={link.clickHandler}
                  >
                    {link.name}
                  </Button>
                );
              } else {
                return (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className="h-fit rounded-lg !text-slate-950 dark:text-slate-50"
                  >
                    {link.name}
                  </NavLink>
                );
              }
            })}
          </nav>
          {isAuthenticated && <Notification />}
          {isAuthenticated && <Message />}
          {isAuthenticated ? (
            <ProfileAvatar />
          ) : (
            <Button
              className={
                "border border-gray-700 !bg-secondary rounded-none !font-normal !text-white"
              }
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <Drawer open={openTabNavs} setOpen={setOpenTabNavs}>
        <TabNavigation />
      </Drawer>
    </>
  );
};
