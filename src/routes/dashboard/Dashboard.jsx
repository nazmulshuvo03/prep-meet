import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../../redux/user/functions";
import { PersonCard } from "../../components/Cards/PersonCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.user.people);

  useEffect(() => {
    dispatch(fetchPeople());
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {people && people.length
          ? people.map((person) => (
              <Link
                key={person.id}
                className="flex gap-2"
                to={`/dashboard/${person.id}`}
              >
                <PersonCard data={person} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
