import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import { useSelector } from "react-redux";
import Home from "./routes/Home";
import { Navigation } from "./components/Navigation";
import Account from "./routes/Account";
import Profile from "./routes/Profile";
import CircularProgress from "./components/Progress";
import Toast from "./components/Toast";

function App() {
  const global = useSelector((state) => state.global);

  return (
    <div
      className={`${
        global.dark ? "dark" : ""
      } h-screen w-screen overflow-hidden`}
    >
      <div className={`bg-background text-text h-full w-full overflow-y-auto`}>
        <Router>
          <div className="fixed top-0 left-0 w-full h-24">
            <Navigation />
          </div>
          <div
            className="mt-24 p-4"
            style={{ height: "-webkit-fill-available" }}
          >
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/dashboard/:userId" component={Home} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/profile/:userId" component={Profile} />
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
