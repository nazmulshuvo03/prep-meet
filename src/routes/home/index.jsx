import { Outlet } from "react-router-dom";
import { Navigation } from "../../components/Navigation";

const Home = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Home;
