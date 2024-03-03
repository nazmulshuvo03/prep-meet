import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchUserProfile } from "../store/middlewares/user";
import { loginPageUrl } from "../services/api";

const Home = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchUserProfile(
          userId,
          () => history.push("/profile"),
          () => (window.location.href = loginPageUrl)
        )
      );
    }
  }, [userId]);

  return <div />;
};

export default Home;
