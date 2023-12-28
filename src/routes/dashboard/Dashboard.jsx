import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../../redux/user/functions";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.user.people);

  useEffect(() => {
    dispatch(fetchPeople());
  }, []);

  return (
    <div>
      <h1>Dashboard page</h1>
      <div>
        {people && people.length
          ? people.map((person) => (
              <Link
                key={person.id}
                className="flex gap-2"
                to={`/dashboard/${person.id}`}
              >
                <div>{person.firstName}</div>
                <div>{person.lastName}</div>
                <div>{person.email}</div>
                <div>{person.profession}</div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
