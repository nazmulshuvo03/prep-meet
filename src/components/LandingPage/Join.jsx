import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "../Button";
import { useSelector } from "react-redux";

export const Join = () => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const handleAction = () => {
    if (!isAuthenticated) {
      history.push({
        search: "?auth=signup",
      });
    } else {
      history.push("/people");
    }
  };

  return (
    <div
      className="bg-white py-16 flex flex-col md:flex-row justify-between gap-10"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="text-3xl font-semibold">
        Join 1000+ candidates leveling up together
      </div>
      <div>
        <div className="text-base font-medium pb-6">
          Sign Up now and start practicing. Its fast, free, and the best way to
          ensure you nail your next interview.
        </div>
        <Button className={"border border-text"}>
          {!isAuthenticated ? "Join" : "Profile"}
        </Button>
      </div>
    </div>
  );
};
