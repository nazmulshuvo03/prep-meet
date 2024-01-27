import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  fetchProfessions,
} from "../../redux/profession/functions";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const Professions = () => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);

  const [newProf, setNewProf] = useState("");

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfession({ name: newProf }));
    setNewProf("");
  };

  return (
    <div>
      <h1>Existing Professions</h1>
      <div>
        {professions && professions.length
          ? professions.map((prof) => <div key={prof.id}>{prof.name}</div>)
          : null}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          value={newProf}
          label={"Add new profession"}
          onChange={(e) => setNewProf(e.target.value)}
        />
        <Button type={"submit"} onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Professions;
