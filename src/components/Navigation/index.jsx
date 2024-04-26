import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Button } from "../Button";
import { ProfileAvatar } from "../ProfileAvatar";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TabNavigation } from "./TabNavigation";
import { Drawer } from "../Drawer";
import { Banner } from "../Banner";
import { isAllTrue } from "../../utils/object";
import { completionRemaining } from "../../utils/profile";

export const Navigation = ({ scrollToHowItWorks, scrollToFaqs }) => {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const completionStatus = useSelector((state) => state.user.completionStatus);

  const [openTabNavs, setOpenTabNavs] = useState(false);

  const isDashboard = () => {
    const dashboardRoutes = ["/people", "/profile", "/progress", "/interviews"];
    return dashboardRoutes.includes(location.pathname);
  };

  const navLinks = [
    ...(isDashboard()
      ? []
      : [
          { to: "/about-us", name: "About Us" },
          {
            name: "How it works",
            type: "button",
            clickHandler: scrollToHowItWorks,
          },
          { name: "FAQs", type: "button", clickHandler: scrollToFaqs },
          ...(isAuthenticated ? [] : []),
        ]),
  ];

  const handleLoginClick = () => {
    history.push({
      search: "?auth=login",
    });
  };

  return (
    <>
      <Banner
        text={
          "This website is currently under active construction. Please inform us of any anomalies or issues you encounter. Thank you for your patience."
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
      <div className="bg-primary flex justify-between w-full h-16 items-center px-5 z-10">
        {isAuthenticated && (
          <div className="visible md:hidden">
            <IconButton onClick={() => setOpenTabNavs((prev) => !prev)}>
              <FontAwesomeIcon icon={faBars} className="text-text h-4 w-4" />
            </IconButton>
          </div>
        )}
        <div className="text-3xl font-semibold opacity-75 ">
          <NavLink to={"/profile"} className="text-gray-900">
            Candidace
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
