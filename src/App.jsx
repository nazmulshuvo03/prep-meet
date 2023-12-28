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

  console.log(import.meta.env.FIREBASE_API_KEY);

  return (
    <div className={`${darkMode ? "dark" : ""} h-screen w-screen`}>
      <div
        className={`bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text h-full w-full`}
      >
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/professions" component={Professions} />
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
            <AuthenticatedRoute path="/account" component={Account} />
            <AuthenticatedRoute path="/dashboard/:userId" component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
