import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/middlewares/auth";
import { isEmail } from "validator";
import LoginImage from "../../assets/login.svg";
import { GoogleAuth } from "./GoogleAuth";

export const Login = ({ switchMode = () => {} }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!state.email) setErrorMessage("Email can not be empty");
    else if (!isEmail(state.email)) setErrorMessage("Invalid Email");
    else if (!state.password) setErrorMessage("Password can not be empty");
    else dispatch(loginUser(state));
  };

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <div className="w-full h-full flex justify-center p-4">
      <div>
        <div className="flex flex-col items-center justify-center py-4">
          <img src={LoginImage} alt="Login" className="h-40 w-40" />
          <div className="text-2xl font-semibold text-secondary">
            Welcome back!
          </div>
        </div>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
          <Input
            type="email"
            label={"Email Address"}
            name="email"
            value={state.email}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            label={"Password"}
            name="password"
            value={state.password}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <div className="py-2 flex items-center justify-start gap-1 text-xs text-secondary">
            <input
              type="checkbox"
              value={remember}
              onChange={(e) => setRemember((prev) => !prev)}
            />
            <span>Remember me</span>
          </div>
          <div className="text-xs text-red-500 font-medium min-h-4 text-center">
            {errorMessage}
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Button
              onClick={handleLogin}
              className={"!w-72 !bg-secondary !py-1"}
            >
              Sign In
            </Button>
            <GoogleAuth />
          </div>
          <div className="py-2 flex justify-center gap-1 text-sm text-text underline">
            <div>Don't have an account ?</div>
            <div
              onClick={switchMode}
              className="text-secondary font-medium cursor-pointer"
            >
              Sign Up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
