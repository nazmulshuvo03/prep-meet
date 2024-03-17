import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
import Visit from "./routes/Visit";
import Onboard from "./routes/Onboard";
import Landing from "./routes/Landing";
import Profile from "./routes/Profile";
import People from "./routes/People";
import Interviews from "./routes/Interviews";
import Progress from "./routes/Progress";
import AboutUs from "./routes/AboutUs";
import HowItWorks from "./routes/HowItWorks";
import Faqs from "./routes/Faqs";

function App() {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    dispatch(fetchProfessions());
    if (profile) {
      dispatch(fetchExperienceLevels());
      dispatch(fetchPreparationStages());
      dispatch(fetchCompanies());
      dispatch(fetchAllSkill());
      dispatch(fetchAllExperienceType());
    }
  }, [profile]);

  return (
    <div
      className={`font-serif ${
        global.dark ? "dark" : ""
      } h-screen w-screen overflow-hidden`}
    >
      <Router>
        <div
          className={`bg-background text-text h-full w-full flex flex-col overflow-y-auto`}
        >
          <div className="w-full h-16">
            <Navigation />
          </div>
          <div
            className="flex-1 flex overflow-x-hidden overflow-y-auto"
            style={{ height: "-webkit-fill-available" }}
          >
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/onboard" component={Onboard} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/about-us" component={AboutUs} />
              <Route exact path="/how-it-works" component={HowItWorks} />
              <Route exact path="/faqs" component={Faqs} />
              <Route>
                {global.isAuthenticated ? (
                  <div className="flex w-full overflow-hidden">
                    <TabNavigation />
                    <div className="flex-1">
                      <Route exact path="/profile/:userId" component={Home} />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/people" component={People} />
                      <Route exact path="/progress" component={Progress} />
                      <Route exact path="/interviews" component={Interviews} />
                      <Route exact path="/user/:userId" component={Visit} />
                    </div>
                  </div>
                ) : (
                  <Redirect to="/?auth=login" />
                )}
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
      {global?.loading && <CircularProgress />}
      {global?.toastMessage && <Toast {...{ ...global.toastMessage }} />}
    </div>
  );
}

export default App;
