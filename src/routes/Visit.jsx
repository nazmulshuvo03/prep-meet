import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { visitUserProfile } from "../store/middlewares/user";
import { clearVisitingProfile } from "../store/slices/user";
import { UserProfile } from "../components/Profile";

const Visit = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.visitingProfile);

  useEffect(() => {
    if (userId) {
      dispatch(visitUserProfile(userId));
    }
    return () => {
      dispatch(clearVisitingProfile());
    };
  }, [userId]);

  return <>{profile ? <UserProfile visit={true} /> : <div />}</>;
};

export default Visit;
