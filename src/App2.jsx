import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "./components/Navigation";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Account from "./routes/Account";
import Profile from "./routes/Profile";
import { getLastPartFromUrl } from "./helper/url";
import { fetchProfessions } from "./store/middlewares/profession";
import { fetchUserProfile } from "./store/middlewares/user";
import { loginPageUrl } from "./services/api";

function App() {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const profile = useSelector((state) => state.user.profile);

  console.log(
    "!!!!!!!!!!",
    window.location.href,
    getLastPartFromUrl(window.location.href)
  );

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  useEffect(() => {
    const userId = getLastPartFromUrl(window.location.href);
    if (userId) {
      dispatch(
        fetchUserProfile(
          userId,
          () => window.history.pushState(null, null, "/dashboard"),
          () => (window.location.href = loginPageUrl)
        )
      );
    }
  }, []);

  return (
    <div
      className={`${
        global.dark ? "dark" : ""
      } h-screen w-screen overflow-hidden`}
    >
      <div className={`bg-background text-text h-full w-full overflow-y-auto`}>
        {profile && (
          <BrowserRouter basename="/">
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
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
