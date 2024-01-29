import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPeople, fetchUsers } from "../store/middlewares/user";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPeople());
    // dispatch(fetchUsers());
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
