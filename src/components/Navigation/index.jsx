import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Button } from "../Button";
import { ProfileAvatar } from "../ProfileAvatar";

export const Navigation = ({ scrollToHowItWorks, scrollToFaqs }) => {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

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

  // const isRouteActive = (routePath) => {
  //   return location.pathname === routePath;
  // };

  const handleLoginClick = () => {
    history.push({
      search: "?auth=login",
    });
  };

  return (
    <>
      {/* <Banner
        text={
          "This website is currently under active construction. Please inform us of any anomalies or issues you encounter. Thank you for your patience."
        }
      /> */}
      <div className="bg-primary flex justify-between w-full h-full items-center px-5 z-10">
        <div className="text-3xl font-semibold opacity-75 ">
          <NavLink to={"/"} className="text-gray-900">
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
                    // isActive={() => isRouteActive(link.to)}
                    className="h-fit rounded-lg !text-slate-950 dark:text-slate-50"
                    // activeClassName="bg-secondary !text-slate-50 dark:!text-slate-100 font-semibold"
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
    </>
  );
};
