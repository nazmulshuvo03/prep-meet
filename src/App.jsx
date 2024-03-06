import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./routes/Home";
import { Navigation } from "./components/Navigation";
import Admin from "./routes/Admin";
import CircularProgress from "./components/ProgressBar";
import Toast from "./components/Toast";
import { useEffect } from "react";
import {
  fetchCompanies,
  fetchExperienceLevels,
  fetchPreparationStages,
} from "./store/middlewares/static";
import { fetchProfessions } from "./store/middlewares/profession";
import {
  fetchAllExperienceType,
  fetchAllSkill,
} from "./store/middlewares/skill";
import { TabNavigation } from "./components/Navigation/TabNavigation";
import { Profile } from "./components/Profile";
import { People } from "./components/People";
import { Progress } from "./components/Progress";
import { Interviews } from "./components/Interviews";
import Visit from "./routes/Visit";
import Onboard from "./routes/Onboard";
import Landing from "./routes/Landing";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (profile) {
      dispatch(fetchProfessions());
      dispatch(fetchExperienceLevels());
      dispatch(fetchPreparationStages());
      dispatch(fetchCompanies());
      dispatch(fetchAllSkill());
      dispatch(fetchAllExperienceType());
    }
  }, [profile]);

  return (
    <div
      className={`font-sans ${
        global.dark ? "dark" : ""
      } h-screen w-screen overflow-hidden`}
    >
      <div className={`bg-background text-text h-full w-full overflow-y-auto`}>
        <Router>
          <div className="fixed top-0 left-0 w-full h-16">
            <Navigation />
          </div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/onboard" component={Onboard} />
            {global.isAuthenticated ? (
              <div
                className="mt-16 flex overflow-hidden"
                style={{ height: "-webkit-fill-available" }}
              >
                <TabNavigation />
                <div className="flex-1">
                  <Route exact path="/profile/:userId" component={Home} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/people" component={People} />
                  <Route exact path="/progress" component={Progress} />
                  <Route exact path="/interviews" component={Interviews} />
                  <Route exact path="/admin" component={Admin} />
                  <Route exact path="/user/:userId" component={Visit} />
                </div>
              </div>
            ) : (
              <Redirect to="/?auth=login" />
            )}
          </Switch>
        </Router>
      </div>
      {global?.loading && <CircularProgress />}
      {global?.toastMessage && <Toast {...{ ...global.toastMessage }} />}
    </div>
  );
}

export default App;
