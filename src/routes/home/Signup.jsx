import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/user/functions";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photoURL:
      "https://th.bing.com/th/id/OIP._tSfQ4W6y7yLOqxMejgq2wHaHg?rs=1&pid=ImgDetMain",
    role: "user",
    language: "english",
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
