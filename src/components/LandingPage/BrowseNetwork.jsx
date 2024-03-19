import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "../Button";
import { useSelector } from "react-redux";

export const BrowseNetwork = () => {
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
    <div className="py-16" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 py-6 gap-4">
        <div className="flex flex-col justify-center items-center gap-6">
          <img
            src="/images/landingPage/box.svg"
            alt="icon"
            className="h-16 w-16"
          />
          <div className="text-3xl font-bold text-center">
            Learn directly from people who understand your desired role
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            src="/images/landingPage/box.svg"
            alt="icon"
            className="h-16 w-16"
          />
          <div className="text-3xl font-bold text-center">
            Get insights into company cultures, processes and expectations
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            src="/images/landingPage/box.svg"
            alt="icon"
            className="h-16 w-16"
          />
          <div className="text-3xl font-bold text-center">
            Practice role-specific case studies and technical questions
          </div>
        </div>
      </div>
      <div className="flex justify-center py-6">
        <Button
          size="large"
          className={"border border-text"}
          onClick={handleAction}
        >
          Browse the Candidace Network
        </Button>
      </div>
    </div>
  );
};
