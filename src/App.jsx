import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import { useSelector } from "react-redux";
import Home from "./routes/Home";

function App() {
  const global = useSelector((state) => state.global);

  console.log("Global state loading: ", global.loading);

  return (
    <div className={`${false ? "dark" : ""} h-screen w-screen overflow-hidden`}>
      <div className={`bg-background text-text h-full w-full overflow-y-auto`}>
        <BrowserRouter basename="/">
          <div className="fixed top-0 left-0 w-full h-24">
            <h1>Navbar</h1>
          </div>
          <div
            className="mt-24 p-4"
            style={{ height: "-webkit-fill-available" }}
          >
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/dashboard/:userId" component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
