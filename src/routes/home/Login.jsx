import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/user/functions";
import { useHistory } from "react-router-dom";
import { fetchProfessions } from "../../redux/profession/functions";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
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
    await dispatch(loginUser(state));
    history.push("/dashboard");
  };

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="p-10 w-fit flex flex-col items-center gap-3">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className={`flex flex-col gap-2`}>
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

export default Login;
