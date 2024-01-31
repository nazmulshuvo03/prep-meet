import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchUserProfile } from "../store/middlewares/user";
import { loginPageUrl } from "../services/api";
import { fetchProfessions } from "../store/middlewares/profession";

const Home = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchUserProfile(
          userId,
          () => history.push("/dashboard"),
          () => (window.location.href = loginPageUrl)
        )
      );
    }
  }, [userId]);

  console.log("params: ", profile);

  return <div>Loading...</div>;
};

export default Home;
