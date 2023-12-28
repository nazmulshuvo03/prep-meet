import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/user/functions";
import { useHistory } from "react-router-dom";
import { fetchProfessions } from "../../redux/profession/functions";
import { Dropdown } from "../../components/Dropdown";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const professionDropdownOptions = useSelector(
    (state) => state.profession.keyLabelPairs
  );
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profession: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signupUser(state));
    history.push("/dashboard");
  };

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="p-10 w-fit flex flex-col items-center gap-3">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className={`flex flex-col gap-2`}>
          <Input
            label={"First Name"}
            name={"firstName"}
            type="text"
            value={state.firstName}
            onChange={handleChange}
          />
          <Input
            label={"Last Name"}
            name={"lastName"}
            type="text"
            value={state.lastName}
            onChange={handleChange}
          />
          <Input
            label={"Email"}
            name={"email"}
            type="text"
            value={state.email}
            onChange={handleChange}
          />
          <Input
            label={"Password"}
            name={"password"}
            type="password"
            value={state.password}
            onChange={handleChange}
          />
          <Dropdown
            label={"Profession"}
            name={"profession"}
            value={state.profession}
            options={professionDropdownOptions}
            onSelect={handleChange}
            defaultText="Select an option"
          />
          <div className="flex justify-center items-center">
            <Button type={"submit"} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
