import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "../Button";
import { useSelector } from "react-redux";

export const Header = ({ scrollToLearnMore }) => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const handleCTC = () => {
    if (!isAuthenticated) {
      history.push({
        search: "?auth=signup",
      });
    } else {
      history.push("/profile");
    }
  };

  return (
    <div
      className="h-2/3 flex flex-col justify-center bg-cover bg-center bg-text text-white"
      style={{
        // backgroundImage: 'url("/images/landingPage/image1.png")',
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="text-6xl font-bold py-4">
            Ace Your Next Job Interview
          </div>
          <div className="text-lg font-medium py-4">
            Join the candidate network to practice mock interviews together.
            Find peers with experience at your target company and dream roles.
            Take turns interviewing each other, get invaluable feedback, and
            walk into real interviews fully prepared.
          </div>
          <div className="flex gap-6 py-4">
            <Button
              size="large"
              className={"border !border-text"}
              onClick={handleCTC}
            >
              {!isAuthenticated ? " Get started for free!" : "Go to profile"}
            </Button>
            <Button
              size="large"
              className={"border !border-white !bg-transparent !text-white"}
              onClick={scrollToLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
