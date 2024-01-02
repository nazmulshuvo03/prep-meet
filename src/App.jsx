import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchAccountDetails } from "./redux/user/functions";

import Landing from "./routes/home/Landing";
import Signup from "./routes/home/Signup";
import Login from "./routes/home/Login";
import Dashboard from "./routes/dashboard/Dashboard";
import Profile from "./routes/dashboard/Profile";
import Professions from "./routes/home/Professions";
import Account from "./routes/dashboard/Account";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.profile);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const darkMode = useSelector((state) => state.theme.dark);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(fetchAccountDetails(user.uid));
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div
      className={`${darkMode ? "dark" : ""} h-screen w-screen overflow-hidden`}
    >
      <div className={`bg-background text-text h-full w-full overflow-y-auto`}>
        <BrowserRouter basename="/">
          <div className="fixed top-0 left-0 w-full h-24">
            <Navigation />
          </div>
          <div className="mt-24 p-4">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/professions" component={Professions} />
              <AuthenticatedRoute
                exact
                path="/dashboard"
                component={Dashboard}
              />
              <AuthenticatedRoute exact path="/account" component={Account} />
              <AuthenticatedRoute
                exact
                path="/dashboard/:userId"
                component={Profile}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
