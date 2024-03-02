import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import Home from "./routes/Home";
import { Navigation } from "./components/Navigation";
import Account from "./routes/Account";
import Profile from "./routes/Profile";
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

function App() {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(fetchProfessions());
    dispatch(fetchExperienceLevels());
    dispatch(fetchPreparationStages());
    dispatch(fetchCompanies());
    dispatch(fetchAllSkill());
    dispatch(fetchAllExperienceType());
  }, []);

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
          <div className="mt-20" style={{ height: "-webkit-fill-available" }}>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/dashboard/:userId" component={Home} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/profile/:userId" component={Profile} />
              <Route exact path="/admin" component={Admin} />
            </Switch>
          </div>
        </Router>
      </div>
      {global?.loading && <CircularProgress />}
      {global?.toastMessage && <Toast {...{ ...global.toastMessage }} />}
    </div>
  );
}

export default App;
