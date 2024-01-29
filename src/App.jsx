import { useEffect } from "react";
import { fetchPeople } from "./store/middlewares/user";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPeople());
  }, []);

  return (
    <>
      <div>
        <h1 className="text-red-500">Hello</h1>
      </div>
    </>
  );
}

export default App;
